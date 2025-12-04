import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

//Route
import route from "./routes/rekananRoute.js";
import memoRoute from "./routes/memoRoute.js";

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "25mb" }));

dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database connected successful.");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/Entry_MemoPencairanAnggaran", route);
app.use("/api/Entry_MemoPencairanAnggaran", memoRoute)
