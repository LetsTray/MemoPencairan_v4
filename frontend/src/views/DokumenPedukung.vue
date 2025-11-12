<script>
//KOMPONEN
import ContentContainer from "../components/ContentContainer.vue";
import CheckBox from "../components/CheckBox.vue";
import Button from "../components/Button.vue";

//DATA
import checkboxLabels from "../data/checkboxLabels.json";

export default {
  name: "DokumenPendukung",
  components: {
    ContentContainer,
    CheckBox,
    Button,
  },
  data() {
    return {
      checkboxLabels,
    };
  },
};
</script>
<template>
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
          <input type="file" />
        </div>
        <div>
          <CheckBox :labels="checkboxLabels" />
        </div>
        <div class="flex gap-2 justify-end">
          <Button button="Edit" variantClass="lightBlue" />
          <Button button="Simpan" variantClass="blue" />
        </div>
      </div>
    </template>
  </ContentContainer>
</template>
