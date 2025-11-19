import mongoose from "mongoose";

export const fetch = async (req, res) => {
  try {
    const collection = mongoose.connection.collection("Data_RekananPegawai");
    const rekanan = await collection.find({}).toArray();

    if (rekanan.length === 0) {
      return res.status(404).json({ message: "Rekanan Pegawai Not Found." });
    }
    res.status(200).json(rekanan);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error." });
  }
};
