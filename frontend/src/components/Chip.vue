<script>
export default {
  name: "Chip",
  props: {
    label: String,
    textClass: {
      type: String,
      default: "",
    },
  },
};
</script>
<template>
  <div
    :class="[
      'flex',
      'items-center',
      'px-2',
      'py-0.5',
      'rounded-xs',
      'font-medium',
      'text-[#34618F]',
      'border-[#34618F]',
      'border-2',
      textClass,
    ]"
  >
    {{ label }}
  </div>
</template>
