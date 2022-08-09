import '@testing-library/jest-dom'
import 'jest-styled-components'

import * as React from 'react'
import { render, waitFor, act } from '@testing-library/react-native'
import axios from 'axios'

import Subtitles from '../lib'

jest.mock('axios')

afterEach(() => {
  jest.clearAllMocks()
})

/**
 * * subtitles interface
 * * @param { selectedsubtitle: { file } } url of the subtitle
 * * @param { currentTime } time in miliseconds from the video playback
 * * @param { containerStyle: {} } style for the container of the subtitles component
 * * @param { textStyle: {} } style for the text of the subtitle component
 */
export interface SubtitlesProps {
  selectedsubtitle: {
    file: string
  }
  currentTime: number
  containerStyle?: React.StyleHTMLAttributes<HTMLDivElement>
  textStyle?: React.StyleHTMLAttributes<HTMLParagraphElement>
}

const subtitles = {
  srt: 'https://durian.blender.org/wp-content/content/subtitles/sintel_es.srt',
  vtt: 'https://bitdash-a.akamaihd.net/content/sintel/subtitles/subtitles_en.vtt',
}

const renderSubtitles = ({
  selectedsubtitle = { file: subtitles.srt },
  currentTime = 0,
}: SubtitlesProps) => {
  const utils = render(<Subtitles {...{ currentTime, selectedsubtitle }} />)

  return {
    ...utils,
  }
}

test('renders N child(s) successfully', async () => {
  const {} = renderSubtitles({
    selectedsubtitle: { file: subtitles.vtt },
    currentTime: 10,
  })

  const axiosMock = axios as jest.Mocked<typeof axios>
})
