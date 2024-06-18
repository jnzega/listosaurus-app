# Aplikasi Todo List

Aplikasi Todo List sederhana yang dibangun dengan React Native. Aplikasi ini memungkinkan pengguna untuk mendaftar, login, mengelola tugas mereka, dan menyediakan antarmuka admin untuk mengelola pengguna.

## Fitur

- **Pendaftaran dan Login Pengguna**: Pengguna dapat mendaftar dan login ke aplikasi.
- **Akses Admin**: Admin dapat melihat semua pengguna yang terdaftar, aktivitas mereka, dan mengelola akun pengguna.
- **Manajemen Tugas**: Pengguna dapat menambahkan, mengedit, menghapus, dan menandai tugas sebagai selesai.
- **Tampilan Tugas Terpisah**: Tugas dipisahkan menjadi bagian tugas yang belum selesai dan yang sudah selesai.
- **Tombol Visibilitas Kata Sandi**: Pengguna dapat mengganti visibilitas kata sandi mereka.

## Layar

### LoginScreen

- Pengguna dapat login dengan username dan kata sandi mereka.
- Jika pengguna belum terdaftar, mereka dapat beralih ke tampilan pendaftaran.
- Kredensial login admin: `username: admin, password: 123`.

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
    git clone https://github.com/your-username/todo-list-app.git
    cd todo-list-app
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

1. **Login sebagai Admin**: Gunakan `username: admin` dan `password: 123` untuk login sebagai admin.
2. **Mendaftar Pengguna**: Beralih ke tampilan pendaftaran dan daftar pengguna baru.
3. **Mengelola Tugas**: Setelah login, Anda dapat menambahkan, mengedit, menghapus, dan menandai tugas sebagai selesai.
4. **Tindakan Admin**: Sebagai admin, Anda dapat menavigasi ke layar manajemen pengguna untuk melihat dan menghapus pengguna.

## Dependensi

- **react-native**: Framework inti untuk membangun aplikasi mobile.
- **react-native-paper**: Library komponen UI untuk React Native.
- **react-native-vector-icons**: Library untuk menyertakan ikon vektor dalam aplikasi.
- **@react-native-async-storage/async-storage**: Library untuk penyimpanan lokal asinkron.

## Ikhtisar Kode

### LoginScreen.js

Menangani login dan pendaftaran pengguna, termasuk tombol visibilitas kata sandi dan konfirmasi kata sandi.

### MainScreen.js

Menampilkan tugas, menangani manajemen tugas, dan menyertakan navigasi admin.

### UserList.js

Memungkinkan admin untuk melihat dan menghapus pengguna dan tugas terkait mereka.

## Kontribusi

Kontribusi sangat diterima! Silakan buat pull request atau buka issue untuk mendiskusikan perubahan atau peningkatan apa pun.

## Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT. Lihat file LICENSE untuk detail lebih lanjut.
