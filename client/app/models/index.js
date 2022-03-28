const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.todo = require("./todo.model")(mongoose);
db.user = require("./user.model")(mongoose);
db.role = require("./role.model")(mongoose);

db.ROLES = ["user", "admin"];

module.exports = db;