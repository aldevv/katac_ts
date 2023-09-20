import winston from "winston";
import fs from "fs";
import fse from "fs-extra";
import { DAYS_HOME, KATAS_HOME } from "./index.js";

const createLogger = () => {
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
};

export const log = createLogger();

export const createDay = (day: string): void => {
  if (!fs.existsSync(day)) {
    fs.mkdirSync(day);
    log.debug(`Created ${day}`);
  }
};

export const createDirs = () => {
  if (!fs.existsSync(KATAS_HOME)) {
    fs.mkdirSync(KATAS_HOME);
    log.debug(`Created ${KATAS_HOME}`);
  } else {
    log.debug("kata home found", { KATA_HOME: KATAS_HOME });
  }
  if (!fs.existsSync(DAYS_HOME)) {
    fs.mkdirSync(DAYS_HOME);
    log.debug(`Created ${DAYS_HOME}`);
  } else {
    log.debug("days home found", { DAYS_HOME: DAYS_HOME });
  }
};

export const getDay = (): string => {
  const files = fs
    .readdirSync(DAYS_HOME)
    .sort((a: string, b: string): number => {
      const aNumber: number = parseInt(a.replace("day", ""));
      const bNumber: number = parseInt(b.replace("day", ""));
      return aNumber - bNumber;
    });
  if (files.length === 0) {
    return DAYS_HOME + "/day1";
  }
  const lastDay: string = files[files.length - 1];
  const day: number = parseInt(lastDay.replace("day", ""));
  return `${DAYS_HOME}/day${day + 1}`;
};

export const copy = (kata: string, day: string): void => {
  const src = `${KATAS_HOME}/${kata}`;
  const dst = `${day}/${kata}`;
  log.info("copying directory", {
    src,
    dst,
  });
  fse.copySync(src, dst);
};
