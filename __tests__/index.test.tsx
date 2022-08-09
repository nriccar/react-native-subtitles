import '@testing-library/jest-dom'
import 'jest-styled-components'

import * as React from 'react'
import { act, render, waitFor } from '@testing-library/react-native'

import Subtitles, { Subtitle } from '../lib'
import subtitleParser from '../lib/utils/subtitle-parser'

jest.mock('../lib/utils/subtitle-parser')

afterEach(() => {
  jest.clearAllMocks()
})

const selectedSubtitleTest = {
  srt: 'https://durian.blender.org/wp-content/content/subtitles/sintel_es.srt',
  vtt: 'https://bitdash-a.akamaihd.net/content/sintel/subtitles/subtitles_en.vtt',
}

test('renders subtitles according to currentTime prop successfully', async () => {
  const promise = Promise.resolve()

  const testSubtitle: Subtitle[] = [
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
  ]
  const subtitleParserMock = subtitleParser as jest.MockedFunction<
    typeof subtitleParser
  >
  subtitleParserMock.mockResolvedValueOnce(testSubtitle)

  const { rerender, queryByTestId, getByTestId } = render(
    <Subtitles
      currentTime={0}
      selectedsubtitle={{ file: selectedSubtitleTest.vtt }}
    />,
  )

  expect(subtitleParserMock).toHaveBeenCalledWith(selectedSubtitleTest.vtt)

  await waitFor(() =>
    expect(
      queryByTestId('react-native-subtitles-text'),
    ).not.toBeInTheDocument(),
  )
  expect(subtitleParserMock).toHaveBeenCalledTimes(1)
  expect(getByTestId('react-native-subtitles-text').props.children).toMatch(
    testSubtitle[0].part,
  )

  rerender(
    <Subtitles
      currentTime={12}
      selectedsubtitle={{ file: selectedSubtitleTest.vtt }}
    />,
  )
  expect(subtitleParserMock).toHaveBeenCalledTimes(2)
  expect(getByTestId('react-native-subtitles-text').props.children).toMatch(
    testSubtitle[1].part,
  )

  rerender(
    <Subtitles
      currentTime={22}
      selectedsubtitle={{ file: selectedSubtitleTest.vtt }}
    />,
  )
  expect(subtitleParserMock).toHaveBeenCalledTimes(3)
  expect(getByTestId('react-native-subtitles-text').props.children).toMatch(
    testSubtitle[2].part,
  )

  await act(() => promise)
})
