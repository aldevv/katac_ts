import { copy, createDay, createDirs, getDay, log } from "./utils.js";

export const KATAS_HOME = process.env.KATAS_HOME || process.cwd() + "/katas";
export const DAYS_HOME = process.env.DAYS_HOME || process.cwd() + "/days";

export async function main(): Promise<void> {
  try {
    createDirs();
    let day: string = getDay();
    createDay(day);

    let args: string[] = process.argv.slice(2);
    for (let kata of args) {
      copy(kata, day);
    }
  } catch (err) {
    log.error(err);
  }
}

main();
