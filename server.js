const express = require("express")
var app = express()
const ResponseErrors = require("./app/statusResponse/ResponseError");
const ErrorMessage = require("./app/statusResponse/error.message");

const bodyParser = require("body-parser");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function (req ,res, next){
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access_token")
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Expose-Headers', 'x-suggested-filename')
    next()
})

app.use((req, res, next) => {
  console.log(`Request URL`, {
    header: req.headers,
    method: req.method
  });
  next();
});

require("./app/route/ticket.route")(app);

app.use((error, req, res, next) => {
  console.log(error);
  ResponseErrors(error, req, res, next);
});


app.use(function (req, res, next) {
  if (req.method != "OPTIONS") {
    res.status(404).send({ error: ErrorMessage.error404 });
  } else {
    next();
  }
});

app.listen(3004, () => {
  console.log("TICKET server is running on 3004");
});
