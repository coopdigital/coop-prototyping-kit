# Single Site Style Guide

The Single Site Style Guide showcases the core styles and components available from the [Co-op Front-end Toolkit](https://github.com/coopdigital/coop-frontend-toolkit).

## Dependencies

This project uses [Jekyll](http://jekyllrb.com/) to build the Style Guide pages, [Bower](http://bower.io) to include the Front-end Toolkit dependency and [Gulp](http://gulpjs.com/) to compile the assets into the Style Guide directory.

You need to install Ruby, Node and Bower dependencies:

```
bundle install
npm install
bower install
```

## Local development

Once dependencies have been installed, you can build and serve the Style Guide locally. Gulp commands are already set up to generate the Jekyll build, lint and compile the SASS and JavaScript, to copy over necessary assets from the Toolkit, and to run a local server for development.

The default gulp task is configured to build and compile all the Style Guide assets:

```
gulp
```

To compile all the assets as well as starting the local server and the watch tasks, run:

```
gulp server
```

### Run a local server
```
gulp connect
```

This will run a local server, accessible at <http://localhost:9000>

### Start a watch task
```
gulp watch
```

This will watch any files in the `src/` directory, and run the relevant task to compile them if any file change is detected. The Toolkit dependency directory (`bower_components/coop-frontend-toolkit`) is also watched to make local development work on the Toolkit easier.

If you have the LiveReload extension enabled in your browser and the local server running, the page will reload automatically once the build is complete.

## Heroku deployment

The Style Guide is automatically deployed to Heroku (<https://single-site-styleguide.herokuapp.com>) when changes are pushed to or merged into the master branch.

## Working on the [Co-op Front-end Toolkit](https://github.com/coopdigital/coop-frontend-toolkit)

The Single Site Style Guide is set up to allow easy development work on the Toolkit. In order to reflect changes made to your local version of the Toolkit directly in your local version of the Style Guide, you must first link the bower dependency to your local version of the Toolkit.

If you haven't done so, first clone the Toolkit repository:
```
git clone git@github.com:coopdigital/coop-frontend-toolkit.git
```

Create a reference to the local Bower package from the Toolkit directory:
```
cd coop-frontend-toolkit
bower link
```

From the Style Guide directory, link the bower package to the local version:
```
cd ../single-site-styleguide
bower link coop-frontend-toolkit
```

Any changes made to the local version of the Toolkit will now automatically be reflected in the local version of the Style Guide. The Gulp watch tasks are set up to pick up changes made to the Toolkit files automatically, so any change will trigger a recompiling of the assets and reload the browser if you have the server running.
