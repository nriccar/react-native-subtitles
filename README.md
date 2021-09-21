# react-native-subtitles
  
[![NPM Version](https://img.shields.io/npm/v/react-native-subtitles.svg?style=flat)]()  
 
Add subtitles to any video given a current timestamp.

## Install

```
$ npm install react-native-video --save
```

## Usage

```js
import Subtitles from 'react-native-subtitles'

const subtitles = [
    {
        lang: 'English',
        file: url
    }
]

<Subtitles {...{ currentTime, subtitles }}  />
```