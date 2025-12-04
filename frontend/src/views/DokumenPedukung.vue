<script>
import axios from "axios";

import ContentContainer from "../components/ContentContainer.vue";
import Button from "../components/Button.vue";
import Alert from "../components/Alert.vue";
import Dialog from "../components/Dialog.vue";

export default {
  name: "DokumenPendukung",
  components: { ContentContainer, Button, Alert, Dialog },
  data() {
    return {
      isKonfirmDialogOpen: false,
      alert: {
        show: false,
        message: "",
        variant: "green",
      },
      previewImg: null,
      pdfUrl: null,
      dokumenForm: {
        file: null,
        type: null,
      },
    };
  },
  mounted() {
    //Agar upload terakhir tetap muncul saat halaman direfresh
    const saved = localStorage.getItem("dokumenForm"); //Mengecek apakah ada data dokumen yang tersimpan di localStorage

    if (saved) {
      this.dokumenForm = JSON.parse(saved); //Jika ada -> load ulang ke dalam dokumenForm
      if (this.dokumenForm.file) {
        if (this.dokumenForm.type === "pdf") {
          //Jika file = pdf -> convert string base64 ke Blob url melalui createPdfBlob()
          this.createPdfBlob(this.dokumenForm.file);
        } else {
          this.previewImg = this.dokumenForm.file;
        }
      }
    }
  },
  computed: {
    isPdf() {
      return this.dokumenForm.type === "pdf"; //Mengembalikan nilai true jika file adalah pdf untuk menentukan penggunaan preview
    },
  },
  methods: {
    simpanDokumen() {
      //Menyimpan dokumen dan memberi feedback ke user
      localStorage.setItem("dokumenForm", JSON.stringify(this.dokumenForm)); //Menyimpan dokumenForm ke localStorage

      this.alert = {
        //Memunculkan alert success
        show: true,
        message: "Data berhasil disimpan!",
        variant: "green",
      };

      setTimeout(() => {
        this.alert.show = false; //Menutup alert setelah 3 detik
      }, 3000);
    },
    bukaFile() {
      //Memungkinkan user membuka dokumen di tab baru
      if (!this.dokumenForm.file) return;

      if (this.dokumenForm.type === "pdf") {
        //Jika file pdf -> dibuka menggunakan pdfUrl (Blob url)
        window.open(this.pdfUrl, "_blank");
      } else {
        window.open(this.dokumenForm.file, "_blank"); //Jika gambar -> dibuka menggunakan base64 string
      }
    },
    onFileChange(event) {
      //Intinya : proses upload + preview + save otomatis
      const file = event.target.files[0]; //Mengambil file dari input
      if (!file) return;

      const reader = new FileReader(); //Membaca menggunakan FileReader menjadi base64

      reader.onload = () => {
        const base64 = reader.result;

        this.dokumenForm.file = base64; //Menyimpan base64 ke dokumenForm.file

        if (file.type === "application/pdf") {
          //Jika pdf -> buat blob
          this.dokumenForm.type = "pdf";
          this.createPdfBlob(base64);
          this.previewImg = null;
        } else {
          this.dokumenForm.type = "img"; //Jika gambar -> langsung tampil di preview
          this.previewImg = base64;
          this.pdfUrl = null;
        }

        localStorage.setItem("dokumenForm", JSON.stringify(this.dokumenForm));
      };
      reader.readAsDataURL(file);
    },

    createPdfBlob(base64) {
      //Penting untuk preview pdf karena <embed> tidak bisa baca base64 langsung
      const splitData = base64.split(",")[1]; //Memisahkan metadata base64
      const byteCharacters = atob(splitData); //Decode menjadi byte array
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const blob = new Blob([new Uint8Array(byteNumbers)], {
        //Membuat blob url
        type: "application/pdf",
      });
      this.pdfUrl = URL.createObjectURL(blob);
    },
    handleKonfirmDialogClose() {
      this.isKonfirmDialogOpen = false;
    },
    async localToMDB() {
      try {
        const memoForm = JSON.parse(localStorage.getItem("memoForm"));
        const biayaForm = JSON.parse(localStorage.getItem("biayaForm"));
        const dokumenForm = JSON.parse(localStorage.getItem("dokumenForm"));

        if (!memoForm || !biayaForm || !dokumenForm) {
          this.alert = {
            show: true,
            message: "Pastikan semua form telah terisi.",
            variant: "red",
          };
          setTimeout(() => {
            this.alert.show = false;
          }, 3000);
          return;
        }

        const res = await axios.post(
          "http://localhost:8000/api/Entry_MemoPencairanAnggaran/simpan-memo",
          {
            memoForm,
            biayaForm,
            dokumenForm,
          }
        );

        this.alert = {
          show: true,
          message: res.data.message || "Data berhasil disimpan!",
          variant: "green",
        };
        localStorage.clear();

        this.dokumenForm = { file: null, type: null };
        this.previewImg = null;
        this.pdfUrl = null;
      } catch (error) {
        console.error("Error menyimpan data : ", error);
        this.alert = {
          show: true,
          message: "Gagal menyimpan data! Coba lagi.",
          variant: "red",
        };
        setTimeout(() => {
          this.alert.show = false;
        }, 3000);
      }
    },
  },
};
</script>
<template>
  <div class="relative">
    <div class="absolute top-4 right-6 z-50">
      <Alert
        :show="alert.show"
        :message="alert.message"
        :variantClass="alert.variant"
      />
    </div>
  </div>

  <ContentContainer
    variantClass="gray"
    sizeClass="full"
    headerClass="black"
    header="Dokumen Pendukung"
    additionalStyle="overflow-auto max-h-[500px] md:max-h-[520px] lg:max-h-[560px]"
  >
    <template #body>
      <div class="flex flex-col gap-2">
        <div
          class="p-3 bg-[#EBF3F9] h-[450px] flex items-center justify-center cursor-pointer border"
          @click="bukaFile"
        >
          <p v-if="!previewImg && !isPdf" class="text-gray-500">
            Belum ada dokumen yang diupload
          </p>

          <img
            v-if="previewImg && !isPdf"
            :src="previewImg"
            alt="Preview"
            class="max-w-full max-h-full object-contain"
          />

          <embed
            v-if="isPdf && pdfUrl"
            :src="pdfUrl"
            type="application/pdf"
            width="100%"
            height="420px"
          />
        </div>
        <div class="flex w-fit bg-[#DADADA] border border-black px-3 py-2">
          <input
            type="file"
            @change="onFileChange"
            accept=".pdf"
            class="text-sm"
          />
        </div>

        <div class="flex justify-end">
          <Button
            button="Simpan"
            variantClass="blue"
            @click="
              simpanDokumen();
              isKonfirmDialogOpen = true;
            "
          />
        </div>

        <Dialog
          header="Konfirmasi Simpan Entry Pencairan Anggaran"
          :isDialogOpen="isKonfirmDialogOpen"
          @close="handleKonfirmDialogClose"
        >
          <template #body>
            <div class="flex flex-col justify-center items-center">
              <p class="text-center">
                Pastikan seluruh informasi yang dimasukkan sudah lengkap dan
                sesuai. <br />
                <b
                  >Setelah disimpan, data tidak dapat diubah. Tetap simpan
                  entry?</b
                >
              </p>

              <div class="flex my-4">
                <Button
                  button="Simpan"
                  variantClass="blue"
                  @click="
                    localToMDB();
                    isKonfirmDialogOpen = false;
                  "
                />
              </div>
            </div>
          </template>
        </Dialog>
      </div>
    </template>
  </ContentContainer>
</template>
