<script>
import { computed } from "vue";

export default {
  name: "Alert",
  props: {
    message: String,
    variantClass: {
      type: String,
      default: "",
      validator: (value) => ["red", "green"].includes(value),
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedVariantClass() {
      const variantClass = {
        red: "bg-[#B92C0D] text-white",
        green: "bg-[#DCF4A2] text-green-950",
      };
      return variantClass[this.variantClass];
    },
  },
};
</script>
<template>
  <div
    v-if="show"
    :class="['w-fit py-3 px-5 rounded-xs', computedVariantClass]"
  >
    <p class="font-medium">{{ message }}</p>
  </div>
</template>
