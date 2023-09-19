import { copy, createDirs, getDay, log } from "./utils";

export const KATAS_HOME = process.env.KATAS_HOME || process.cwd() + "/katas";
export const DAYS_HOME = process.env.DAYS_HOME || process.cwd() + "/days";

//TODO: add ignore patterns inside the katas, like if is a git repo ignore the .git folder
async function main(): Promise<void> {
  try {
    let day: string = getDay();
    createDirs(day);

    let args: string[] = process.argv.slice(2);
    for (let kata of args) {
      copy(kata, day);
    }
  } catch (err) {
    log.error(err);
  }
}

main();
