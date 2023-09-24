# Installation
```bash
npm install -g katac
```

# Usage
```bash
npx katac <KATA_NAME>
```

# Examples

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

## Parameters
|Parameter        |Description                                                        |Example     |
|-----------------|-------------------------------------------------------------------|------------|
|**<KATA_NAME>**  |name of the kata to run                                            |QuickSort   |
|**--days-home**  |folder where new days are going to be created. Defaults to ./days  |~/days      |
|**--katas-home** |folder where the katas are kept . Defaults to ./katas |~/katas     |
