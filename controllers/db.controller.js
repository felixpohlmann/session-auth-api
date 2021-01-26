const mongoose = require("mongoose");
const config = require("../config/db.config");

const { user, pwd, dbname } = config;

const conURI = `mongodb+srv://${user}:${pwd}@app-data.ez8oa.mongodb.net/${dbname}?retryWrites=true&w=majority`;

function connect() {
  mongoose.connect(
    conURI,
    { useUnifiedTopology: true, useNewUrlParser: true },
    (err) => {
      if (err) throw err;
      console.log("Successfully connected to database");
    }
  );
}

module.exports = { connect };
