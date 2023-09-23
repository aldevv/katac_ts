import { copy, createDay, setupDirs, getDay, log } from "./utils.js";
import { Command } from "commander";

const program = new Command();
program
  .option("-k, --kata-home <path>", "path to kata folder")
  .option("-d, --days-home <path>", "path to days folder")
  .version(require("../package.json").version)
  .showHelpAfterError()
  .parse(process.argv);

const opts = program.opts();
export const KATAS_HOME =
  opts.kataHome || process.env.KATAS_HOME || process.cwd() + "/katas";
export const DAYS_HOME =
  opts.daysHome || process.env.DAYS_HOME || process.cwd() + "/days";

export async function main(): Promise<void> {
  try {
    setupDirs();
    let day: string = getDay();

    let args: string[] = program.args;
    for (let kata of args) {
      copy(kata, day);
    }
  } catch (err) {
    log.error(err);
  }
}

main();
