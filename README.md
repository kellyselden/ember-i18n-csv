# ember-i18n-csv
[![Build Status](https://travis-ci.org/kellyselden/ember-i18n-csv.svg?branch=master)](https://travis-ci.org/kellyselden/ember-i18n-csv)
[![Build status](https://ci.appveyor.com/api/projects/status/v4eagpd8k731oyul?svg=true)](https://ci.appveyor.com/project/kellyselden/ember-i18n-csv)
[![Code Climate](https://codeclimate.com/github/kellyselden/ember-i18n-csv/badges/gpa.svg)](https://codeclimate.com/github/kellyselden/ember-i18n-csv)
[![Coverage Status](https://coveralls.io/repos/kellyselden/ember-i18n-csv/badge.svg?branch=master&service=github)](https://coveralls.io/github/kellyselden/ember-i18n-csv?branch=master)

Export your ember-i18n localization files to a CSV file for translators:

```
node to-csv path_to_locales_folder i18n.csv
```

and import back in when you get them back:

```
node to-js i18n.csv path_to_locales_folder [--jshint-ignore]
```
