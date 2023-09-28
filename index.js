const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");

const CONFIG = require("./config/index");
const logger = require("./utils/logger");

const app = express();

app.set("trust proxy", 1);

// Cors for cross origin requests
const whitelist = CONFIG.WHITELIST.split(",");
app.use(
  cors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Body Parser middleware
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// Routes
app.use("/dev", routes);

// Will be removed later. Kept for testing.
app.get("/", (req, res) => {
  res.send("Homepage"); // Placeholder
});

app.listen(CONFIG.PORT || 4000, () =>
  logger.log("info", `Started listening on port:${CONFIG.PORT || 4000}`)
);
