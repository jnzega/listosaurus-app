# Listosaurus

Listosaurus adalah aplikasi todo list sederhana yang dibangun dengan React Native. Aplikasi ini memungkinkan pengguna untuk mendaftar, login, mengelola tugas mereka berdasarkan akun.

## Fitur

- **Pendaftaran dan Login Pengguna**: Pengguna dapat mendaftar dan login ke aplikasi.
- **Manajemen Tugas**: Pengguna dapat menambahkan, mengedit, menghapus, dan menandai tugas sebagai selesai.
- **Tampilan Tugas Terpisah**: Tugas dipisahkan menjadi bagian tugas yang belum selesai dan yang sudah selesai.
- **Tombol Visibilitas Kata Sandi**: Pengguna dapat mengganti visibilitas kata sandi mereka.

## Layar
- UNDER DEVELOPMENT

### LoginScreen

- Pengguna dapat login dengan username dan kata sandi mereka.
- Jika pengguna belum terdaftar, mereka dapat beralih ke tampilan pendaftaran.

### RegisterScreen (dalam LoginScreen)

- Pengguna dapat mendaftar dengan username dan kata sandi.
- Konfirmasi kata sandi diperlukan untuk memastikan pengguna memasukkan kata sandi yang benar.

### MainScreen

- Menampilkan tugas pengguna, dipisahkan menjadi bagian tugas yang belum selesai dan yang sudah selesai.
- Memungkinkan pengguna untuk menambahkan, mengedit, menghapus, dan menandai tugas sebagai selesai.
- Menampilkan progres tugas yang sudah selesai.
- Admin memiliki akses ke layar manajemen pengguna.

### UserList (Hanya Admin)

- Admin dapat melihat semua pengguna yang terdaftar dan kata sandi mereka.
- Admin dapat menghapus akun pengguna, yang juga menghapus tugas terkait.

## Instalasi

1. Clone repositori:

    ```sh
    git clone https://github.com/jnzega/listosaurus-app.git
    cd listosaurus-app
    ```

2. Instal dependensi:

    ```sh
    npm install
    ```

    atau jika Anda menggunakan yarn:

    ```sh
    yarn install
    ```

3. Link `react-native-vector-icons` (untuk versi React Native di bawah 0.60):

    ```sh
    react-native link react-native-vector-icons
    ```

4. Jalankan aplikasi:

    Untuk iOS:

    ```sh
    npx react-native run-ios
    ```

    Untuk Android:

    ```sh
    npx react-native run-android
    ```

## Penggunaan

1. **Mendaftar Pengguna**: Beralih ke tampilan pendaftaran dan daftar pengguna baru.
2. **Mengelola Tugas**: Setelah login, Anda dapat menambahkan, mengedit, menghapus, dan menandai tugas sebagai selesai.

## Dependensi

- **react-native**: Framework inti untuk membangun aplikasi mobile.
- **react-native-paper**: Library komponen UI untuk React Native.
- **react-native-vector-icons**: Library untuk menyertakan ikon vektor dalam aplikasi.
- **@react-native-async-storage/async-storage**: Library untuk penyimpanan lokal asinkron.

## Ikhtisar Kode

- UNDER DEVELOPMENT

### LoginScreen.js

Menangani login dan pendaftaran pengguna, termasuk tombol visibilitas kata sandi dan konfirmasi kata sandi.

### MainScreen.js

Menampilkan tugas, menangani manajemen tugas, dan menyertakan navigasi admin.

## Kontribusi

Kontribusi sangat diterima! Silakan buat pull request atau buka issue untuk mendiskusikan perubahan atau peningkatan apa pun.
