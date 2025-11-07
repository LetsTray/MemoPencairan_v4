<script>
export default {
  name: "TextArea",
  props: {
    label: String,
    rows: {
      type: Number,
      default: 2,
    },
  },
};
</script>
<template>
  <div class="flex flex-col gap-2 text-sm">
    <label>{{ label }}</label>
    <textarea
      :rows="rows"
      class="w-full  bg-[#FFF9DC] py-2 px-3 rounded-xs border border-[#DADADA] "
    />
  </div>
</template>
