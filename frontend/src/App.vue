<script>
{
  /*KOMPONEN*/
}
import AppBar from "./components/AppBar.vue";
import Button from "./components/Button.vue";
import ContentContainer from "./components/ContentContainer.vue";
import NavBar from "./components/NavBar.vue";
import TextField from "./components/TextField.vue";
import TextArea from "./components/TextArea.vue";
import CheckBox from "./components/CheckBox.vue";
import Dialog from "./components/Dialog.vue";
import SearchBar from "./components/SearchBar.vue";
import Card from "./components/Card.vue";
import Table from "./components/Table.vue";
import Chip from "./components/Chip.vue";
import AddDebit from "./components/AddDebit.vue";

{
  /*DATA & LABEL*/
}
import tabs from "../src/data/tabs.json";
import formLabels from "../src/data/formLabels.json";
import checkboxLabels from "../src/data/checkboxLabels.json";
import userData from "../src/data/userData.json";
import headerUserRB from "../src/data/headerUserRB.json";
import dataUserRB from "../src/data/dataUserRB.json";

{
  /*UTILS */
}
import { mapDataToHeader } from "./utils/mapDatatoHeader";

export default {
  components: {
    AppBar,
    ContentContainer,
    Button,
    NavBar,
    TextField,
    TextArea,
    CheckBox,
    Dialog,
    SearchBar,
    Card,
    Table,
    Chip,
    AddDebit,
  },
  data() {
    const headerKey = Object.keys(headerUserRB);
    const header = Object.values(headerUserRB);

    return {
      tabs,
      formLabels,
      checkboxLabels,
      userData,
      headerUserRB: header,
      dataUserRB: mapDataToHeader(dataUserRB, headerKey),
      activeTab: "memo",
      isTabVisible: false,
      isUserDialogOpen: false,
      isKomponenDialogOpen: false,
      searchQuery: "",
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
    handleUserDialogClose() {
      this.isUserDialogOpen = false;
      this.searchQuery = "";
    },
    handleKomponenDialogClose() {
      this.isKomponenDialogOpen = false;
    },
  },
  computed: {
    searchUser() {
      if (!this.searchQuery) {
        return this.userData;
      }

      const query = this.searchQuery.toLowerCase();
      return this.userData.filter((user) =>
        [user.Nama, user.Kode, user.Jabatan, user.Kantor, user.Tipe]
          .join("")
          .toLowerCase()
          .includes(query)
      );
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
          <!--V-IF-->
          <div class="flex flex-col" v-if="isTabVisible">
            <NavBar
              :tabs="tabs"
              :activeTab="activeTab"
              @update:activeTab="handleTabChange"
            />
            <!--V-IF === 'memo'-->
            <div v-if="activeTab === 'memo'" class="overflow-auto">
              <ContentContainer
                variantClass="gray"
                sizeClass="full"
                headerClass="black"
                header="Rincian Memo"
                additionalStyle=" overflow-auto max-h-[500px] md:max-h-[520px] lg:max-h-[560px]"
              >
                <template #body>
                  <div class="flex flex-col justify-between gap-4">
                    <hr class="border-t border-[#DADADA]" />
                    <TextField :labels="formLabels.labelsMemo" />
                    <div class="flex gap-2 justify-end">
                      <Button button="Edit" variantClass="lightBlue" />
                      <Button button="Simpan" variantClass="blue" />
                    </div>
                  </div>
                </template>
              </ContentContainer>
            </div>

            <!--V-ELSE-IF === 'biaya'-->
            <div v-else-if="activeTab === 'biaya'">
              <ContentContainer
                variantClass="gray"
                sizeClass="full"
                headerClass="black"
                additionalStyle=" overflow-auto max-h-[500px] md:max-h-[520px] lg:max-h-[560px]"
                header="Rincian Biaya"
                ><template #body>
                  <div class="flex flex-col justify-between gap-4">
                    <div class="flex flex-col lg:flex-row gap-4">
                      <ContentContainer
                        variantClass="gray"
                        sizeClass="full"
                        headerClass="black"
                        header="Rincian Anggaran"
                      >
                        <template #body>
                          <div class="flex flex-col justify-between gap-4">
                            <hr class="border-t border-[#DADADA]" />
                            <TextField :labels="formLabels.labelsBiaya" />
                          </div>
                        </template>
                      </ContentContainer>
                      <ContentContainer
                        variantClass="gray"
                        sizeClass="full"
                        headerClass="black"
                        header="Jumlah Pencairan"
                        ><template #body>
                          <div class="flex flex-col justify-between gap-4">
                            <hr class="border-t border-[#DADADA]" />
                            <TextField :labels="formLabels.labelsJumlah" />
                            <TextArea label="Keperluan" :rows="12" />
                          </div>
                        </template>
                      </ContentContainer>
                    </div>
                    <ContentContainer
                      variantClass="gray"
                      sizeClass="full"
                      headerClass="black"
                      header="Rincian Biaya"
                      subHeader="Mohon ceklis semua dokumen terlampir agar dapat dipastikan semua sudah benar"
                    >
                      <template #action>
                        <Button
                          button="+ Tambah Rekanan/Pegawai"
                          variantClass="blue"
                          @click="isUserDialogOpen = true"
                        />
                      </template>
                      <template #body>
                        <Dialog
                          header="Pilih Rekanan atau Pegawai"
                          :isDialogOpen="isUserDialogOpen"
                          @close="handleUserDialogClose"
                          ><template #body>
                            <div class="flex flex-col gap-5">
                              <SearchBar v-model="searchQuery" />
                              <template v-if="searchUser.length">
                                <div
                                  class="flex flex-wrap justify-between gap-5"
                                >
                                  <div
                                    v-for="user in searchUser"
                                    :key="user.Kode"
                                  >
                                    <Card :user="user" />
                                  </div>
                                </div>
                              </template>
                              <template v-else>
                                <div>
                                  <p class="text-[#DADADA] text-center text-sm">
                                    <i
                                      >Belum ada data pegawai dan rekanan yang
                                      sesuai</i
                                    >
                                  </p>
                                </div>
                              </template>
                            </div>
                          </template>
                        </Dialog>
                        <div class="flex flex-col gap-4">
                          <ContentContainer
                            variantClass="none"
                            sizeClass="full"
                            headerClass="black"
                          >
                            <template #body>
                              <div
                                class="flex justify-center flex-col items-center"
                              >
                                <!--V-IF-->

                                <div class="w-full flex flex-col gap-4">
                                  <div class="flex items-center gap-3">
                                    <h1 class="text-2xl font-semibold">
                                      Bela Santika
                                    </h1>
                                    <Chip label="Pegawai Eksternal" />
                                  </div>
                                  <Table
                                    headStyle="gray"
                                    dataStyle="smbold"
                                    :header="headerUserRB"
                                    :data="dataUserRB"
                                  />
                                  <div>
                                    <h1 class="text-lg font-medium uppercase">
                                      Info Rekening
                                    </h1>
                                    <div>
                                      <AddDebit />
                                    </div>
                                  </div>
                                </div>

                                <!--<div class="w-full flex flex-col gap-2">
                                  <!--NAMA & CHIP USER

                                  <div>
                                    <h1 class=" text">{{ dataUserRB.Nama }}Bela Santika</h1>

                                  </div>
                                  <Table
                                    headStyle="gray"
                                    dataStyle="smbold"
                                    :header="headerUserRB"
                                    :data="dataUserRB"
                                  />


                                </div>-->

                                <!--V-ELSE-->
                                <!--<div class="text-[#DADADA] text-sm">
                                <i
                                  >Belum ada pegawai atau rekanan yang
                                  ditambahkan</i
                                >
                              </div>-->
                              </div></template
                            >
                          </ContentContainer>

                          <ContentContainer
                            variantClass="gray"
                            sizeClass="full"
                            headerClass="black"
                            header="Komponen Biaya"
                          >
                            <template #action>
                              <Button
                                button="+ Tambah Komponen Biaya"
                                variantClass="blue"
                                @click="isKomponenDialogOpen = true"
                              />
                            </template>
                            <template #body>
                              <Dialog
                                header="Komponen Biaya"
                                :isDialogOpen="isKomponenDialogOpen"
                                @close="handleKomponenDialogClose"
                              ></Dialog>
                              <div
                                class="flex justify-center flex-col items-center"
                              >
                                <!--V-IF-->
                                <div></div>

                                <!--V-ELSE-->
                                <div class="text-[#DADADA] text-sm">
                                  <i
                                    >Belum ada komponen biaya yang
                                    ditambahkan</i
                                  >
                                </div>
                              </div>
                            </template>
                          </ContentContainer>
                        </div>
                      </template>
                    </ContentContainer>
                    <div class="flex gap-2 justify-end">
                      <Button button="Edit" variantClass="lightBlue" />
                      <Button button="Simpan" variantClass="blue" />
                    </div>
                  </div>
                </template>
              </ContentContainer>
            </div>

            <!--V-ELSE / === 'dokumen'-->
            <div v-else class="overflow-auto">
              <ContentContainer
                variantClass="gray"
                sizeClass="full"
                headerClass="black"
                header="Dokumen Pendukung"
                additionalStyle=" overflow-auto max-h-[500px] md:max-h-[520px] lg:max-h-[560px]"
              >
                <template #body>
                  <div class="flex flex-col justify-between gap-4">
                    <div class="p-3 bg-[#EBF3F9] h-[300px] flex items-end">
                      <input type="file" />
                    </div>
                    <div>
                      <CheckBox :labels="checkboxLabels" />
                    </div>
                    <div class="flex gap-2 justify-end">
                      <Button button="Edit" variantClass="lightBlue" />
                      <Button button="Simpan" variantClass="blue" />
                    </div>
                  </div>
                </template>
              </ContentContainer>
            </div>
          </div>

          <!--V-ElSE-->
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
