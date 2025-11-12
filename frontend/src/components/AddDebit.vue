<script>
export default {
  name: "AddDebit",

  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
<template>
  <div class="w-full flex gap-4">
    <div v-if="user.NoRek">
      <div
        class="w-80 h-32 border border-[#DADADA] flex flex-col justify-between p-5 gap-4 bg-white"
      >
        <div class="flex gap-3">
          <img alt="Bank Logo" class="text-sm" />
          <p class="text-sm text-[#DADADA]">{{ user.Bank }}</p>
        </div>
        <div class="flex flex-col">
          <p class="text-xl font-medium">{{ user.Nama }}</p>
          <p class="">{{ user.NoRek }}</p>
        </div>
      </div>
    </div>

    <div>
      <button @click="$emit('openDialog', true)">
        <div
          class="w-80 h-32 border border-[#DADADA] flex items-center justify-center text-[#DADADA] text-sm bg-white hover:shadow-md shadow-[#DADADA] cursor-pointer transition-shadow duration-300"
        >
          + Tambah Rekening Baru
        </div>
      </button>
    </div>
  </div>
</template>
