# ember-i18n-csv

Export your ember-i18n localization files to a CSV file for translators:

```
node to-csv path_to_locales_folder i18n.csv [--missing-only]
```

`--missing-only` means the generated CSV will only contain keys where there is a missing translation in one of the locales

and import back in when you get them back:

```
node to-js i18n.csv path_to_locales_folder [--jshint-ignore] [--merge]
```

`--merge` means that any keys present in the CSV will overwrite the ones present in the destination locale files but if the key is not present then the existing key will be kept in place.
