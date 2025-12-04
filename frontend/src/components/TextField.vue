<script>
import Alert from "./Alert.vue";

export default {
  name: "TextField",
  components: {
    Alert,
  },
  data() {
    return {
      errors: {},
      alert: {
        show: false,
        message: "",
      },
    };
  },
  props: {
    labels: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: Object,
      default: () => ({}),
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    requiredKeys: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    updateField(key, value) {
      const updated = {
        ...this.modelValue,
        [key]: value,
      };

      this.$emit("update:modelValue", updated);

      if (value.trim() && this.errors[key]) {
        this.$delete(this.errors, key);
      }
    },
    validate() {
      this.errors = {};
      let hasErrors = false;
      this.requiredKeys.forEach((key) => {
        if (!this.modelValue[key] || this.modelValue[key].trim() === "") {
          this.errors[key] = `${
            this.labels.find((l) => l.key === key)?.text || key
          } tidak boleh kosong!`;
          hasErrors = true;
        }
      });
      if (hasErrors) {
        this.alert = {
          show: true,
          message: "Ada field yang belum diisi. Silakan lengkapi semua field.",
        };
      } else {
        this.alert.show = false;
      }
      return !hasErrors;
    },
  },
};
</script>
<template>
  <div
    v-for="label in labels"
    :key="label.key"
    class="flex flex-col gap-2 text-sm"
  >
    <form class="flex flex-col md:flex-row justify-between items-center gap-1">
      <label class="w-full lg:w-1/2">{{ label.text }}</label>

      <div class="w-full lg:w-1/2 flex flex-col gap-1">
        <p v-if="errors[label.key]" class="text-[#CC221E] text-xs">
          {{ errors[label.key] }}
        </p>
        <input
          type="text"
          class="w-full bg-[#FFF9DC] py-2 px-3 rounded-xs border border-[#DADADA]"
          :value="modelValue[label.key]"
          @input="updateField(label.key, $event.target.value)"
          :readonly="readOnly"
          :disabled="readOnly"
          :class="{ 'border-[#CC221E]': errors[label.key] }"
        />
      </div>
    </form>
  </div>
</template>
