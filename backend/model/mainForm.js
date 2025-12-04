import mongoose from "mongoose";


const DokumenSchema = new mongoose.Schema(
  {
    file: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["pdf", "img"],
      required: true,
    },
  },
  { _id: false }
);

const MemoSchema = new mongoose.Schema(
  {
    memo: { type: Object, required: true },
    biaya: { type: Object, required: true },
    dokumen: { type: DokumenSchema, required: true },
  },
  {
    timestamps: true,
    collection: "Data_Memo",
  }
);

export default mongoose.model("MemoPencairan", MemoSchema);
