## Baby Mean - small reference app for the mean stack
Nothing groundbreaking here!  This app is intended as a learning tool that consists of Angular, Node, MongoDB, and Express with CRUD.

Would not recommend use in a production environment!

### Local Deployment
Install Dependencies: `npm install` (there's a postinstall in `package.json` to get bower dependencies).

Install Mongo: 'brew install mongo' if on OSX or by other means.
Run Mongo Daemon: 'mongod' to start the local mongo database up 
Run: `grunt` to run the default task.

### Heroku Deployment
Required:
- Mongolab account, or other offering for mongodb
- Heroku account and heroku toolbelt (heroku-cli)

Initialize and/or commit as git repo: `git init` and `git add .` and `git commit -am 'initial commit'`

In root folder, create heroku app: `heroku create <appname>` or just `heroku create` to let Heroku name the app for you.

Set Environment Variables: 

`heroku config:add MONGOLAB_URI=mongodb://<username>:<password>@ds047478.mongolab.com:47478/myDB` (you'll see this url when you create a db in mongolab)


Run: `git push heroku master`


Have fun!!

Special shoutout to @masondesu for http://github.com/masondesu/tiny-server (which comprises the node, express, mongo side of this repo)


