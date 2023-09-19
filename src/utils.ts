import winston from "winston";
import { join } from "node:path";
import fs from "fs";

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
    log.info("kata home found", { KATA_HOME: kataHome });
  } else {
    fs.mkdirSync(kataHome);
    log.info(`Created ${kataHome}`);
  }

  if (!fs.existsSync(daysHome)) {
    fs.mkdirSync(daysHome);
    log.info(`Created ${daysHome}`);
  } else {
    log.info("days home found", { DAYS_HOME: daysHome });
  }
};

export const getDay = (daysHome: string): string => {
  const files = fs.readdirSync(daysHome).sort((a, b) => {
    const aNumber = parseInt(a.replace("day", ""));
    const bNumber = parseInt(b.replace("day", ""));
    return aNumber - bNumber;
  });
  if (files.length === 0) {
    return daysHome + "/day1";
  }
  const lastDay = files[files.length - 1];
  const dayNumber = parseInt(lastDay.replace("day", ""));
  return `${daysHome}/day${dayNumber + 1}`;
};

export const createDay = (day: string): void => {
  if (!fs.existsSync(day)) {
    fs.mkdirSync(day);
    log.info(`Created ${day}`);
  }
};
