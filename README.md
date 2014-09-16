## Baby Mean - small reference app for the mean stack
Nothing groundbreaking here!  This app is intended as a learning tool that consists of Angular, Node, MongoDB, and Express with CRUD.

Would not recommend use in a production environment!

### Directory Structure

``` javascript
|- public                       // public folder (angularjs files)
|  |- components                // bower components
|  |- css
|  |- js
|  |- posts                     // posts feature
|  | |- views
|  | | |- create.html
|  | | |- edit.html
|  | | |- list.html
|  | | |- show.html
|  | |- posts.js
|  | |- postsController.js
|  | |- postsServices.js
|  |- views                    // app common views
|  | |- main.html
|  |- app.js                   // main angular module
|  |- homeCtrl.js              // default home controller
|- routes
|  |- index.js
|- views                        // server side templates, NOTE: check layout.jade
|  |- index.jade
|  |- layout.jade
|- .bowerrc                     // tells bower where to install dependencies
|- .gitignore
|- .npmignore
|- app.js                       // main nodejs app file
|- bower.json
|- Gruntfile.js                 // grunt task runner file
|- package.json
|- Procfile

```

### Local Deployment
Install Dependencies: `npm install` (there's a postinstall in `package.json` to get bower dependencies).

Install Mongo: 'brew install mongo' if on OSX or by other means.

Run Mongo Daemon: 'mongod' to start the local mongo database up 

Run: `grunt` to run the default task.

### Heroku Deployment
Required:
- [Mongolab account](https://mongolab.com/), or other offering for mongodb
- [Heroku account](https://www.heroku.com) and [heroku toolbelt (heroku-cli)](https://toolbelt.heroku.com/)

Initialize and/or commit as git repo: `git init` and `git add .` and `git commit -am 'initial commit'`

In root folder, create heroku app: `heroku create <appname>` or just `heroku create` to let Heroku name the app for you.

Set Environment Variables: 

`heroku config:add MONGOLAB_URI=mongodb://<username>:<password>@ds047478.mongolab.com:47478/myDB` 

(you'll see this url when you create a db in mongolab)


Run: `git push heroku master`


Have fun!!

Special shoutout to @masondesu for http://github.com/masondesu/tiny-server (which comprises the node, express, mongo side of this repo)


