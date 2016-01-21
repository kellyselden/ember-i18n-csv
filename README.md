# ember-i18n-csv
[![Build Status](https://travis-ci.org/kellyselden/ember-i18n-csv.svg?branch=master)](https://travis-ci.org/kellyselden/ember-i18n-csv)
[![Build status](https://ci.appveyor.com/api/projects/status/v4eagpd8k731oyul/branch/master?svg=true)](https://ci.appveyor.com/project/kellyselden/ember-i18n-csv/branch/master)
[![Code Climate](https://codeclimate.com/github/kellyselden/ember-i18n-csv/badges/gpa.svg)](https://codeclimate.com/github/kellyselden/ember-i18n-csv)
[![Coverage Status](https://coveralls.io/repos/kellyselden/ember-i18n-csv/badge.svg?branch=master&service=github)](https://coveralls.io/github/kellyselden/ember-i18n-csv?branch=master)

[![npm version](https://badge.fury.io/js/ember-i18n-csv.svg)](https://badge.fury.io/js/ember-i18n-csv)
[![Dependency Status](https://david-dm.org/kellyselden/ember-i18n-csv.svg)](https://david-dm.org/kellyselden/ember-i18n-csv)
[![devDependency Status](https://david-dm.org/kellyselden/ember-i18n-csv/dev-status.svg)](https://david-dm.org/kellyselden/ember-i18n-csv#info=devDependencies)

JSON to CSV and vice-versa for [ember-i18n](https://github.com/jamesarosen/ember-i18n)

###Installation

```sh
npm install -g ember-i18n-csv
```

###Example

Export your ember-i18n localization files to a CSV file for translators:

```sh
ember-i18n-csv to-csv --locales-path=path_to_locales_folder --csv-path=i18n.csv
```

and import back in when you get them back:

```sh
ember-i18n-csv to-js --csv-path=i18n.csv --locales-path=path_to_locales_folder [--jshint-ignore]
```
