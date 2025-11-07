<script>
export default {
  name: "TextField",
  props: { labels: Array },
};
</script>
<template>
  <div v-for="label in labels" class="flex flex-col gap-2 text-sm">
    <form class="flex flex-col md:flex-row justify-between items-center gap-1">
      <label class="w-full lg:w-1/2">{{ label }}</label>
      <input
        type="text"
        class="w-full lg:w-1/2  bg-[#FFF9DC] py-1.5 px-3 rounded-xs border border-[#DADADA]"
      />
    </form>
  </div>
</template>
