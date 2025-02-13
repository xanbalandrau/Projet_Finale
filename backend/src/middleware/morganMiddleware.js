const morgan = require("morgan");
const logger = require("../config/logger.js");

const morganMiddleware = morgan("combined", {
  stream: {
    write: (message) => {
      logger.info(message.trim()); // Logger la requête HTTP avec winston
    },
  },
});

module.exports = morganMiddleware;
