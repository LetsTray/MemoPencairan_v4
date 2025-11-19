<script>
export default {
  name: "TextField",
  props: {
    labels: Array,
    modelValue: {
      type: Object,
      default: () => ({}),
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    updateField(key, value) {
      const updated = {
        ...this.modelValue,
        [key]: value,
      };

      this.$emit("update:modelValue", updated);
    },
  },
};
</script>
<template>
  <div v-for="label in labels" class="flex flex-col gap-2 text-sm">
    <form class="flex flex-col md:flex-row justify-between items-center gap-1">
      <label class="w-full lg:w-1/2">{{ label.text }}</label>
      <input
        type="text"
        class="w-full lg:w-1/2 bg-[#FFF9DC] py-2 px-3 rounded-xs border border-[#DADADA]"
        :value="modelValue[label.key]"
        @input="updateField(label.key, $event.target.value)"
        :readonly="readOnly"
        :disabled="readOnly"
      />
    </form>
  </div>
</template>
