# Listosaurus

Listosaurus adalah aplikasi manajemen tugas yang memungkinkan pengguna untuk menambah, mengedit, menghapus, dan menandai tugas sebagai selesai. Aplikasi ini juga dilengkapi dengan fitur notifikasi yang akan mengingatkan pengguna jika tenggat waktu tugas mendekati 30 menit. Aplikasi ini dirancang untuk menjadi aplikasi open-source yang memungkinkan kontribusi dari komunitas.

## Fitur

- **Autentikasi Pengguna**: Login dan register pengguna dengan validasi untuk memastikan keamanan.
- **Manajemen Tugas**: Tambah, edit, hapus, dan tandai tugas sebagai selesai.
- **Notifikasi**: Mengirim notifikasi ketika tenggat waktu tugas mendekati 30 menit.
- **Daftar Pengguna**: Admin dapat melihat dan mengelola daftar pengguna.
- **Progress Bar**: Menampilkan persentase tugas yang telah diselesaikan.
- **Penanganan Tenggat Waktu**: Menyimpan dan menampilkan tenggat waktu tugas.

## Library yang Digunakan

- [React Native](https://reactnative.dev/): Framework untuk membangun aplikasi mobile menggunakan JavaScript dan React.
- [React Native Paper](https://callstack.github.io/react-native-paper/): Komponen Material Design untuk React Native.
- [AsyncStorage](https://github.com/react-native-async-storage/async-storage): Untuk menyimpan data secara lokal pada perangkat pengguna.
- [React Navigation](https://reactnavigation.org/): Untuk navigasi dalam aplikasi React Native.
- [Expo](https://expo.dev/): Platform untuk pengembangan React Native yang mempercepat proses pengembangan.
- [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/): Untuk menangani notifikasi push di aplikasi Expo.
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons): Koleksi ikon populer untuk React Native.

## Petunjuk Penggunaan Aplikasi

### Instalasi

1. **Clone Repository**: Clone repository dari GitHub.
    ```bash
    git clone https://github.com/jnzega/listosaurus-app.git
    ```
2. **Install Dependencies**: Jalankan perintah berikut untuk menginstall semua dependensi yang dibutuhkan.
    ```bash
    cd listosaurus-app
    npm install
    ```
3. **Jalankan Aplikasi**: Gunakan Expo CLI untuk menjalankan aplikasi.
    ```bash
    npx expo start
    ```

## Unduh Aplikasi

Anda dapat mengunduh aplikasi Listosaurus dari tautan berikut:

[Unduh Listosaurus APK](https://github.com/username/repo-name/raw/main/assets/listosaurus.apk)

### Penggunaan

1. **Login dan Register**: Pengguna dapat membuat akun baru atau login dengan akun yang sudah ada. Admin dapat login dengan username `admin` dan password `123`.
2. **Manajemen Tugas**: Tambah, edit, dan hapus tugas melalui antarmuka yang disediakan. Tandai tugas sebagai selesai dengan menekan kotak centang di sebelah tugas.
3. **Notifikasi**: Aplikasi akan mengirim notifikasi ketika tenggat waktu tugas mendekati 30 menit.
4. **Daftar Pengguna (Admin)**: Admin dapat melihat daftar semua pengguna yang terdaftar dan menghapus pengguna jika diperlukan.
5. **Progress Bar**: Menampilkan persentase tugas yang telah diselesaikan oleh pengguna.

## Algoritma Penting

### 1. Autentikasi Pengguna

- **Login**: Memeriksa username dan password yang dimasukkan pengguna dengan data yang tersimpan di AsyncStorage.
- **Register**: Memvalidasi dan menyimpan username dan password baru ke AsyncStorage.

### 2. Manajemen Tugas

- **Tambah Tugas**: Menambahkan tugas baru dengan teks dan tenggat waktu.
- **Edit Tugas**: Memperbarui teks dan tenggat waktu tugas yang sudah ada.
- **Hapus Tugas**: Menghapus tugas dari daftar.
- **Tandai Tugas Selesai**: Mengubah status tugas menjadi selesai atau belum selesai.

### 3. Notifikasi

- **Penjadwalan Notifikasi**: Menghitung selisih waktu antara waktu saat ini dan tenggat waktu tugas, dan menjadwalkan notifikasi jika selisih waktu kurang dari atau sama dengan 30 menit.

### 4. Progress Bar

- **Menghitung Progres**: Menghitung persentase tugas yang telah diselesaikan dari total tugas yang ada.

### 5. Pengelolaan Daftar Pengguna (Admin)

- **Melihat Daftar Pengguna**: Admin dapat melihat daftar semua pengguna yang terdaftar.
- **Menghapus Pengguna**: Admin dapat menghapus pengguna dari daftar, termasuk menghapus semua data tugas pengguna tersebut.

## Kontribusi

Kami sangat menghargai kontribusi dari komunitas open source. Jika Anda ingin berkontribusi, berikut adalah langkah-langkah yang dapat Anda ikuti:

1. **Fork Repository**: Fork repository ini ke akun GitHub Anda.
2. **Clone Repository**: Clone repository hasil fork ke komputer Anda.
    ```bash
    git clone https://github.com/jnzega/listosaurus-app.git
    ```
3. **Buat Branch Baru**: Buat branch baru untuk fitur atau perbaikan yang ingin Anda lakukan.
    ```bash
    git checkout -b nama-branch-anda
    ```
4. **Lakukan Perubahan**: Lakukan perubahan yang diperlukan di kode sumber.
5. **Commit Perubahan**: Commit perubahan Anda dengan pesan yang jelas.
    ```bash
    git commit -m "Menambahkan fitur X"
    ```
6. **Push ke Repository Anda**: Push perubahan ke repository GitHub Anda.
    ```bash
    git push origin nama-branch-anda
    ```
7. **Buat Pull Request**: Buat pull request dari repository Anda ke branch utama repository ini.

### Panduan Kontribusi

- **Fork & Clone**: Mulailah dengan fork dan clone repository ini.
- **Buat Branch**: Buat branch baru untuk setiap fitur atau perbaikan.
- **Deskripsi Jelas**: Pastikan commit dan pull request memiliki deskripsi yang jelas tentang apa yang diubah atau ditambahkan.
- **Ikuti Standar Kode**: Pastikan kode Anda mengikuti standar yang digunakan dalam proyek ini.
- **Pengujian**: Uji perubahan Anda sebelum mengirim pull request.

### Contoh Komit

1. **Menambahkan Fitur Notifikasi**
    ```bash
    git commit -m "Menambahkan fitur notifikasi untuk tenggat waktu tugas"
    ```

2. **Memperbaiki Bug pada Fitur Login**
    ```bash
    git commit -m "Memperbaiki bug yang menyebabkan login gagal dengan username ber-spasi"
    ```

3. **Memperbarui Dokumentasi**
    ```bash
    git commit -m "Memperbarui README.md dengan petunjuk instalasi dan penggunaan"
    ```

### Melaporkan Masalah

Jika Anda menemukan masalah atau bug dalam aplikasi ini, silakan buka [Issue Baru](https://github.com/jnzega/listosaurus-app/issues) di GitHub dan jelaskan masalah yang Anda temukan.

---

Terima kasih telah menggunakan dan berkontribusi pada Listosaurus! Mari bersama-sama membuat aplikasi ini lebih baik.
