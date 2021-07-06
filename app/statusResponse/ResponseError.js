const ErrorMessage = require("./error.message");

module.exports = (error, req, res, next) => {
  if (!error) {
    next();
  }
  if (error.name) {
    res.status(error.status || 500).json({
      status: "not success",
      message: error.message,
      data: error.data ? error.data : "",
    });
  } else {
    res.status(500).json({
      status: false,
      message: ErrorMessage.error500,
    });
  }
};
///
