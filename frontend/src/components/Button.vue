<script>
export default {
  name: "Button",
  props: {
    button: String,
    variantClass: {
      type: String,
      default: "blue",
      validator: (value) => ["blue", "red", "lightBlue"].includes(value),
    },
  },
  computed: {
    computedVariantClass() {
      const variantClass = {
        blue: "bg-[#34618F] text-white hover:bg-[#EBF3F9] hover:text-black transition-colors duration-300",
        lightBlue:
          "bg-[#EBF3F9] text-black hover:bg-[#003C68] hover:text-white transition-colors duration-300",
        red: "bg-[#CC221E] text-white hover:bg-[#FFD1D0] hover:text-[#CC221E] transition-colors duration-300",
      };
      return variantClass[this.variantClass];
    },
  },
};
</script>
<template>
  <div
    :class="[
      'flex',
      'items-center',
      'uppercase',
      'cursor-pointer',
      'px-3',
      'py-2',
      'text-sm',
      'rounded-xs',
      'font-medium',
      'text-center',
      'w-fit',
      computedVariantClass,
    ]"
  >
    {{ button }}
  </div>
</template>
