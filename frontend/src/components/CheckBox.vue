<script>
export default {
  name: "CheckBox",
  props: { labels: Array },
};
</script>
<template>
  <div class="flex flex-col gap-2.5">
    <label
      class="flex items-center gap-3 text-sm"
      v-for="label in labels"
      :key="label.key"
    >
      <input type="checkbox" class="w-4 h-4 accent-[#EBF3F9]" />{{
        label.label
      }}</label
    >
  </div>
</template>
