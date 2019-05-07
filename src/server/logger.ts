import winston from "winston";
const env = process.env.NODE_ENV || "development";

const loggerLv = (env === "production") ? "info" : "silly";

export const logger = winston.createLogger({
    level: loggerLv,
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: "coolLog.log",
        }),
    ],
});
