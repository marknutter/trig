![trig logo](https://dl.dropbox.com/u/205542/trig_logo_teal.png)


###A Fastidiously Opinionated, Curiously Efficient Web Framework for Angular.js

## Installation

    $ npm install -g trig

## Quick Start

 Generate a boilerplate angular.js app:

    $ trig new foo && cd foo

 Start the server:

    $ trig server

 Run the test suite:

    $ trig test

 Create a production build:

    $ trig build

 Deploy to Amazon S3:

    $ trig deploy

## Features

  * Creates a well organized angular.js application following up-to-date best practices
  * Turnkey build, test, and deployment processes
  * Simple deployment to an Amazon S3 account for easy, auto-scaling hosting
  * Relies on [Parse](http://parse.com) or [Firebase](http://firebase.com) for data storage and retrieval. No server side code necessary!
  * Driven by [Grunt](http://gruntjs.com/)
  * Live app refresh while you code
  * Test runner utilizing [Jasmine](https://jasmine.github.io/), [Phantomjs](http://phantomjs.org), and [Karma](http://karma-runner.github.com/0.8/index.html) (formerly Testacular)
  * Support for [Stylus](http://learnboost.github.com/stylus/)
  * Stays up to date with the latest versions of angular.js and all other dependencies

## Philosophy

  Trig is the cure for [analysis paralysis](http://en.wikipedia.org/wiki/Analysis_paralysis).
  Setting up a well thought out structure for an angular.js applications with all testing, building, deployment, and processing tasks accounted for
  can be daunting. Trig takes care of these details for you and allows you to concentrate on building your app immediately.
  Heavily inspired by Ruby on Rails, powered by Node, Grunt, and Karma. It keeps your apps [jauntily slim and extremely precise](http://www.merriam-webster.com/dictionary/trig).

## License

(The MIT License)

Copyright (c) 2009-2012 Mark Nutter &lt;marknutter@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
