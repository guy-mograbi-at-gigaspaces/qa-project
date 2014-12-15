[![Dependencies Status](https://david-dm.org/guy-mograbi-at-gigaspaces/qa-project.png)](https://david-dm.org/guy-mograbi-at-gigaspaces/qa-project#info=dependencies)
[![devDependency Status](https://david-dm.org/guy-mograbi-at-gigaspaces/qa-project/dev-status.png)](https://david-dm.org/guy-mograbi-at-gigaspaces/qa-project#info=devDependencies)
[![Build Status](https://travis-ci.org/guy-mograbi-at-gigaspaces/qa-project.png)](https://travis-ci.org/guy-mograbi-at-gigaspaces/qa-project)

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/guy-mograbi-at-gigaspaces/qa-project/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

# Steps to run the project

```bash
git clone https://github.com/guy-mograbi-at-gigaspaces/qa-project.git
cd qa-project
npm install
bower install
```

Create ‘backend/dev’ folder & add conf.js file:

```JSON
module.exports = {
    "testResultsDB" : {
        "user" : "__mysql_username__", 
        "host":"__mysql_hostname__", 
        "port":"__mysql_port__", 
        "database":"__mysql_db__"
    },
    "s3":[],
    "metricDB" : {}
};
```
Then run NodeJS:

`node server.js`

