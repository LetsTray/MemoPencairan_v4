<script>
export default {
  name: "TextArea",
  props: {
    label: String,
    modelValue: {
      type: String,
      default: "",
    },
    rows: {
      type: Number,
      default: 2,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    updateField(value) {
      this.$emit("update:modelValue", value);
    },
  },
};
</script>
<template>
  <div class="flex flex-col gap-2 text-sm">
    <label>{{ label }}</label>
    <textarea
      :rows="rows"
      class="w-full bg-[#FFF9DC] py-2 px-3 rounded-xs border border-[#DADADA]"
      :value="modelValue"
      @input="updateField($event.target.value)"
      :readonly="readOnly"
      :disabled="readOnly"
    />
  </div>
</template>
