const express = require('express');
const helmet = require("helmet");

const AcctRouter = require("./acct-router");
const db = require('./data/dbConfig.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/accounts", AcctRouter);

module.exports = server;