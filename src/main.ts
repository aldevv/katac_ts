import { getKataFiles, log } from "./utils";

const KATA_DIR = process.env.KATA_DIR || process.cwd();

async function main(): Promise<void> {
  log.debug("kata home found", { KATA_DIR });
  try {
    let args: string[] = process.argv.slice(2);
    for (let [i, a] of args.entries()) {
      let dir = `${KATA_DIR}/${a}`;
      log.info("found kata", { [`kata ${i + 1}`]: dir });
      let files: string[] = await getKataFiles(dir);
      if (files.length <= 0) {
        log.error("given kata has no files", dir);
        console.error("given kata has no files", dir);
        return;
      }

      for (let [i, f] of files.entries()) {
        log.debug("found file", { [`file ${i + 1}`]: f });
      }
    }
  } catch (err) {
    log.error(err);
  }
}

main();
