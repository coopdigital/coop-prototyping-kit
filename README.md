# Co-op Prototyping Kit

The Co-op Prototyping Kit helps quickly create prototypes and showcase them on Heroku.

## Creating a new prototype

The easiest way to start a new prototype is to first [download the Prototyping Kit](https://github.com/coopdigital/coop-prototyping-kit/releases/latest) and extract the contents to your machine.

### Local development

This project uses [Jekyll](http://jekyllrb.com/) to generate pages, and various NPM packages with [Gulp](http://gulpjs.com/) to compile the assets into the `build` directory. To install all the necessary dependencies:

```sh
bundle install
npm ci
```

Once dependencies have been installed, you can build and serve your prototype locally. Gulp commands are already set up to generate the Jekyll build, lint and compile the SASS and JavaScript, to copy over necessary assets from the Toolkit, and to run a local server for development.

The default gulp task will build and compile all the assets, start a local server, and watch for file changes:

```sh
npx gulp
```

A local version of the prototype will now be accessible at <http://localhost:9000>.

_Note: for the browser to reload automatically when a file changes, you will need to [install the LiveReload extension](http://livereload.com/extensions/)._

---

## Saving and showing form data

The Prototyping Kit includes a simple way of saving data entered in forms, as well as displaying the saved data. Data is stored locally on the computer running the prototype and disappears at the end of the session, when the browser window is closed.

You can see an example form by running the server locally and opening <http://localhost:9000/form.html>.

### Setting up form data storage

Form data storage is enabled by default using the `sessionStorage` browser API, which means all the data is cleared when the browser window is closed.

If you want to retain the data in the browser between sessions, you need to initiate the storage using the `localStorage` browser API in `src/_js/main.js`:

```js
var storeForms = new storeForms('localStorage');
```

### Saving data

Data entered in forms is saved automatically. SImply make sure the form fields have a `name` attribute -- this will be used as the key to each piece of data.

An example form can be found in [`src/form.html`](https://github.com/coopdigital/coop-prototyping-kit/blob/master/src/form.html)

### Displaying saved data

To display data, create HTML elements with the `data-name` attribute equal to the key of the data you want to display -- when the page loads, the contents of the element will be replaced by the data, if it exists.

For instance, to display the data entered in an input field called `job`, you would use:

```html
<p data-name="job"></p>
```

#### Show/hide depending on data value

You can show and hide HTML elements depending on the value of the data by using the `data-show-if` and `data-hide-if` attributes alongside the `data-name` attribute:

```html
<!-- shown if job equals 'teacher' -->
<span data-name="job" data-show-if="teacher">This is visible if 'job' equals 'teacher'</span>

<!-- hidden if job equals 'manager' -->
<span data-name="job" data-hide-if="manager">This is hidden if 'job' equals 'manager'</span>
```

You can also show and hide HTML elements depending on whether the data has a value or not. To do so, use the `data-show-if` or `data-hide-if` above with a value of `:empty`:

```html
<!-- shown if job is empty -->
<span data-name="job" data-show-if=":empty">This is visible if 'job' is empty.</span>

<!-- hidden if job is empty -->
<span data-name="job" data-hide-if=":empty">This is hidden if 'job' is empty.</span>
```


Examples of displaying data can be found in [`src/summary.html`](https://github.com/coopdigital/coop-prototyping-kit/blob/master/src/summary.html)

---

## Deploying your prototype to Heroku

If you want to publish your prototype to Heroku, a few more steps are necessary:

### 1. Create the prototype repository

Create a new repository for your prototype on Github (make sure the new repository is set to _Private_ if necessary).

Link your local copy to the newly created Github repository. Make sure that you change your-repository-name to the name of the repository which you made above:
```sh
cd your-prototype
git init
git commit -a -m "Initial commit"
git remote add origin git@github.com:coopdigital/your-repository-name.git
git push -u origin master
```

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
