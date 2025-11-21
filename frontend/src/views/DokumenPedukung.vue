<script>
import ContentContainer from "../components/ContentContainer.vue";
import Button from "../components/Button.vue";
import Alert from "../components/Alert.vue";

export default {
  name: "DokumenPendukung",
  components: { ContentContainer, Button, Alert },
  data() {
    return {
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
    const saved = localStorage.getItem("dokumenForm");
    if (saved) {
      this.dokumenForm = JSON.parse(saved);

      if (this.dokumenForm.file) {
        if (this.dokumenForm.type === "pdf") {
          this.createPdfBlob(this.dokumenForm.file);
        } else {
          this.previewImg = this.dokumenForm.file;
        }
      }
    }
  },
  computed: {
    isPdf() {
      return this.dokumenForm.type === "pdf";
    },
  },
  methods: {
    simpanDokumen() {
      localStorage.setItem("dokumenForm", JSON.stringify(this.dokumenForm));

      this.alert = {
        show: true,
        message: "Data berhasil disimpan!",
        variant: "green",
      };

      setTimeout(() => {
        this.alert.show = false;
      }, 3000);
    },
    bukaFile() {
      if (!this.dokumenForm.file) return;

      if (this.dokumenForm.type === "pdf") {
        window.open(this.pdfUrl, "_blank");
      } else {
        window.open(this.dokumenForm.file, "_blank");
      }
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result;

        this.dokumenForm.file = base64;

        if (file.type === "application/pdf") {
          this.dokumenForm.type = "pdf";
          this.createPdfBlob(base64);
          this.previewImg = null;
        } else {
          this.dokumenForm.type = "img";
          this.previewImg = base64;
          this.pdfUrl = null;
        }

        localStorage.setItem("dokumenForm", JSON.stringify(this.dokumenForm));
      };
      reader.readAsDataURL(file);
    },

    createPdfBlob(base64) {
      const splitData = base64.split(",")[1];
      const byteCharacters = atob(splitData);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const blob = new Blob([new Uint8Array(byteNumbers)], {
        type: "application/pdf",
      });
      this.pdfUrl = URL.createObjectURL(blob);
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
          <Button button="Simpan" variantClass="blue" @click="simpanDokumen" />
        </div>
      </div>
    </template>
  </ContentContainer>
</template>
