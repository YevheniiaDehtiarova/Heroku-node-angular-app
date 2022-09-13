if (process.env.NODE_ENV === "production") {
  module.exports = require("../config/keys.prod");
} else {
  module.exports = require("../config/keys.dev");
}
