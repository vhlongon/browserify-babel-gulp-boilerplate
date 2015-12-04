# ES6 Babel Browserify Boilerplate

Gulp boilerplate to use ES2015 with browserify for module loading and babel for the transpiling. 
It's inspired by [es6-browserify-boilerplate](https://github.com/thoughtram/es6-6to5-browserify-boilerplate) but I have added other common gulp task for managing Sass compilation, image optimization, etc.

I have also included the SASS ["7 1" boilerplate](https://github.com/HugoGiraudel/sass-boilerplate) by Sass creator, Hugo Giraudel


## Install

### Install all dependecies
*Run *npm install* gulp -g (install gulp globally, if don't have installed yet)
*Run *npm install* (install all projects dependecies)

### Running in the browser
Run *gulp* (default task) to build the project, compile js, Sass and start the web browser (on port 777, by default) 

### Other tasks includes 
* **gulp styles** - compile all files under styles/scss to dist/css (import everything on styles/main) and reload on change
* **gulp images** - optimize images, handle svg and reloads on image files updates
* **gulp html** - reloads on html files change 
* **gulp build**-persistent - main task for building js and start a stream with browserify - reloads on js files changes
* **gulp build** - will also build, but will leave stream once done

### About bundling

As mentioned, [Browserify](http://browserify.org/) and [Babel](http://babeljs.io/) are used to handle module loading and transpiling. 

The entry point to bundling everything is src/app.js. Import/require everything there and Gulp will take care of the rest. 

I have even included modernizr (using browsernizr) and Jquery as required there, as well as ES2015 modules using 
Watchify watch for js files updates and emmit a sign to BrowserSync to reload when something has been updated.  

### ES2015

There are a lot of new features for the next version of Javascript, ES2015 (formely ES6) available. 

There are some simple examples of some of them on this repo, like new type of variables, destructuring, string interpolation, class and modules, but there is a lot more!

Have a  look at: 

* (https://hacks.mozilla.org/category/es6-in-depth/)
* (http://www.2ality.com/2014/12/es6-oop.html)
* (https://www.codeschool.com/courses/es2015-the-shape-of-javascript-to-come) - Interative online course - subscription required 


### What are all the pieces involved?

#### [Babel]
Transpiles ES6 code into regular ES5 (today's JavaScript) so that it can be run in a today browser. Like traceur but doesn't need a runtime to work. Formerly known as 6to5.

#### [CommonJS]
Babel is configured to transpile ES6 modules into CommonJS syntax and we use browserify to bundle the code into one file to deliver it to the browser.

#### [Browserify]
Browserify walks through all files and traces down all `require()`s to bundle all files together.  

#### [Gulp]
Task runner to make defining and running the tasks simpler.

[ES6]: http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts
[Babel]: http://babeljs.io/
[CommonJS]: http://wiki.commonjs.org/wiki/CommonJS
[Browserify]: http://browserify.org/
[Gulp]: http://gulpjs.com/


Feel free to clone and  use this repo for your project!

