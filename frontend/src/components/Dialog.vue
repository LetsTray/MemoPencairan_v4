<script>
import Button from "./Button.vue";

export default {
  name: "Dialog",
  components: {
    Button,
  },
  props: {
    header: String,
    isDialogOpen: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
<template>
  <Teleport to="body">
    <div
      v-if="isDialogOpen"
      class="fixed inset-0 bg-black/30 z-50 flex items-center justify-center"
    >
      <div
        class="bg-white flex flex-col gap-4 max-h-11/12 w-full mx-7 md:w-5/6 md:mx-0 lg:w-[845px] lg:mx-0 rounded-xs p-5 overflow-auto shadow-md"
      >
        <!--HEADER & ACTION-->
        <div
          class="flex gap-2 flex-col md:flex-row md:justify-between md:items-center"
        >
          <h1 class="text-lg font-medium uppercase">{{ header }}</h1>

          <div class="flex">
            <Button
              button="Tutup"
              variantClass="red"
              @click="$emit('close', false)"
            />
          </div>
        </div>
        <div>
          <slot name="body" />
        </div>
      </div></div
  ></Teleport>
</template>
