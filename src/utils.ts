import winston from "winston";
import fs from "fs";
import fse from "fs-extra";
import { DAYS_HOME, KATAS_HOME } from "./main";

function createLogger() {
  let format = winston.format;
  const myFormat = () => {
    return format.printf(
      (logInfo) =>
        `${JSON.stringify({
          timestamp: logInfo.timestamp,
          ...logInfo,
        })}`,
    );
  };

  return winston.createLogger({
    level: process.env.KATA_LOG_LEVEL || "info",
    format: format.combine(format.timestamp(), myFormat()),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "error.log", level: "error" }),
      new winston.transports.File({ filename: "combined.log" }),
    ],
  });
}

export const log = createLogger();

export const createKataDirectories = (
  kataHome: string,
  daysHome: string,
): void => {
  if (fs.existsSync(kataHome)) {
    log.debug("kata home found", { KATA_HOME: kataHome });
  } else {
    fs.mkdirSync(kataHome);
    log.debug(`Created ${kataHome}`);
  }

  if (!fs.existsSync(daysHome)) {
    fs.mkdirSync(daysHome);
    log.debug(`Created ${daysHome}`);
  } else {
    log.debug("days home found", { DAYS_HOME: daysHome });
  }
};

export const getDay = (): string => {
  const files = fs.readdirSync(DAYS_HOME).sort((a, b) => {
    const aNumber = parseInt(a.replace("day", ""));
    const bNumber = parseInt(b.replace("day", ""));
    return aNumber - bNumber;
  });
  if (files.length === 0) {
    return DAYS_HOME + "/day1";
  }
  const lastDay = files[files.length - 1];
  const dayNumber = parseInt(lastDay.replace("day", ""));
  return `${DAYS_HOME}/day${dayNumber + 1}`;
};

export const createDay = (day: string): void => {
  if (!fs.existsSync(day)) {
    fs.mkdirSync(day);
    log.debug(`Created ${day}`);
  }
};

export const copy = (kata: string, day: string): void => {
  let kDir = `${KATAS_HOME}/${kata}`;
  log.info("found kata", { kata: kDir });

  let src = `${kDir}`;
  let dst = `${day}/${kata}`;
  log.info("copying directory", {
    src: src,
    dst: dst,
  });
  fse.copySync(src, dst);
};
