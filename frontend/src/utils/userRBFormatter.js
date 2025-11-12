export function generateUserRB(user){
    if (!user) return [];

    return [
      { label: "Kode Pegawai", value: user.Kode },
      { label: "Nama", value: user.Nama },
      { label: "Jabatan", value: user.Jabatan },
      { label: "Kantor", value: user.Kantor },
      { label: "Tipe", value: user.Tipe },
      { label: "No Rekening", value: user.NoRek },
    ];
}