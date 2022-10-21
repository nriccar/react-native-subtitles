# [React Native Subtitles](https://www.npmjs.com/package/react-native-subtitles) &middot; ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

Add subtitles to any video given a current timestamp.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

```
$ npm i react-native-subtitles
```

## Usage

```javascript
import Subtitles from 'react-native-subtitles'

const Example = () => {
  return (
    <Subtitles
      {...{ currentTime }}
      selectedsubtitle={{
        file: 'https://bitdash-a.akamaihd.net/content/sintel/subtitles/subtitles_en.vtt',
      }}
    />
  )
}
```

### Props

- [currentTime](#currentTime)
- [selectedsubtitle](#selectedsubtitle)
- [containerStyle](#containerStyle)
- [textStyle](#textStyle)

#### currentTime

Integer with the current time. It should change every second, yes. A common use case would be having a video an setting a state with the current time as it changes.

#### selectedsubtitle

An object with the file property containing the url. You can add more properties to this object, like name or lang, to use on the frontend for changing between each one.

#### containerStyle

The style for the container

#### textStyle

The style for the text

## Credits

PRs are welcome!
