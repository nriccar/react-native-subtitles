import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'

import Axios from 'axios'

import vttToJson from 'vtt-to-json'
var { default: srtParser2 } = require('srt-parser-2')
 

const timeToSeconds = (seconds) => {
  var time = seconds.split(':')
  return +time[0] * 60 * 60 + +time[1] * 60 + +time[2]
}

const Subtitles = ({
  selectedsubtitle,
  currentTime,
  hasSeeked, 
  containerStyle = {},
textStyle = {}
}) => { 
  const [subtitles, setSubtitles] = useState(null)

  const [text, setText] = useState('')

  useEffect(() => {
    const subtitleType =
      selectedsubtitle.file.split('.')[
        selectedsubtitle.file.split('.').length - 1
      ]

    Axios.get(selectedsubtitle.file).then((response) => {
      const openedSubtitle = response.data 

      if (subtitleType === 'srt') {
        var parser = new srtParser2()
        const parsedSubtitle = parser.fromSrt(openedSubtitle)

        let result = []

        parsedSubtitle.map((subtitle) => {
          result.push({
            start: timeToSeconds(subtitle.startTime.split(',')[0]),
            end: timeToSeconds(subtitle.endTime.split(',')[0]),
            part: subtitle.text,
          })
        })

        setSubtitles(result)
      } else if (subtitleType === 'vtt') {
        vttToJson(openedSubtitle).then((parsedSubtitle) => {
          let result = []

          parsedSubtitle.map((subtitle) => {
            // For some reason this library adds the index of the subtitle at the end of the part, so we cut it

            result.push({
              start: subtitle.start / 1000,
              end: subtitle.end / 1000,
              part: subtitle.part.slice(
                0,
                subtitle.part.length -
                  subtitle.part.split(' ')[subtitle.part.split(' ').length - 1]
                    .length,
              ),
            })
          })

          setSubtitles(result)
        })
      }
    })
  }, [selectedsubtitle, hasSeeked])

  useEffect(() => {
    if (subtitles) {
      let videoTime = Math.floor(currentTime)

      for (let index = 0; index < subtitles.length; index++) {
        const subtitle = subtitles[index]
        if (videoTime >= subtitle.end) {
          let subtitlesCopy = subtitles
          subtitlesCopy.shift()
          setSubtitles(subtitlesCopy)
        }
      }

      if (subtitles[0]) { 

        let currentSubtitleStart = subtitles[0].start
        let currentSubtitleEnd = subtitles[0].end
        let currentSubtitleText = subtitles[0].part

        if (currentSubtitleStart + 4 < currentSubtitleEnd) {
          currentSubtitleEnd = currentSubtitleStart + 4
        }

        if (videoTime >= currentSubtitleStart) {
          setText(currentSubtitleText)
        }

        if (videoTime >= currentSubtitleEnd) {
          setText('')

          let subtitlesCopy = subtitles
          subtitlesCopy.shift()
          setSubtitles(subtitlesCopy)
        }
      }
    }
  }, [currentTime, subtitles])

  useEffect(() => {
    setText('')
  }, [hasSeeked])
 

  return (
    <View
      style={{
        ...containerStyle,
        marginBottom: '5%'
      }}
    >
      {text.length > 0 ? (
        <Text
          style={{
            fontSize: 25,
            color: 'white',
            textAlign: 'center',
            alignSelf: 'center',
            padding: 25,
            backgroundColor: 'rgba(0,0,0,.6)',

            textShadowColor: '#000',
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 2,
            ...textStyle
          }}
        >
          {text} 
        </Text>
      ) : null}
    </View>
  )
}

export default Subtitles
