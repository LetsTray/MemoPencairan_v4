<script>
//KOMPONEN
import AppBar from "../src/components/AppBar.vue";
import ContentContainer from "../src/components/ContentContainer.vue";
import Button from "../src/components/Button.vue";
import NavBar from "../src/components/NavBar.vue";

//DATA
import tabs from "../src/data/tabs/tabs.json";

//VIEWS
import DokumenPedukung from "./views/DokumenPedukung.vue";
import RincianMemo from "./views/RincianMemo.vue";
import RincianBiaya from "./views/RincianBiaya.vue";

export default {
  components: {
    AppBar,
    ContentContainer,
    Button,
    NavBar,

    //VIEWS
    DokumenPedukung,
    RincianMemo,
    RincianBiaya,
  },

  data() {
    return {
      tabs,
      activeTab: "memo",
      isTabVisible: false,
    };
  },
  methods: {
    handleTabChange(tabName) {
      this.activeTab = tabName;
    },
    handleActiveTab() {
      this.isTabVisible = "true";
      this.activeTab = "memo";
    },
  },
};
</script>
<template>
  <AppBar bar="Entry Memo Pencairan Anggaran" />
  <div class="my-6 mx-7">
    <ContentContainer
      variantClass="gray"
      sizeClass="full"
      headerClass="blue"
      header="Memo Pencairan"
      additionalStyle=" h-[720px]"
    >
      <template #action>
        <div
          class="flex flex-row-reverse md:flex-row gap-3 items-start justify-end"
        >
          <div>
            <Button
              button="Tutup"
              variantClass="red"
              @click="isTabVisible = false"
            />
          </div>
          <div>
            <Button
              button="+ Tambahkan Memo Baru"
              variantClass="lightBlue"
              @click="handleActiveTab"
            />
          </div>
        </div>
      </template>
      <template #body>
        <div class="py-7">
          <div class="flex flex-col" v-if="isTabVisible">
            <NavBar
              :tabs="tabs"
              :activeTab="activeTab"
              @update:activeTab="handleTabChange"
            />
            <!-- ------------------------------ Rincian Memo ------------------------------ -->
            <div v-if="activeTab === 'memo'" class="overflow-auto">
              <RincianMemo />
            </div>

            <!-- ------------------------------ Rincian Biaya ----------------------------- -->
            <div v-else-if="activeTab === 'biaya'">
              <RincianBiaya />
            </div>

            <!-- ---------------------------- Dokumen Pendukung --------------------------- -->
            <div v-else class="overflow-auto">
              <DokumenPedukung />
            </div>
          </div>
          <div
            v-else
            class="flex justify-center items-center min-h-[600px] w-full"
          >

          
            <p class="text-[#DADADA] text-center text-sm">
              <i>Belum ada data memo pencairan anggaran</i>
            </p>
          </div>
        </div>
      </template>
    </ContentContainer>
  </div>
</template>
