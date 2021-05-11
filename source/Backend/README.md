# PostgreSQL and TypeORM Quick Setup
## Introduction
This was set up and working on Ubuntu 18.04.3 LTS.<br>
If you are using MacOS there is a link for PostgreSQL installation in the resources at the bottom of this [file](##some-useful-resources).<br>
If you are using Windows 10 you can setup [WSL2](https://docs.microsoft.com/en-us/windows/wsl/install-win10) just make sure to install Ubuntu unless you are comforatble using other Linux Distrobutions.

## PostgreSQL Installation and setup
Commands to run for [installation](https://www.postgresql.org/download/linux/ubuntu/):
1. `sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'`
2. `wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -`
3. `sudo apt-get update`
4. `sudo apt-get -y install postgresql`

To create a new database run `createdb <Database Name>`<br>
If you run into any issues saying that "FATAL:role "username" does not exist" you may have to create a new user.<br>
To do so run (https://stackoverflow.com/questions/16973018/createuser-could-not-connect-to-database-postgres-fatal-role-tom-does-not-e):
1. ` sudo -u postgres psql`
2. `CREATE USER <new_username>;`
3. `ALTER USER new_username SUPERUSER CREATEDB;`

Here is the PostgreSQL documentation: https://www.postgresql.org/docs/13/index.html

## TypeORM Installation and setup
Commands to run for [installation](https://github.com/typeorm/typeorm/blob/master/README.md#installation):
1. `npm install typeorm --save`
2. `npm install reflect-metadata --save`
3. `npm install @types/node --save-dev`
3. `npm install pg --save`

You may need to `sudo` run these commands and install them globally if you are getting permission errors installing the packages

A quick overiew to get things set up:
1. Create a new directory and `cd` into it
2. Run `typeorm init --name <project-name> --database postgres`
3. That should have created a new directory named `<project-name>` and `cd` into that directory.
3. Run `npm install`

You should have a new project started now. <br>
Go into the `ormconfig.json` file and it should look like so: <br>
```
{
   "type": "postgres",
   "host": "localhost",
   "port": 5432,
   "username": "test",
   "password": "test",
   "database": "test",
   "synchronize": true,
   "logging": false,
   "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}
```

`host` is localhost since you have the database setup on your current machine.<br>
`port` is 5432 because that is the default port of a postgres database.<br>
Replace the "test" username with the username you created earlier.<br>
Replace the "test" password with a password if you created one.<br>
Replace the "test" database with the name of the database you created.<br>

Now run `npm start` and if you configured everything correctly your terminal should output something like:
```
> test2@0.0.1 start
> ts-node src/index.ts

Inserting a new user into the database...
Saved a new user with id: 1
Loading users from the database...
Loaded users:  [ User { id: 1, firstName: 'Timber', lastName: 'Saw', age: 25 } ]
Here you can setup and run express/koa/any other framework.
```
You can also check that the entry is now in your database by going to a terminal and running: `psql <database-name>`<br>
Then running `SELECT * FROM user;` and the output should be: <br>
```
  user  
--------
 <your-username>
(1 row)
```

## Some Useful Resources
[PostgreSQL Documentation](https://www.postgresql.org/docs/13/index.html)<br>
[PostgreSQL Installation for MacOS](https://www.postgresql.org/download/macosx/)<br>
[TypeORM Quick Start Guide](https://www.tutorialspoint.com/typeorm/typeorm_quick_guide.htm)<br>
[TypeORM Github](https://github.com/typeorm/typeorm)<br>
