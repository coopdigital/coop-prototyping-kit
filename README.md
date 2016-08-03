# Co-op Prototyping Kit

The Co-op Prototyping Kit helps quickly create prototypes and showcase them on Heroku.

---

## Creating a new prototype

The easiest way to start a new prototype is to first [download the Prototyping Kit](https://github.com/coopdigital/coop-prototyping-kit/archive/0.1.0.zip) as a zip and extract the contents to your machine.

### Local development

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

#### Run the prototype on a local server

If you simply need to view the prototype on your computer, you can run the server without re-building the prototype or starting the watch task:

```
gulp connect
```

A local version of the prototype will then be accessible at <http://localhost:9000>.

---

## Deploying your prototype to Heroku

If you want to publish your prototype to Heroku, a few more steps are necessary:

### 1. Create the prototype repository

[Create a new repository](https://github.com/organizations/coopdigital/repositories/new) for your prototype on the Co-op Github account (make sure the new repository is set to _Private_).

Link your local copy to the newly created Github repository. Make sure that you change your-repository-name to the name of the repository which you made above:
```
cd your-prototype
git init
git commit -a -m "Initial commit"
git remote add origin git@github.com:coopdigital/your-repository-name.git
git push -u origin master
```

(Inside 1 Angel Square, you can't use Git commands over HTTPS, only via SSH. This is because, we think, the WebSense egress proxy mangles the traffic.)

### 2. Create the prototype app on Heroku

The next step is to [create a new app on Heroku](https://dashboard.heroku.com/new). Once this has been done, you'll need to configure a couple of things:

#### Configure HTTP authentication:
In the Settings tab, add the following Config variables and set them to your choosing:
  - `USERNAME`
  - `PASSWORD`

#### Configure buildpacks:
Still in the Settings tab, make sure both the _Ruby_ and _NodeJS_ buildpacks have been added to the app:
- `heroku/ruby`
- `heroku/nodejs`

**_NOTE: the buildpacks need to be added in this order, as the Jekyll Gem needs to be installed before the main Gulp task it run._**

#### Configure automated deployment:
- In the Deploy tab, choose 'Connect to Github' as a deployment method
- Search for and connect to the repository you have created
- Enable Automatic Deploys for this app if needed

You can test that your app is building and deploying correctly by running a manual deployment from the Deploy tab. If you have enabled automatic deploys, the app will automatically rebuild and deploy when changes are pushed to the master branch.
