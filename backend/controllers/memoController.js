import MemoPencairan from "../model/mainForm.js";

export const getAllMemo = async (req, res) => {
  try {
    const data = await MemoPencairan.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};
export const saveFormData = async (req, res) => {
  try {
    const { memoForm, biayaForm, dokumenForm } = req.body;

    if (!memoForm || !biayaForm || !dokumenForm) {
      return res.status(400).json({ message: "Semua data harus terisi!" });
    }

    const doc = await MemoPencairan.create({
      memo: memoForm,
      biaya: biayaForm,
      dokumen: dokumenForm,
    });
    res.status(201).json({ message: "Data berhasil disimpan!", id: doc._id });
  } catch (error) {
    console.error("Error saving data : ", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
