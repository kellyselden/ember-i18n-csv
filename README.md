# ember-i18n-csv

Export your ember-i18n localization files to a CSV file for translators:

```
node to-csv path_to_locales_folder i18n.csv
```

and import back in when you get them back:

```
node to-js i18n.csv path_to_locales_folder [--jshint-ignore]
```
