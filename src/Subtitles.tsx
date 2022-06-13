import React, {ReactElement, useEffect, useState} from 'react';
import {View, Text, ViewStyle, TextStyle} from 'react-native';

import Axios from 'axios';

import vttToJson from 'vtt-to-json';
import SrtParser2 from 'srt-parser-2';

const timeToSeconds = (seconds: string): number => {
  const time = seconds.split(':');
  return +time[0] * 60 * 60 + +time[1] * 60 + +time[2];
};

type Props = {
  selectedsubtitle: {file: string};
  currentTime: number;
  containerStyle: ViewStyle;
  textStyle: TextStyle;
};

type Subtitle = {
  start: number;
  end: number;
  part: string;
};

const Subtitles = ({
  selectedsubtitle,
  currentTime,
  containerStyle = {},
  textStyle = {},
}: Props): ReactElement => {
  const [subtitles, setSubtitles] = useState<Subtitle[]>(null);

  //const [text, setText] = useState<string>('');
  const [subtitleIndex, setSubtitleIndex] = useState<number>(0);

  useEffect(() => {
    const subtitleType =
      selectedsubtitle.file.split('.')[
        selectedsubtitle.file.split('.').length - 1
      ];

    Axios.get(selectedsubtitle.file).then(response => {
      const openedSubtitle = response.data;

      if (subtitleType === 'srt') {
        const parser = new SrtParser2();
        const parsedSubtitle = parser.fromSrt(openedSubtitle);

        const result = [];

        parsedSubtitle.map(subtitle => {
          result.push({
            start: timeToSeconds(subtitle.startTime.split(',')[0]),
            end: timeToSeconds(subtitle.endTime.split(',')[0]),
            part: subtitle.text,
          });
        });

        // NOTE: sort by start timing
        result.sort((a, b) => {
          if (a.start > b.start) {
            return 1;
          }
          if (a.start < b.start) {
            return 1;
          }
          return 0;
        });

        setSubtitles(result);
      } else if (subtitleType === 'vtt') {
        vttToJson(openedSubtitle).then(parsedSubtitle => {
          const result = [];

          parsedSubtitle.map(subtitle => {
            // For some reason this library adds the index of the subtitle at the end of the part, so we cut it

            result.push({
              start: subtitle.start / 1000,
              end: subtitle.end / 1000,
              part: subtitle.part.slice(
                0,
                subtitle.part.length -
                  subtitle.part.split(' ')[
                    subtitle.part.split(' ').length - 1
                  ].length,
              ),
            });
          });

          // NOTE: sort by start timing
          result.sort((a, b) => {
            if (a.start > b.start) {
              return 1;
            }
            if (a.start < b.start) {
              return 1;
            }
            return 0;
          });

          setSubtitles(result);
        });
      }
    });
  }, [selectedsubtitle]);

  //NOTE: as currentTime changed, seek appropreate index to display
  useEffect(() => {
    if (subtitles) {
      const index = subtitles.findIndex(
        element =>
          currentTime > element.start && currentTime < element.end,
      );
      setSubtitleIndex(index);
    }
  }, [currentTime]);

  return (
    <View
      style={{
        ...containerStyle,
      }}
    >
      {subtitles && subtitleIndex >= 0 ? (
        <Text
          style={{
            padding: 5,
            ...textStyle,
          }}
        >
          {subtitles[subtitleIndex].part}
        </Text>
      ) : null}
    </View>
  );
};

export default Subtitles;
