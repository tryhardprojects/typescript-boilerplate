
import express from "express";
import ejs from "ejs";
import path from "path";
import {
    logger,
} from "./logger";

const app = express();
const port = process.env.PORT || 3000;

app.engine("html", ejs.renderFile);
app.set("view engine", "html");

app.use("/", express.static(path.resolve("./clientBuild")));
app.set("views", path.resolve("./clientBuild/html/"));

app.get("/", (req: any, res) => {
    res.render("test");
});

app.get("/api", (req: any, res) => {
    res.status(200).json(req.protocol + "://" + req.get("host") + req.originalUrl + " This is api!");
});

app.get("*", (req: any, res) => {
    res.status(404).json(req.protocol + "://" + req.get("host") + req.originalUrl + " This page should return 404.");
});

app.listen(port, () => {
    logger.info("Server runnung on " + port);
});