import { copy, setupDirs, getDay, log, copyAll } from "./utils.js";
import { Command } from "commander";
import pkg from "../package.json" assert { type: "json" };
// import { config } from "../config.js";

const program = new Command();
program
  .option("-k, --kata-home <path>", "path to kata folder")
  .option("-d, --days-home <path>", "path to days folder")
  .version(pkg.version)
  .showHelpAfterError()
  .parse(process.argv);

const opts = program.opts();
export const KATAS_HOME =
  opts.kataHome || process.env.KATAS_HOME || process.cwd() + "/katas";
export const DAYS_HOME =
  opts.daysHome || process.env.DAYS_HOME || process.cwd() + "/days";

const config = {
  // possible modes are "generate" "random"
  mode: "generate",
  maxPerDay: 10,
  katas: ["Queue"],
};

export async function main(): Promise<void> {
  try {
    setupDirs();
    let day: string = getDay();
    let katas: string[] = program.args.length > 0 ? program.args : config.katas;
    switch (config.mode) {
      case "generate":
        copyAll(katas, day, config.maxPerDay);
      case "random":
        katas.sort(() => Math.random() - 0.5);
        copyAll(katas, day, config.maxPerDay);
    }
  } catch (err) {
    log.error(err);
  }
}

main();
