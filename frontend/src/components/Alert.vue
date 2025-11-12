<script>
export default {
  name: "Alert",
  props: {
    message: String,
    variantClass: {
      type: String,
      default: "",
      validator: (value) => ["red", "green"].includes(value),
    },
  },
};
</script>
<template>
  <div></div>
</template>
