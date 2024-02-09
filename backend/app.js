const express = require("express");
const logsController = require("./apis/logAPIs");

const app = express();
const port = 3000;

app.use("/api/logs", logsController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
