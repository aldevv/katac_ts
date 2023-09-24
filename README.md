# installation
```bash
npm install -g katac
```

# usage
```bash
npx katac foo
```

# examples

create a kata named foo
```bash
mkdir -p katas/foo
touch katas/foo/bar.go
``` 
run katac
```bash
npx katac foo
```
open the day1 folder and start coding
```bash
cd days/day1/foo
```

## Options

- **<KATA_NAME>**: The name of the kata to run.

- **--day-home <DAY_HOME>**: The directory where each day's kata is kept. Defaults to ./days

- **--katas-home <KATAS_HOME>**: The directory containing the each kata's starting point. Defaults to ./katas

## Environment variables

- **KATAS_HOME**: The default katas home directory.
- **DAYS_HOME**: The default day home directory.
