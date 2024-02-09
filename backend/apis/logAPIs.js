const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const { LOG_KEYS } = require("../constants/LogConstants");

const router = express.Router();

//connecting to the mongo databsase
mongoose.connect("mongodb://localhost:27017/logs", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//creating a schema for the logs
const logSchema = new mongoose.Schema({
  level: { type: String, index: true },
  message: { type: String, index: true },
  resourceId: { type: String, index: true },
  timestamp: { type: Date, index: true },
  traceId: { type: String, index: true },
  spanId: { type: String, index: true },
  commit: { type: String, index: true },
  metadata: {
    parentResourceId: { type: String, index: true },
  },
});

//text index for the search field
logSchema.index({
  level: "text",
  message: "text",
  resourceId: "text",
  traceId: "text",
  spanId: "text",
  commit: "text",
  "metadata.parentResourceId": "text",
});

//creating a log model
const Log = mongoose.model("Log", logSchema);

router.use(cors());
router.use(bodyParser.json());

/**
 * @NOTE
 * API - TO SEND THE LOGS OVER PORT 3000 AND POPULATE THE DATA-BASE
 */
router.post("/log", (req, res) => {
  const logData = req.body;

  const log = new Log(logData);

  // Save the log to the database
  log
    .save()
    .then(() => {
      res.json({ status: "success" });
    })
    .catch((error) => {
      console.error("Error saving log:", error);
      res.status(500).json({ status: "error", error: "Internal Server Error" });
    });
});

/**
 * @NOTE API - TO RETRIEVE ALL THE LOGS
 */
router.get("/getLogs", async (req, res) => {
  try {
    const logs = await Log.find({});
    res.json({ status: "success", logs });
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
});

/**
 * @NOTE
 * API - TO GET THE FILTERED LOGS
 */
router.get("/getFilteredLogs", async (req, res) => {
  try {
    const query = req.query;

    //constructing the filter object based on the query parameters
    const filter = {};
    //processing the dropdowns filter query
    LOG_KEYS.forEach((key) => {
      const value = query?.[key];
      if (value) {
        switch (key) {
          case "parentResourceId":
            filter["metadata.parentResourceId"] = value;
            break;
          default:
            filter[key] = value;
            break;
        }
      }
    });

    //processing the date-range filter query
    if (query?.["dateData"]) {
      const { startTime, endTime } = query["dateData"];

      const formattedStartTime = new Date(startTime);
      const formattedEndTime = new Date(endTime);

      if (!isNaN(formattedStartTime) && !isNaN(formattedEndTime)) {
        filter["timestamp"] = {
          $gte: formattedStartTime,
          $lte: formattedEndTime,
        };
      }
    }

    //finding the documents in the "logs" collection based on the filter
    const logs = await Log.find(filter);

    res.json({ status: "success", logs });
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
});

/**
 * @NOTE
 * API - TO FILTER LOGS BASED ON SEARCH RESULTS
 */
router.get("/getSearchFilteredLogs", async (req, res) => {
  const searchText = req.query.searchQuery;

  try {
    const results = await Log.find({
      $or: [
        { level: { $regex: searchText, $options: "i" } },
        { message: { $regex: searchText, $options: "i" } },
        { resourceId: { $regex: searchText, $options: "i" } },
        { traceId: { $regex: searchText, $options: "i" } },
        { spanId: { $regex: searchText, $options: "i" } },
        { commit: { $regex: searchText, $options: "i" } },
        {
          ["metadata.parentResourceId"]: { $regex: searchText, $options: "i" },
        },
      ],
    }).sort({ createdAt: -1 });

    res.json({ status: "success", logs: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
