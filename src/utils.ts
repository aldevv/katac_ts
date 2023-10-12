import winston from "winston";
import fs from "fs";
import fse from "fs-extra";
import { DAYS_HOME, KATAS_HOME } from "./index.js";
import path from "path";

/**
 * creates a json logger that sets the level using the KATA_LOG_LEVEL environment variable
 *
 * @returns logger
 */
const createLogger = (): winston.Logger => {
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

/**
 * Creates the next day directory
 * @param day the day number
 */
export const createDay = (day: string): void => {
  if (!fs.existsSync(day)) {
    fs.mkdirSync(day);
    log.debug(`Created ${day}`);
  }
};

/**
 * validates and creates the katas home directory and the days directory
 */
export const setupDirs = () => {
  if (!fs.existsSync(KATAS_HOME)) {
    fs.mkdirSync(KATAS_HOME);
    log.debug(`Created kata home: ${KATAS_HOME}`);
  } else {
    log.debug("kata home found", { KATA_HOME: KATAS_HOME });
  }
  if (!fs.existsSync(DAYS_HOME)) {
    fs.mkdirSync(DAYS_HOME);
    log.debug(`Created days home ${DAYS_HOME}`);
  } else {
    log.debug("days home found", { DAYS_HOME: DAYS_HOME });
  }
};

/**
 * @returns the next day number
 */
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

/**
 * Copies the chosen kata to the given day's directory
 * @param kata the kata name
 * @param day the day number
 */
export const copy = (kata: string, day: string): void => {
  const src = path.join(KATAS_HOME, kata);
  const dst = path.join(day, kata);

  if (!fs.existsSync(src)) {
    log.error("kata not found", { kata });
    return;
  }
  createDay(day);

  log.info("copying directory", {
    src,
    dst,
  });
  fse.copySync(src, dst);
};

export const copyAll = (
  katas: string[],
  day: string,
  maxPerDay: number,
): void => {
  for (let i = 0; i < katas.length && i < maxPerDay; i++) {
    copy(katas[i], day);
  }
};
