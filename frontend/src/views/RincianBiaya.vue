<script>
//KOMPONEN
import ContentContainer from "../components/ContentContainer.vue";
import TextField from "../components/TextField.vue";
import SearchBar from "../components/SearchBar.vue";
import TextArea from "../components/TextArea.vue";
import AddDebit from "../components/AddDebit.vue";
import Dialog from "../components/Dialog.vue";
import Button from "../components/Button.vue";
import Table from "../components/Table.vue";
import Chip from "../components/Chip.vue";
import Card from "../components/Card.vue";

//DATA
import formLabels from "../data/formLabels.json";
import komponenLabels from "../data/komponenLabels.json";
import headerUserRB from "../data/headerUserRB.json";
import userData from "../data/userData.json";
import rekeningLabels from "../data/rekeningLabels.json";

export default {
  name: "RincianBiaya",
  components: {
    ContentContainer,
    TextField,
    SearchBar,
    TextArea,
    Button,
    AddDebit,
    Dialog,
    Table,
    Chip,
    Card,
  },
  data() {
    return {
      komponenLabels,
      rekeningLabels,
      headerUserRB,
      formLabels,
      userData,
      searchQuery: "",
      isUserDialogOpen: false,
      isRekeningDialogOpen: false,
      isKomponenDialogOpen: false,
      selectedUser: null,
    };
  },
  methods: {
    handleUserDialogClose() {
      this.isUserDialogOpen = false;
      this.searchQuery = "";
    },
    handleKomponenDialogClose() {
      this.isKomponenDialogOpen = false;
    },
    handleRekeningDialogOpen() {
      this.isRekeningDialogOpen = true;
    },
    handleUserSelected(user) {
      this.selectedUser = user;
      this.isUserDialogOpen = false;
      this.searchQuery = "";
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
  <ContentContainer
    variantClass="gray"
    sizeClass="full"
    headerClass="black"
    additionalStyle=" overflow-auto max-h-[500px] md:max-h-[520px] lg:max-h-[560px]"
    header="Rincian Biaya"
  >
    <template #body>
      <div class="flex flex-col justify-between gap-4">
        <!-- ------------------- Rincian Anggaran & Jumlah Pencairan ------------------ -->
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
                <TextArea label="Keperluan" :rows="5" />
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
            <div class="flex flex-col gap-4">
              <ContentContainer
                variantClass="none"
                sizeClass="full"
                headerClass="black"
              >
                <template #body>
                  <Dialog
                    header="Pilih Rekanan atau Pegawai"
                    :isDialogOpen="isUserDialogOpen"
                    @close="handleUserDialogClose"
                  >
                    <template #body>
                      <div class="flex flex-col gap-5">
                        <SearchBar v-model="searchQuery" />
                        <template v-if="searchUser.length">
                          <div class="flex flex-wrap justify-between gap-5">
                            <div v-for="user in searchUser" :key="user.Kode">
                              <Card :user="user" @select="handleUserSelected" />
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

                  <div v-if="selectedUser">
                    <div class="w-full flex flex-col gap-4">
                      <div class="flex items-center gap-3">
                        <h1 class="text-2xl font-semibold">
                          {{ selectedUser.Nama }}
                        </h1>
                        <Chip :label="selectedUser.Tipe" />
                      </div>
                      <Table
                        headStyle="gray"
                        dataStyle="smbold"
                        :header="headerUserRB"
                        :data="[
                          {
                            Kode: selectedUser.Kode,
                            Jabatan: selectedUser.Jabatan,
                            Grade: selectedUser.Grade,
                            Kantor: selectedUser.Kantor,
                          },
                        ]"
                      />
                      <div class="flex flex-col gap-2">
                        <h1 class="text-lg font-medium uppercase">
                          Informasi Rekening
                        </h1>

                        <div>
                          <AddDebit
                            :user="selectedUser"
                            @openDialog="handleRekeningDialogOpen"
                          />

                          <Dialog
                            header="Rekening Baru"
                            :isDialogOpen="isRekeningDialogOpen"
                            @close="isRekeningDialogOpen = false"
                          >
                            <template #body>
                              <div class="flex flex-col gap-4">
                                <div
                                  v-for="(section, index) in rekeningLabels"
                                  :key="index"
                                  class="flex flex-col gap-1"
                                >
                                  <h1
                                    class="text-sm text-[#DADADA] font-medium"
                                  >
                                    <i>{{ section.title }}</i>
                                  </h1>
                                  <div class="flex flex-col gap-2">
                                    <TextField :labels="section.labels" />
                                  </div>
                                </div>
                                <div class="flex justify-end">
                                  <Button button="Simpan" variantClass="blue" />
                                </div>
                              </div>
                            </template>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-else>
                    <p class="text-[#DADADA] text-center text-sm">
                      <i>Belum ada data pegawai dan rekanan yang sesuai</i>
                    </p>
                  </div>
                </template>
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
                  >
                    <template #body>
                      <div class="flex flex-col gap-4">
                        <div
                          v-for="(section, index) in komponenLabels"
                          :key="index"
                          class="flex flex-col gap-1"
                        >
                          <h1 class="text-sm text-[#DADADA] font-medium">
                            <i>{{ section.title }}</i>
                          </h1>
                          <div class="flex flex-col gap-2">
                            <TextField :labels="section.labels" />
                          </div>
                        </div>
                        <div class="flex justify-end">
                          <Button button="Simpan" variantClass="blue" />
                        </div>
                      </div>
                    </template>
                  </Dialog>
                  <div class="flex justify-center flex-col items-center">
                    <div></div>

                    <div class="text-[#DADADA] text-sm">
                      <i>Belum ada komponen biaya yang ditambahkan</i>
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
</template>
