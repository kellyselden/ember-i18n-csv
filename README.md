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
ember-i18n-csv to-csv --locales-path=path_to_locales_folder --csv-path=i18n.csv [--missing-only]
```

and import back in when you get them back:

```sh
ember-i18n-csv to-js --csv-path=i18n.csv --locales-path=path_to_locales_folder [--jshint-ignore] [--merge]
```

`--missing-only` means the generated CSV will only contain keys where there is a missing translation in one of the locales
`--jshint-ignore` will put ignore comments in your js files, useful if you lint for single quotes
`--merge` means that any keys present in the CSV will overwrite the ones present in the destination locale files but if the key is not present then the existing key will be kept in place. 

###Excel

It's not as simple as opening, editing, and saving in Excel.

* Import
  1. blank workbook
  * import data from text
  * delimited
  * 65001
  * comma
  * shift click select all columns
  * change from general to text (general tries to guess types ie. will convert "true" to "TRUE")
* Edit
  * nothing special
* Export
  1. save as
  * CSV (Command delimited)
  * the resulting file will not be utf8. convert to utf8 (notepad++ for me)
