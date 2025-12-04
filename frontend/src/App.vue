<script>
import axios from "axios";
//KOMPONEN
import AppBar from "../src/components/AppBar.vue";
import ContentContainer from "../src/components/ContentContainer.vue";
import Button from "../src/components/Button.vue";
import NavBar from "../src/components/NavBar.vue";
import Table from "./components/Table.vue";
import Dialog from "./components/Dialog.vue";

//DATA
import tabs from "../src/data/tabs/tabs.json";
import mainMemo from "../src/data/tables/mainMemoHeader.json";
import form from "../src/data/labels/form.json";
import userDataDisplay from "../src/data/labels/userDataDisplay.json";
import komponenTableHeaderDisplay from "../src/data/tables/komponenTableHeaderDisplay.json";

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
    Table,
    Dialog,

    //VIEWS
    DokumenPedukung,
    RincianMemo,
    RincianBiaya,
  },

  data() {
    return {
      tabs,
      form,
      mainMemo,
      userDataDisplay,
      selectedMemo: null,
      mainMemoData: [],
      mainMemoMapping: [],
      activeTab: "memo",
      isTabVisible: false,
      isDetailDialogOpen: false,
      komponenTableHeaderDisplay,
    };
  },
  methods: {
    handleTabChange(tabName) {
      this.activeTab = tabName;
    },
    handleActiveTab() {
      this.isTabVisible = true;
      this.activeTab = "memo";
    },
    handleDetailDialogClose() {
      this.isDetailDialogOpen = false;
    },
    formatDate(dateString) {
      if (!dateString) return "-";
      const date = new Date(dateString);

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear());

      return `${day}/${month}/${year}`;
    },
    openDetail(index) {
      this.selectedMemo = this.mainMemoData[index];
      this.isDetailDialogOpen = true;
    },

    async fetchmemoData() {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/Entry_MemoPencairanAnggaran/list-memo"
        );
        this.mainMemoData = res.data;

        this.mainMemoMapping = res.data.map((item) => {
          const memo = item.memo || {};
          const biaya = item.biaya || {};
          const jumlah = biaya.jumlahPencairan || {};

          return {
            tanggal: this.formatDate(item.createdAt) || "-",
            unitKerja: memo.unitKerja || "-",
            programKerja: memo.programKerja || "-",
            jumlahPencairan: jumlah.jumlah || "-",
          };
        });
      } catch (error) {
        console.error("Error fetching data : ", error);
      }
    },
  },
  mounted() {
    this.fetchmemoData();
  },
  computed: {
    userKeyMap() {
      return {
        kode: "Kode",
        jabatan: "Jabatan",
        grade: "Grade",
        kantor: "Kantor",
        nama: "Nama",
        norek: "NoRek",
      };
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
        <div class="py-7 relative">
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
            v-else-if="
              !isTabVisible &&
              (!mainMemoMapping || mainMemoMapping.length === 0)
            "
            class="flex justify-center items-center min-h-[600px] w-full"
          >
            <p class="text-[#DADADA] text-center text-sm">
              <i>Belum ada data memo pencairan anggaran</i>
            </p>
          </div>
          <div
            class="w-full justify-center"
            v-if="
              !isTabVisible && mainMemoMapping && mainMemoMapping.length > 0
            "
          >
            <Table
              headStyle="black"
              dataStyle="normal"
              :header="mainMemo"
              :data="mainMemoMapping"
            >
              <template #actions="{ item, index }">
                <div class="flex justify-center gap-5">
                  <Button
                    button="Detail"
                    variantClass="blue"
                    @click="openDetail(index)"
                  />
                </div>
              </template>
            </Table>
          </div>
        </div>
        <Dialog
          header="Detail Memo Pencairan Anggaran"
          :isDialogOpen="isDetailDialogOpen"
          @close="handleDetailDialogClose"
        >
          <template #body>
            <div class="flex flex-col gap-5">
              <ContentContainer
                variantClass="gray"
                sizeClass="full"
                headerClass="black"
                header="Rincian Memo"
              >
                <template #body>
                  <div class="flex flex-col gap-3">
                    <hr class="border-t border-[#DADADA]" />
                    <div
                      v-for="label in form.labelsMemo"
                      :key="label.key"
                      class="grid grid-rows-1 md:grid-cols-12 items-center text-sm gap-2"
                    >
                      <label class="col-span-4">
                        {{ label.text }}
                      </label>
                      <input
                        class="col-span-8 outline-none font-medium py-1"
                        :value="selectedMemo?.memo?.[label.key] || '-'"
                        readonly
                      />
                    </div>
                  </div>
                </template>
              </ContentContainer>

              <ContentContainer
                variantClass="gray"
                sizeClass="full"
                headerClass="black"
                header="Rincian Biaya"
              >
                <template #body>
                  <div class="flex flex-col justify-between gap-3">
                    <hr class="border-t border-[#DADADA]" />
                    <div
                      v-for="label in form.labelsBiaya"
                      :key="label.key"
                      class="grid grid-rows-1 md:grid-cols-12 items-center text-sm gap-2"
                    >
                      <label class="col-span-4">
                        {{ label.text }}
                      </label>
                      <input
                        class="col-span-8 outline-none font-medium py-1"
                        :value="
                          selectedMemo?.biaya.anggaran?.[label.key] || '-'
                        "
                        readonly
                      />
                    </div>
                    <hr class="border-t border-[#DADADA]" />
                    <div
                      v-for="label in form.labelsJumlah"
                      :key="label.key"
                      class="grid grid-rows-1 md:grid-cols-12 items-center text-sm gap-2"
                    >
                      <label class="col-span-4">
                        {{ label.text }}
                      </label>
                      <input
                        class="col-span-8 outline-none font-medium py-1"
                        :value="
                          selectedMemo?.biaya.jumlahPencairan?.[label.key] ||
                          '-'
                        "
                        readonly
                      />
                    </div>
                    <div
                      class="grid grid-rows-1 md:grid-cols-12 items-center text-sm gap-2"
                    >
                      <label class="col-span-4">Keperluan</label>
                      <input
                        class="col-span-8 outline-none font-medium py-1"
                        :value="
                          selectedMemo?.biaya.jumlahPencairan?.keperluan || '-'
                        "
                        readonly
                      />
                    </div>
                    <div
                      class="border border-[#DADADA] p-4 flex flex-col gap-2.5"
                    >
                      <div class="bg-[#EBF3F9] py-2 px-3">
                        <h1 class="font-medium">Rekanan/Pegawai</h1>
                      </div>
                      <div
                        v-for="label in userDataDisplay"
                        :key="label.key"
                        class="grid grid-rows-1 md:grid-cols-12 items-center text-sm gap-2"
                      >
                        <label class="col-span-4">
                          {{ label.text }}
                        </label>
                        <input
                          class="col-span-8 outline-none font-medium py-1"
                          :value="
                            selectedMemo?.biaya?.rincianUser?.[
                              userKeyMap[label.key]
                            ] || '-'
                          "
                          readonly
                        />
                      </div>
                    </div>
                    <div
                      class="border border-[#DADADA] p-4 flex flex-col gap-2.5"
                    >
                      <div class="bg-[#EBF3F9] py-2 px-3">
                        <h1 class="font-medium">Komponen Biaya</h1>
                      </div>
                      <Table
                        headStyle="black"
                        dataStyle="normal"
                        :header="komponenTableHeaderDisplay"
                        :data="selectedMemo.biaya.komponenBiaya"
                      />
                    </div>
                  </div>
                </template>
              </ContentContainer>
              <div
                class="bg-[#34618F] text-white py-3 px-7 flex gap-5 items-center"
              >
                <h1 class="text-lg font-medium">Dokumen Pendukung</h1>
                <div class="text-sm ">
                  <a
                    v-if="selectedMemo?.dokumen?.file"
                    :href="selectedMemo.dokumen.file"
                    :download="`dokumen-memo.${selectedMemo.dokumen.type}`"
                    target="_blank"
                    class="bg-[#34618F] border border-[#EBF3F9] rounded-xs hover:bg-[#EBF3F9] hover:text-[#34618F] py-2 px-2"
                    >Download / Lihat Dokumen ({{
                      selectedMemo?.dokumen?.type?.toUpperCase()
                    }})
                  </a>
                  <p v-else class="text-sm">Tidak ada dokumen</p>
                </div>
              </div>
            </div>
          </template>
        </Dialog>
      </template>
    </ContentContainer>
  </div>
</template>
