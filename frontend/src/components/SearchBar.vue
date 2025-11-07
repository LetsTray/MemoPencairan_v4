<script>
export default {
  name: "SearchBar",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
};
</script>
<template>
  <div class="border border-[#DADADA] px-3 py-2.5 w-full rounded-xs">
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Search"
      class="outline-none placeholder:text-[#DADADA] w-full"
    />
  </div>
</template>
