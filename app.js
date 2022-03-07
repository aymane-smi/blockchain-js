const express    = require("express"),
      app        = express(),
      PORT       = process.argv[2] || 8081,
      routes     = require("./routes/index"),
      bodyParser = require("body-parser"),
      cors       = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use("/api/", routes);
app.listen(PORT, ()=>{
    console.log(`listening to ${PORT}`);
});