import {
  copy,
  createDay,
  createKataDirectories as createDirectories,
  getDay,
  log,
} from "./utils";

export const KATAS_HOME = process.env.KATAS_HOME || process.cwd() + "/katas";
export const DAYS_HOME = process.env.DAYS_HOME || process.cwd() + "/days";

async function main(): Promise<void> {
  try {
    createDirectories(KATAS_HOME, DAYS_HOME);
    let day = getDay();
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
