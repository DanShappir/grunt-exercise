# Grunt!

This is an exercise for beginners in [Grunt](http://gruntjs.com/).
Follow this guide to take the simple website in the exercise directory,
validate it, run its tests, and create a production version of it with
nothing but Grunt and Grunt task modules.

## Global setup
(...which can be skipped if your machine is already set up with Grunt)

Grunt is based on [NPM](https://www.npmjs.org/),
meaning we're gonna install Grunt and Grunt tasks using NPM,
so before everything, we'll need NodeJS and Grunt.
Install node with `brew install node` on OSX,
or [from NodeJS.org](http://nodejs.org/download/) on other systems.

Once you have Node, you'll have NPM, and you could install grunt with
```bash
npm install --global grunt
```
Verify that you're OK by checking everything is installed:
```bash
$ node -v
v0.10.29
$ npm -v
1.4.14
$ grunt -V # notice the capital V
grunt-cli v0.1.13
```

## The project
Clone this repository, or better yet,
fork it first so that you could save your progress.

The `exercise` directory is the root of the project,
so all of the commands we're gonna run should be ran there,
and all of the paths we're gonna use are relative to it.
Open it and see what's there:
* `src` - is the public directory of our website. You can open `index.htm` to see the site.
* `test` - includes a test file for one of the Javascript classes used in the site.
* `.gitignore` - includes a few entries we'll need as we'll go along.
* `package.json` - is where we'll have our grunt dependencies listed. Currently empty.
* `Gruntfile.js` - is a bare Grunt's configuration file, which is where we'll do most of our work.

## Grunt and local project installations
We're already installed the grunt-cli tool,
but in order to use Grunt in our project,
we should install grunt locally.
Do that by running:
```bash
npm install grunt --save-dev
```
This will do two things:
It will add the grunt module to the `node_modules` directory,
(which it will create if it doesn't yet exist),
and since we've used `--save-dev`,
it will add grunt to our empty `package.json` file
under `devDependencies`.
Look into the `package.json` file to see what's added.

Notice that `node_modules` is in the `.gitignore` file,
and that `package.json` is not. In the future,
we could just run `npm install` to add everything in our `package.json`
file into the node_modules directory.

If you'd run `grunt`,
Grunt will tell you that there isn't a default task,
and if you'd run `grunt --help`,
you'd see that there are no tasks under *Available tasks*,
so let's start adding some...

## grunt-contrib-jshint

`grunt-contrib-jshint` is a Grunt task to run [jshint](http://www.jshint.com/),
which is a Javascript code quality tool.

Install it by running
```bash
npm install grunt-contrib-jshint --save-dev
```
As we've seen before, this will install the module
in our `node_modules` directory,
and include it in our `package.json` file.

The `grunt-cotrib-jshint` module is installed,
but we need to configure and load the `jshint` task in Grunt.

To do that, we're gonna add the following key:value pair
to the object passed to the `grunt.config.init` method
inside our Gruntfile:
```js
jshint: {
  src: ['src/**/*.js','!src/js/lib/**/*.js'],
  options: {
    asi: true
  }
}
```
And right after that call, we're gonna tell Grunt
to load the task, with:
```js
grunt.loadNpmTasks('grunt-contrib-jshint')
```

After we'll do that, our Gruntfile should look like this:
```js
'use strict'

module.exports = function(grunt) {

  grunt.config.init({
    jshint: {
      src: ['src/**/*.js','!src/js/lib/**/*.js'],
      options: {
        asi: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint')
}
```
and we should be able to run
```bash
grunt jshint
```
and see that we have a jshint error!
jshint will tell you where and what the error is,
so it should be easy to fix.
Once it's fixed, run `grunt jshint` and see that Grunt passes.
Then move on to add the next Grunt task.


## grunt-contrib-csslint
In the same way jshint is used to check Javascript,
csslint is used to check css.
Install it with:
```bash
npm install grunt-contrib-csslint --save-dev
```
Add this key:value pair to the object passed to `grunt.config.init`:
```js
csslint: {
  src: ['src/**/*.css']
}
```
and get Grunt to load the task with:
```js
grunt.loadNpmTasks('grunt-contrib-csslint')
```
Now you can run `grunt csslint`.
Again, Grunt fails. This time,
it's because the css file in the project does not pass the csslint check.
fix the issue and go on.


## grunt-tape
`grunt-tape` is a grunt module that runs tape unit tests.
We already have a tape test file in the `test` directory,
so to have grunt run it, first install the grunt tape module,
and tape itself, which is used from inside the test:
```bash
npm install grunt-tape tape --save-dev
```
(See how we installed two things at once? That's OK!)

(If you're working on windows, grunt-tape will work from here: `npm i git+ssh://git@github.com:Bartvds/grunt-tape.git --save-dev`)


As before, add the configuration:
```js
tape: {
  files: ['test/**/*.js']
}
```
and get Grunt to load it:
```js
grunt.loadNpmTasks('grunt-tape')
```

Now you can run `grunt tape` and see the tests being ran.


## Tasks grouping and aliasing

Now, after we've defined three tasks, jshint, csslint, and tape,
we know that we can run them one by one:
```bash
grunt jshint
grunt csslint
grunt tape
```
We can also one them with a single command:
```bash
grunt jshint csslint tape
```
and that might be good enough for now,
but when we'll have dozens of tasks, that will become messy.
There is an easy solution for that -
just add this line after the calls to `loadNpmTasks`:
```js
grunt.registerTask('check', ['jshint', 'csslint', 'tape'])
```
This simply means - *register a new task called "check", which includes these three tasks in order*.

Now you can run `grunt check` and see the result of all three tasks together.

We can also add
```js
grunt.registerTask('default', ['check'])
```
`default` is the task ran when running `grunt` without any additional argument.
This might seem redundant,
but it is likely that we'll want to have other tasks
or other groups of tasks under the general `default` task.

## grunt-contrib-watch
`watch` is a taks used to run **other tasks** when certain files change.
With it, we can say *when a css file changes, run csslint again*,
or *when a javascript file changes, run jshint and the tests again*.
That would let us work on our files and knowing right away if we broke something.

Install with:
```bash
npm install grunt-contrib-watch --save-dev
```
Configure:
```js
watch: {
  js: {
    files: ['src/**/*.js'],
    tasks: ['jshint']
  },
  css: {
    files: ['src/**/*.css'],
    tasks: ['csslint']
  }
}
```
Load:
```js
grunt.loadNpmTasks('grunt-contrib-watch')
```

You can see how in the configuration,
we've set watch to run `jshint` whenever a file that fits
the patten `src/**/*.js` changes,
and `csslint` whenever a file that fits `src/**/*.css` does.

Now, if you'll run `grunt watch`,
you'll see that unlike other tasks, it does not end.
It waits for the next change, output the results, and goes on waiting.
Edit some css and js files to see the watch in action.


## grunt-contrib-connect

`connect` is a task that opens a local web-server,
which could be really nice for actually opening and viewing our site.

Install with:
```bash
npm install grunt-contrib-connect --save-dev
```
Configure:
```js
connect: {
  server: {
    options: {
      hostname: 'localhost',
      useAvailablePort: true,
      base: 'src',
      open: true,
      keepalive: true
    }
  }
}
```
and load:
```js
grunt.loadNpmTasks('grunt-contrib-connect')
```

Now, running 'grunt connect' will open a web-server
in the `src` directory, and open it in the browser.


## Other tasks
If you'll peek at the `results` directory,
you'll see a project with everything we've done here,
and a few other tasks,
relating to building a production version of the site,
into the `target` directory of the project:

* grunt-contrib-clean - Deletes everything in the target directory created in previous builds
* grunt-contrib-uglify - Minifies Javascript files
* grunt-contrib-cssmin - Minifies CSS files
* grunt-processhtml - Processes HTML files to load the minifies versions of js and css files
* grunt-contrib-copy - Copies files that do not need to be minifies

Also, the `connect` task was configured to be able to run both the dev version and the production version.

## Costum task

We've already seen the simple use of `grunt.registerTask` in:
```js
grunt.registerTask('check', ['jshint', 'csslint', 'tape'])
```
but we can also create a whole new task by passing
a function as the second arguments.
Here are a few examples.
Copy them into your Gruntfile
and try to figure out how to write one of your own.

```js
grunt.registerTask('hello', function() {
  grunt.log.writeln('Hello!!!')
})

grunt.registerTask('random', function() {
  if (Math.random() < 0.5) {
    grunt.log.writeln('Pass!!!')
  } else {
    grunt.fail.fatal('Fail :[')
  }
})

grunt.registerTask('weather', function() {
  var done = this.async()
  var request = require('request') //This requires running "npm i request"
  request('http://api.openweathermap.org/data/2.5/weather?q=Tel_Aviv', function(err, res, body) {
    if (err) grunt.fail.fatal('Could not get date. ' + err)
    try {
      var data = JSON.parse(body)
    } catch(e) {
      grunt.fail.fatal('returned data is not valid json')
    }
    var weather = data.weather[0]
    var output = 'Weather in ' + data.name + ':\n'
    output += weather.main + '\n'
    output += (data.main.temp - 272.15).toFixed(2) + ' celsius\n'
    grunt.log.writeln(output)
    done()
  })
})
```
Eventually, if you have more than one costum task,
It might be wise to move those tasks to another file and use [grunt.task.loadtasks](http://gruntjs.com/api/grunt.task#grunt.task.loadtasks)


## Further readings

* http://gruntjs.com/
* http://gruntjs.com/getting-started
* http://gruntjs.com/api/grunt
* http://gruntjs.com/api/inside-tasks











<!--  -->
