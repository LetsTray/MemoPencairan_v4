<script>
//KOMPONEN
import ContentContainer from "../components/ContentContainer.vue";
import CheckBox from "../components/CheckBox.vue";
import Button from "../components/Button.vue";
import Alert from "../components/Alert.vue";

//DATA
import checkbox from "../data/labels/checkbox.json";

export default {
  name: "DokumenPendukung",
  components: {
    ContentContainer,
    CheckBox,
    Button,
    Alert,
  },
  data() {
    return {
      checkbox,
      previewImg: null,
      dokumenForm: {
        file: null,
      },
      alert: {
        show: false,
        message: "",
        variant: "green",
      },
    };
  },
  mounted() {
    const tersimpan = localStorage.getItem("dokumenForm");
    if (tersimpan) {
      this.dokumenForm = JSON.parse(tersimpan);

      if (this.dokumenForm.file) {
        this.previewImg = this.dokumenForm.file;
      }
    }
  },

  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result;

        this.dokumenForm.file = base64;
        this.previewImg = base64;

        localStorage.setItem("dokumenPendukung", base64);
      };
      reader.readAsDataURL(file);
    },
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
    additionalStyle=" overflow-auto max-h-[500px] md:max-h-[520px] lg:max-h-[560px]"
  >
    <template #body>
      <div class="flex flex-col justify-between gap-4">
        <div class="p-3 bg-[#EBF3F9] h-[300px] flex items-end">
          <input type="file" @change="onFileChange" accept=".png, .pdf" />
          <img
            v-if="previewImg"
            :src="previewImg"
            alt="Preview"
            class="max-w-full max-h-full object-contain mt-2"
          />
        </div>
        <div class="flex gap-2 justify-end">
          <Button button="Simpan" variantClass="blue" @click="simpanDokumen" />
        </div>
      </div>
    </template>
  </ContentContainer>
</template>
