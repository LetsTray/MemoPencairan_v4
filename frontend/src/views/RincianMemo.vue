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
      isReadOnly: false,
    };
  },
  mounted() {
    const tersimpan = localStorage.getItem("memoForm");
    if (tersimpan) {
      this.memoForm = JSON.parse(tersimpan);
    }

    const read = localStorage.getItem("isReadOnlyMemo");
    if (read !== null) {
      this.isReadOnly = read === "true";
    }
  },
  methods: {
    simpanMemo() {
      const isMemoValid = this.$refs.textFieldMemo.validate();

      if (!isMemoValid) {
        //Jika tidak valid, jangan simpan
        return;
      }

      localStorage.setItem("memoForm", JSON.stringify(this.memoForm));

      this.alert = {
        show: true,
        message: "Data berhasil disimpan!",
        variant: "green",
      };

      setTimeout(() => {
        this.alert.show = false;
      }, 3000);

      this.isReadOnly = true;
      localStorage.setItem("isReadOnlyMemo", "true");
    },
    editMemo() {
      this.isReadOnly = false;
      localStorage.setItem("isReadOnlyMemo", "false");
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
          ref="textFieldMemo"
          :labels="form.labelsMemo"
          :modelValue="memoForm"
          @update:modelValue="memoForm = $event"
          :readOnly="isReadOnly"
          :requiredKeys="[
            'unitKerja',
            'sasaranUnitKerja',
            'programKerja',
            'kegiatan',
            'jenisPencairan',
            'anggaran',
          ]"
        />
        <div class="flex gap-2 justify-end">
          <Button button="Edit" variantClass="lightBlue" @click="editMemo" />
          <Button button="Simpan" variantClass="blue" @click="simpanMemo" />
        </div>
      </div>
    </template>
  </ContentContainer>
</template>
