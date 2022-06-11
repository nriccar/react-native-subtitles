# react-native-subtitles
  
[![NPM Version](https://img.shields.io/npm/v/react-native-subtitles.svg?style=flat)]()  
 
Add subtitles to any video given a current timestamp.

## Table of Contents

* [Installation](#installation) 
* [Usage](#usage) 

## Installation

```
$ npm install react-native-subtitles --save
```

## Usage

```js
import Subtitles from 'react-native-subtitles'

<Subtitles
    {...{ currentTime, hasSeeked }}
    selectedsubtitle={{ 
      file:
        'https://bitdash-a.akamaihd.net/content/sintel/subtitles/subtitles_en.vtt',
    }} 
/>
```
xxx

### Props
* [currentTime](#currentTime) 
* [hasSeeked](#hasSeeked) 
* [selectedsubtitle](#selectedsubtitle) 
* [containerStyle](#containerStyle) 
* [textStyle](#textStyle) 

#### currentTime
Integer with the current time. It should change every second, yes. A common use case would be having a video an setting a state with the current time as it changes.

#### hasSeeked
When the time is changed the Subtitles component should re evaluate the subtitles file and get the current text for the given time. You can pass a simple boolean and invert it every time the video seeked a new timestamp.

#### selectedsubtitle
An object with the file property containing the url. You can add more properties to this object, like name or lang, to use on the frontend for changing between each one.

#### containerStyle
The style for the container

#### textStyle
The style for the text




