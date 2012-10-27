Fancy Search
============
Simple search interface with Web API.

<http://htanjo.github.com/fancy-search/>

Directory Structure
-------------------
    fancy-search/
      ├── dist/         : Front-end files to deploy.
      ├── docs/         : Documentation of JavaScript application API.
      ├── src/          : Development source code.
      ├── test/         : QUnit tests.
      ├── .gitignore
      ├── grunt.js      : Grunt build settings.
      ├── package.json  : Package info.
      └── README.md

Requirements to Build
---------------------
If you want to build this application, you have to install the follwing tools.

* [Node.js](http://nodejs.org/) : Platform for development.
* [Grunt](http://gruntjs.com/) : Build management tool.
    * [grunt-contrib](https://github.com/gruntjs/grunt-contrib) : Collection of common grunt tasks.
    * [grunt-imagine](https://github.com/asciidisco/grunt-imagine) : Grunt tasks for optimizing & inlining images.
    * [grunt-html](https://github.com/jzaefferer/grunt-html) : Grunt task for html validation.
* [phantomjs](http://phantomjs.org/) : Headless WebKit with JavaScript API. Required by QUnit task.
* pngout ([Linux,Mac](http://www.jonof.id.au/kenutils) / [Win](http://advsys.net/ken/utils.htm)) : PNG optimization tool. Required by grunt-imagine.

### Build Issues in Windows
When build error occured in "pngmin" task in Windows, try to modify `helper.js` by yourself.

    node_modules/grant-imagine/tasks/helper.js

1. Replace with the [latest version](https://github.com/asciidisco/grunt-imagine/blob/master/tasks/helper.js).
2. Install "cheerio" module. `npm install cheerio` or `npm install -g cheerio`.
3. Modify `helper.js` line 4. before:`jQuery  = require('jQuery');` -> after:`jQuery  = require('cheerio');`

#### Refer to:
* <https://github.com/asciidisco/grunt-imagine/issues/3>
* <https://github.com/asciidisco/grunt-imagine/issues/6>

License
-------
This application is released under the MIT license.