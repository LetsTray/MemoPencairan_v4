<script>
//KOMPONEN
import ContentContainer from "../components/ContentContainer.vue";
import Button from "../components/Button.vue";
import TextField from "../components/TextField.vue";
import Alert from "../components/Alert.vue";

//DATA
import form from "../data/labels/form.json";

export default {
  name: "RincianMemo",
  components: {
    ContentContainer,
    Button,
    TextField,
    Alert,
  },
  data() {
    return {
      form,
      memoForm: {
        unitKerja: "",
        sasaranUnitKerja: "",
        programKerja: "",
        kegiatan: "",
        jenisPencairan: "",
        anggaran: "",
      },
      alert: {
        show: false,
        message: "",
        variant: "green",
      },
    };
  },
  mounted() {
    const tersimpan = localStorage.getItem("memoForm");
    if (tersimpan) {
      this.memoForm = JSON.parse(tersimpan);
    }
  },
  methods: {
    simpanMemo() {
      localStorage.setItem("memoForm", JSON.stringify(this.memoForm));

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
    header="Rincian Memo"
    additionalStyle=" overflow-auto max-h-[500px] md:max-h-[520px] lg:max-h-[560px]"
  >
    <template #body>
      <div class="flex flex-col justify-between gap-4">
        <hr class="border-t border-[#DADADA]" />
        <TextField
          :labels="form.labelsMemo"
          :modelValue="memoForm"
          @update:modelValue="memoForm = $event"
        />
        <div class="flex gap-2 justify-end">
          <Button button="Edit" variantClass="lightBlue" />
          <Button button="Simpan" variantClass="blue" @click="simpanMemo" />
        </div>
      </div>
    </template>
  </ContentContainer>
</template>
