<script>
//KOMPONEN
import ContentContainer from "../components/ContentContainer.vue";
import Button from "../components/Button.vue";
import TextField from "../components/TextField.vue";

//DATA
import formLabels from "../data/formLabels.json";

export default {
  name: "RincianMemo",
  components: {
    ContentContainer,
    Button,
    TextField,
  },
  data() {
    return {
      formLabels,
    };
  },
};
</script>
<template>
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
        <TextField :labels="formLabels.labelsMemo" />
        <div class="flex gap-2 justify-end">
          <Button button="Edit" variantClass="lightBlue" />
          <Button button="Simpan" variantClass="blue" />
        </div>
      </div>
    </template>
  </ContentContainer>
</template>
