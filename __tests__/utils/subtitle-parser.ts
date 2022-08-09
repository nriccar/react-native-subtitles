import axios from 'axios'
import vttToJson from 'vtt-to-json'
const { default: srtParser2 } = require('srt-parser-2')

import subtitleParser from '../../lib/utils/subtitle-parser'

jest.mock('axios')
jest.mock('vtt-to-json')
jest.mock('srt-parser-2')

afterEach(() => {
  jest.clearAllMocks()
})

test('subtitle parser function works correctly', async () => {
  /**
   * * axios
   */
  const vttResponseMock = ` 
    1
    00:00:01.000 --> 00:00:10.000
    Welcome to bitmovin's bitdash!
    
    2
    00:00:11.000 --> 00:00:15.000
    Experience our highly optimized MPEG-DASH clients...
    
    3
    00:00:15.100 --> 00:00:19.000
    ...which support multiple audio...
    
    4
    00:00:19.100 --> 00:00:23.000
    ...multiple subtitles...
`
  const axiosMock = axios as jest.Mocked<typeof axios>
  axiosMock.get.mockResolvedValueOnce({
    data: vttResponseMock,
  })

  /**
   * * vtt
   */
  const vttToJsonMock = vttToJson as jest.Mocked<typeof vttToJson>
  vttToJsonMock.mockResolvedValueOnce([
    {
      start: 0,
      end: 5,
      part: 'Welcome to bitmovins bitdash!',
    },

    {
      start: 10,
      end: 15,
      part: 'Experience our highly optimized MPEG-DASH clients...',
    },

    {
      start: 20,
      end: 25,
      part: '...which support multiple audio...',
    },
  ])

  await subtitleParser(
    'https://bitdash-a.akamaihd.net/content/sintel/subtitles/subtitles_en.vtt',
  )

  expect(axiosMock.get).toHaveBeenCalledWith(
    'https://bitdash-a.akamaihd.net/content/sintel/subtitles/subtitles_en.vtt',
  )
  expect(axiosMock.get).toHaveBeenCalledTimes(1)

  expect(vttToJsonMock).toHaveBeenCalledWith(vttResponseMock)
  expect(vttToJsonMock).toHaveBeenCalledTimes(1)
})
