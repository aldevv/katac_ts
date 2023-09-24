# katac

## NAME

katac - run coding katas

## SYNOPSIS

**katac** [--day-home *<DAY_HOME>*] [--katas-home *<KATAS_HOME>*] *<KATA_NAME>*

## DESCRIPTION

**katac** is a tool to do daily katas . katas are located in the **KATAS_HOME** directory, defaults to ./katas and the days are put in the **DAY_HOME** directory which defaults to ./days.

## EXAMPLES

create a kata named foo
```bash
mkdir -p katas/foo
touch katas/foo/bar.go
``` 

run katac
```bash
katac foo
```
open the day1 folder and start coding
```bash
cd days/day1/foo
```


## OPTIONS

- **<KATA_NAME>**: The name of the kata to run.

- **--day-home <DAY_HOME>**: The directory where each day's kata is kept. Defaults to ./days

- **--katas-home <KATAS_HOME>**: The directory containing the each kata's starting point. Defaults to ./katas


## ENVIRONMENT

- **KATAS_HOME**: The default katas home directory.

- **DAYS_HOME**: The default day home directory.


## SEE ALSO

**bun**(1)


## AUTHOR

thealdevv@gmail.com
