const express = require('express');
const server = express();
const cors = require('cors');

const body_parser = require("body-parser");

server.use(cors());
server.use(body_parser.json());
server.use(body_parser.urlencoded({extended: false}));

require('./controllers/clampController')(server);
require('./controllers/bedController')(server);
require('./controllers/userController')(server);
require('./controllers/adminController')(server);

server.listen(process.env.PORT || 3000);

module.exports = server;