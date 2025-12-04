import express from "express";
import { getAllMemo, saveFormData } from "../controllers/memoController.js";

const route = express.Router();

route.post("/simpan-memo", saveFormData);
route.get("/list-memo", getAllMemo);

export default route;
