import winston from "winston";
import { readdir } from "node:fs/promises";
import { join } from "node:path";

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

/**
 * @param {string | Buffer | URL} dir - Directory to read
 * @returns {Promise<string[]>} - Array of long file paths
 */
export const getKataFiles = async (dir: string): Promise<string[]> => {
  const fileNames = await readdir(dir);
  const filePaths = fileNames.map((fn) => join(dir, fn));
  return filePaths;
};
