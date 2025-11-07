<script>
import { computed } from "vue";

export default {
  name: "Table",
  props: {
    header: {
      type: Array,
      default: () => [],
    },
    data: {
      type: [Array, Object],
      default: () => [],
    },
    headStyle: {
      type: String,
      default: "black",
      validator: (value) => ["black", "gray"].includes(value),
    },
    dataStyle: {
      type: String,
      default: "normal",
      validator: (value) => ["smbold", "normal"].includes(value),
    },
  },
  computed: {
    computedHeadStyle() {
      const headStyle = {
        black: "text-black font-semibold",
        gray: "text-[#DADADA] font-normal",
      };
      return headStyle[this.headStyle];
    },
    computedDataStyle() {
      const dataStyle = {
        smbold: "font-semibold py-1",
        normal: "font-normal py-1",
      };
      return dataStyle[this.dataStyle];
    },
  },
};
</script>
<template>
  <div>
    <table class="w-full text-sm text-center">
      <thead>
        <tr>
          <th
            v-for="(header, index) in header"
            :key="index"
            :class="['border-b', 'border-[#DADADA]', 'py-1', computedHeadStyle]"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in data" :key="rowIndex">
          <td
            v-for="(data, index) in row"
            :key="index"
            :class="[computedDataStyle]"
          >
            {{ data }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
