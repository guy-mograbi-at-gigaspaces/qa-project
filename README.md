[![Dependencies Status](https://david-dm.org/guy-mograbi-at-gigaspaces/qa-project.png)](https://david-dm.org/guy-mograbi-at-gigaspaces/qa-project#info=dependencies)
[![devDependency Status](https://david-dm.org/guy-mograbi-at-gigaspaces/qa-project/dev-status.png)](https://david-dm.org/guy-mograbi-at-gigaspaces/qa-project#info=devDependencies)
[![Build Status](https://travis-ci.org/guy-mograbi-at-gigaspaces/qa-project.png)](https://travis-ci.org/guy-mograbi-at-gigaspaces/qa-project)

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/guy-mograbi-at-gigaspaces/qa-project/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

git clone https://github.com/guy-mograbi-at-gigaspaces/qa-project.git

npm install
bower install

Create ‘backend/dev’ folder & add conf.js file:
{
	exports.testResultsDB = '';
	exports.metricDB = '';
	exports.s3 = [];
}

Then run NodeJS:
node server.js
