# Co-op Prototyping Kit

The Co-op Prototyping Kit helps quickly create prototypes and showcase them on Heroku.

---

## Creating a new prototype

The easiest way to start a new prototype is to first [download the Prototyping Kit](#) as a zip and extract the contents to your machine.

If you want to be able to publish this prototype to Heroku, a few more steps are necessary:

### 1. Create the prototype repository

[Create a new repository](https://github.com/organizations/coopdigital/repositories/new) for your prototype on the Co-op Github account (make sure the new repository is set to _Private_).

Link your local copy to the newly created Github repository:
```
cd your-prototype
git init
git commit -a -m "Initial commit"
git remote add origin https://github.com/coopdigital/your-prototype.git
git push -u origin master
```

### 2. Create the prototype app on Heroku

#### Configure HTTP authentication:
In the Settings tab, add the following Config variables and set them to your choosing:
  - `USERNAME`
  - `PASSWORD`

#### Configure automated deployment
- In the Deploy tab, choose 'Connect to Github' as a deployment method
- Search for and connect to the repository you have created
- Enable Automatic Deploys for this app

Once all this is set up, your prototype will automatically be deployed to Heroku when changes are pushed to the `master` branch.

---

## Local development

This project uses [Jekyll](http://jekyllrb.com/) to generate pages, and various NPM packages with [Gulp](http://gulpjs.com/) to compile the assets into the `build` directory. To install all the necessary dependencies:

```
bundle install
npm install
```

Once dependencies have been installed, you can build and serve your prototype locally. Gulp commands are already set up to generate the Jekyll build, lint and compile the SASS and JavaScript, to copy over necessary assets from the Toolkit, and to run a local server for development.

The default gulp task will build and compile all the assets, start a local server, and watch for file changes:

```
gulp
```

_Note: for the browser to reload automatically when a file changes, you will need to install the LiveReload extension._

### Run the prototype on a local server

If you simply need to view the prototype on your computer, you can run the server without re-building the prototype or starting the watch task:

```
gulp connect
```

A local version of the prototype will then be accessible at <http://localhost:9000>.
