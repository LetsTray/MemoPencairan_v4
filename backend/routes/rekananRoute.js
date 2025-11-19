import express from "express";
import { fetch } from "../controllers/rekananController.js";

const route = express.Router();

route.get("/rekanan", fetch);

export default route;
