<script>
//LIBRARY
import axios from "axios";

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
import Alert from "../components/Alert.vue";

//DATA
import form from "../data/labels/form.json";
import komponen from "../data/labels/komponen.json";
import headerUserRB from "../data/tables/headerUserRB.json";
import rekening from "../data/labels/rekening.json";
import komponenTableHeader from "../data/tables/komponenTableHeader.json";

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
    Alert,
    Table,
    Chip,
    Card,
  },
  data() {
    return {
      komponen,
      rekening,
      headerUserRB,
      form,
      userData: [],
      searchQuery: "",
      komponenTableHeader,

      //Pop Up Dialog
      isUserDialogOpen: false,
      isRekeningDialogOpen: false,
      isKomponenDialogOpen: false,

      selectedUser: null,
      //Table data komponen biaya
      komponenTableData: [],

      biayaForm: {
        anggaran: {
          saldoFreeze: "",
          saldoLapTransaksi: "",
        },
        jumlahPencairan: {
          jumlah: "",
          keperluan: "",
        },
        rincianUser: null,
        komponenBiaya: [],
      },
      alert: {
        show: false,
        message: "",
        variant: "green",
      },

      komponenBiayaBaru: {
        kategoriBiaya: "",
        subkategoriBiaya: "",
        nominal: "",
        tanggal: "",
      },
    };
  },
  methods: {
    async fetchUserData() {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/Entry_MemoPencairanAnggaran/rekanan"
        );
        this.userData = res.data;
      } catch (error) {
        console.error("Error fetching data : ", error);
      }
    },
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

      this.biayaForm.rincianUser = {
        Nama: user.Nama,
        Kode: user.Kode,
        Jabatan: user.Jabatan,
        Grade: user.Grade,
        NoRek: user.NoRek,
      };
    },

    simpanKomponenBiayaBaru() {
      this.komponenTableData.push({ ...this.komponenBiayaBaru });

      this.komponenBiayaBaru = {
        kategoriBiaya: "",
        subkategoriBiaya: "",
        nominal: "",
        tanggal: "",
      };

      this.isKomponenDialogOpen = false;
    },
    simpanBiaya() {
      this.biayaForm.komponenBiaya = [...this.komponenTableData];
      localStorage.setItem("biayaForm", JSON.stringify(this.biayaForm));

      this.alert = {
        show: true,
        message: "Data berhasil disimpan!",
        variant: "green",
      };

      setTimeout(() => {
        this.alert.show = false;
      }, 3000);

    
    },
  },
  mounted() {
    const tersimpanBiaya = localStorage.getItem("biayaForm");
    if (tersimpanBiaya) {
      this.biayaForm = JSON.parse(tersimpanBiaya);
    }

    const tersimpanKomponen = localStorage.getItem("komponenTableData");
    if (tersimpanKomponen) {
      this.komponenTableData = JSON.parse(tersimpanKomponen);
    }

    const tersimpanUser = localStorage.getItem("selectedUser");
    if (tersimpanUser) {
      this.selectedUser = JSON.parse(tersimpanUser);
    }

    //Fetch data rekanan/pegawai
    this.fetchUserData();
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
  watch: {
    komponenTableData: {
      handler(value) {
        localStorage.setItem("komponenTableData", JSON.stringify(value));
      },
      deep: true,
    },
    selectedUser: {
      handler(value) {
        localStorage.setItem("selectedUser", JSON.stringify(value));
      },
      deep: true,
    },
  },
};
</script>
<template>
  <div class="relative">
    <div class="absolute top-4 right-6 z-50">
      <Alert
        :show="alert.show"
        :message="alert.message"
        :variantClass="alert.variant"
      />
    </div>
  </div>
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
                <TextField
                  :labels="form.labelsBiaya"
                  :modelValue="biayaForm.anggaran"
                  @update:modelValue="biayaForm.anggaran = $event"
                />
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
                <TextField
                  :labels="form.labelsJumlah"
                  :modelValue="biayaForm.jumlahPencairan"
                  @update:modelValue="biayaForm.jumlahPencairan = $event"
                />
                <TextArea
                  label="Keperluan"
                  :rows="5"
                  :modelValue="biayaForm.jumlahPencairan.keperluan"
                  @update:modelValue="
                    biayaForm.jumlahPencairan.keperluan = $event
                  "
                />
              </div>
            </template>
          </ContentContainer>
        </div>

        <ContentContainer
          variantClass="gray"
          sizeClass="full"
          headerClass="black"
          header="Rincian Biaya"
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
                variantClass="gray"
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
                                  v-for="(section, index) in rekening"
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
                          v-for="(section, index) in komponen"
                          :key="index"
                          class="flex flex-col gap-1"
                        >
                          <h1 class="text-sm text-[#DADADA] font-medium">
                            <i>{{ section.title }}</i>
                          </h1>
                          <div class="flex flex-col gap-2">
                            <TextField
                              :labels="section.labels"
                              :modelValue="komponenBiayaBaru"
                              @update:modelValue="komponenBiayaBaru = $event"
                            />
                          </div>
                        </div>
                        <div class="flex justify-end">
                          <Button
                            button="Simpan"
                            variantClass="blue"
                            @click="simpanKomponenBiayaBaru"
                          />
                        </div>
                      </div>
                    </template>
                  </Dialog>
                  <div class="flex justify-center flex-col items-center">
                    <div class="w-full">
                      <Table
                        headStyle="black"
                        dataStyle="normal"
                        :header="komponenTableHeader"
                        :data="komponenTableData"
                      />
                    </div>

                    <div
                      v-if="komponenTableData.length === 0"
                      class="text-[#DADADA] text-sm mt-5"
                    >
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
          <Button button="Simpan" variantClass="blue" @click="simpanBiaya" />
        </div>
      </div>
    </template>
  </ContentContainer>
</template>
