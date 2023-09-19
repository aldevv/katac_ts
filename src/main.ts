import {
  createDay,
  createKataDirectories as createDirectories,
  getDay,
  getKataFiles,
  log,
} from "./utils";

import { readdir } from "node:fs/promises";
import fse from "fs-extra";
import fs from "fs";

const KATA_HOME = process.env.KATA_HOME || process.cwd() + "/katas";
const DAYS_HOME = process.env.DAYS_HOME || process.cwd() + "/days";

async function main(): Promise<void> {
  createDirectories(KATA_HOME, DAYS_HOME);
  let day = getDay(DAYS_HOME);
  createDay(day);

  try {
    let args: string[] = process.argv.slice(2);
    for (let [i, kata] of args.entries()) {
      let kDir = `${KATA_HOME}/${kata}`;
      log.info("found kata", { [`kata ${i + 1}`]: kDir });

      let kFiles: string[] = await readdir(kDir);
      log.info("found items", { [`kata ${i + 1}`]: kFiles });
      if (kFiles.length <= 0) {
        log.error("given kata has no files", kDir);
        return;
      }

      let src = `${kDir}`;
      let dst = `${day}/${kata}`;
      log.info("copying directory", {
        src: src,
        dst: dst,
      });
      fse.copySync(src, dst);
    }
  } catch (err) {
    log.error(err);
  }
}

main();
