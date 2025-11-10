<script>
export default {
  name: "AddDebit",
  props: {},
};
</script>
<template>
  <div class="w-full flex gap-4">
    <!--V-IF (Nomor rekening sudah ada -> Tampilkan kartu dan tambah rekening)-->
    <div class="border border-[#DADADA] flex flex-col p-4 max-w-md">
      <div class="flex gap-3">
        <img alt="Bank Logo" class="text-sm" />
        <p class="text-sm text-[#DADADA]">Bank Central Asia</p>
      </div>
    </div>

    <!--V-ELSE (Tampilkan kartu tambah rekening aja)-->
    <div></div>
  </div>
</template>
