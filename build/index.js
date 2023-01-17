"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./src/db/db");
const index_1 = __importDefault(require("./src/routes/index"));
const server = (0, express_1.default)();
const port = process.env.PORT || 3001;
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use(index_1.default);
server.use((err, req, res, next) => {
    const message = err.message || err;
    console.error(err);
    res.status(500).send(message);
});
(0, db_1.mongooseConnect)();
server.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
