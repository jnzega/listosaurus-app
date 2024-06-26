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

[Unduh Listosaurus APK](https://github.com/jnzega/listosaurus-app/raw/master/assets/listosaurus.apk)

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

## Implementasi

### Tampilan Antarmuka Aplikasi

#### Halaman Login
- **Deskripsi**: Halaman ini memungkinkan pengguna untuk login atau beralih ke mode pendaftaran.
- **Komponen Penting**: Formulir login dengan input username dan password, tombol login, link untuk beralih ke halaman pendaftaran.

#### Halaman Register
- **Deskripsi**: Halaman ini memungkinkan pengguna untuk membuat akun baru.
- **Komponen Penting**: Formulir pendaftaran dengan input username, password, konfirmasi password, tombol daftar.

#### Halaman Utama
- **Deskripsi**: Halaman utama setelah login, menampilkan daftar tugas pengguna.
- **Komponen Penting**: Daftar tugas, tombol untuk menambah tugas baru, progress bar, tombol logout.

#### Halaman Tambah/Edit Tugas
- **Deskripsi**: Halaman ini digunakan untuk menambah atau mengedit tugas.
- **Komponen Penting**: Formulir tugas dengan input teks tugas dan tenggat waktu, tombol simpan.

#### Halaman Daftar Pengguna (Admin)
- **Deskripsi**: Halaman ini memungkinkan admin untuk melihat dan mengelola daftar pengguna.
- **Komponen Penting**: Daftar pengguna, tombol hapus untuk setiap pengguna.

### Kode Aplikasi

#### Kode Program dan Penjelasannya

1. **Login dan Register**:
   - **Algoritma Login**: Memeriksa apakah username dan password yang dimasukkan pengguna sesuai dengan yang tersimpan di AsyncStorage.
     ```javascript
     const handleLogin = async () => {
       const trimmedUsername = username.trimEnd();
       const storedUsers = await AsyncStorage.getItem('users');
       const users = storedUsers ? JSON.parse(storedUsers) : {};

       if (users[trimmedUsername] && users[trimmedUsername] === password) {
         const role = (trimmedUsername === 'admin' && password === '123') ? 'admin' : 'user';
         await AsyncStorage.setItem('loggedInUser', JSON.stringify({ username: trimmedUsername, role }));
         navigation.replace('Main');
       } else {
         setError('Invalid username or password');
       }
     };
     ```

   - **Algoritma Register**: Memvalidasi input pengguna, memastikan username unik, dan menyimpan data pengguna baru ke AsyncStorage.
     ```javascript
     const handleRegister = async () => {
       if (/\s/.test(username)) {
         setError('Username must not contain spaces. Use ".", "_" or "-" instead.');
         return;
       }

       if (password !== confirmPassword) {
         setError('Passwords do not match');
         return;
       }

       const storedUsers = await AsyncStorage.getItem('users');
       const users = storedUsers ? JSON.parse(storedUsers) : {};

       if (!users[username]) {
         users[username] = password;
         await AsyncStorage.setItem('users', JSON.stringify(users));
         await AsyncStorage.setItem('loggedInUser', JSON.stringify({ username, role: 'user' }));
         navigation.replace('Main');
       } else {
         setError('Username already exists');
       }
     };
     ```

2. **Manajemen Tugas**:
   - **Algoritma Tambah Tugas**: Mengambil input dari pengguna, membuat objek tugas baru, dan menyimpannya ke AsyncStorage.
     ```javascript
     const addTask = () => {
       if (newTask.trim()) {
         const updatedTasks = [...tasks, { key: Date.now().toString(), text: newTask, deadline, completed: false }];
         setTasks(updatedTasks);
         saveTasks(updatedTasks);
         resetTaskForm();
       }
     };
     ```

   - **Algoritma Edit Tugas**: Memperbarui objek tugas yang ada berdasarkan input pengguna dan menyimpannya kembali ke AsyncStorage.
     ```javascript
     const saveTask = () => {
       if (newTask.trim() && currentTask) {
         const updatedTasks = tasks.map(task =>
           task.key === currentTask.key ? { ...task, text: newTask, deadline } : task
         );
         setTasks(updatedTasks);
         saveTasks(updatedTasks);
         resetTaskForm();
         setConfirmDialogVisible(false);
       }
     };
     ```

   - **Algoritma Hapus Tugas**: Menghapus objek tugas dari AsyncStorage.
     ```javascript
     const removeTask = async () => {
       if (selectedTask) {
         const taskKey = selectedTask.key;
         const updatedTasks = tasks.filter(task => task.key !== taskKey);
         setTasks(updatedTasks);
         await saveTasks(updatedTasks);
         setSelectedTask(null);
         setConfirmDialogVisible(false);
       }
     };
     ```

   - **Algoritma Tandai Tugas Selesai**: Mengubah status tugas menjadi selesai atau belum selesai dan menyimpannya ke AsyncStorage.
     ```javascript
     const toggleTask = (taskKey) => {
       const updatedTasks = tasks.map(task =>
         task.key === taskKey ? { ...task, completed: !task.completed } : task
       );
       setTasks(updatedTasks);
       saveTasks(updatedTasks);
     };
     ```

3. **Notifikasi**:
   - **Algoritma Penjadwalan Notifikasi**: Menjadwalkan notifikasi jika tenggat waktu tugas kurang dari 30 menit.
     ```javascript
     const scheduleNotification = async (task) => {
       const timeDiff = new Date(task.deadline).getTime() - new Date().getTime();
       if (timeDiff > 0 && timeDiff <= 30 * 60 * 1000) {
         await Notifications.scheduleNotificationAsync({
           content: {
             title: "Task Deadline Approaching",
             body: `Your task "${task.text}" is due soon!`,
           },
           trigger: { seconds: Math.floor(timeDiff / 1000) },
         });
       }
     };
     ```

   - **Algoritma Registrasi Notifikasi**: Meminta izin untuk mengirim notifikasi dan mendapatkan token notifikasi.
     ```javascript
     const registerForPushNotificationsAsync = async () => {
       const { status } = await Notifications.requestPermissionsAsync();
       if (status !== 'granted') {
         alert('Failed to get push token for push notification!');
         return;
       }
       const token = (await Notifications.getExpoPushTokenAsync()).data;
       console.log(token);
     };
     ```

4. **Progress Bar**:
   - **Algoritma Menghitung Progres**: Menghitung persentase tugas yang telah diselesaikan dari total tugas.
     ```javascript
     const calculateProgress = () => {
       const completedTasks = tasks.filter(task => task.completed).length;
       const totalTasks = tasks.length;
       const progress = totalTasks > 0 ? completedTasks / totalTasks : 0;
       setProgress(progress);
     };
     ```

5. **Pengelolaan Daftar Pengguna (Admin)**:
   - **Algoritma Melihat Daftar Pengguna**: Menampilkan daftar semua pengguna yang terdaftar di sistem.
     ```javascript
     const loadUsers = async () => {
       const storedUsers = await AsyncStorage.getItem('users');
       const users = storedUsers ? JSON.parse(storedUsers) : {};
       setUsers(Object.keys(users).map(username => ({ username, password: users[username] })));
     };
     ```

   - **Algoritma Menghapus Pengguna**: Menghapus pengguna dari daftar dan semua data tugas terkait.
     ```javascript
     const removeUser = async (username) => {
       const storedUsers = await AsyncStorage.getItem('users');
       const users = storedUsers ? JSON.parse(storedUsers) : {};
       delete users[username];
       await AsyncStorage.setItem('users', JSON.stringify(users));

       // Hapus data todolist pengguna
       await AsyncStorage.removeItem(`tasks_${username}`);
       
       loadUsers();
     };
     ```

## Blackbox Testing

### Skenario Blackbox Testing

1. **Login dengan kredensial yang valid**
   - **Input**: `username: "user1"`, `password: "password1"`
   - **Hasil yang Diharapkan**: Pengguna berhasil login dan diarahkan ke halaman utama.

2. **Login dengan kredensial yang tidak valid**
   - **Input**: `username: "user1"`, `password: "wrongpassword"`
   - **Hasil yang Diharapkan**: Pengguna menerima pesan kesalahan "Invalid username or password".

3. **Mendaftar dengan username baru**
   - **Input**: `username: "newuser"`, `password: "password1"`, `confirmPassword: "password1"`
   - **Hasil yang Diharapkan**: Pengguna berhasil mendaftar dan diarahkan ke halaman utama.

4. **Mendaftar dengan username yang sudah ada**
   - **Input**: `username: "user1"`, `password: "password1"`, `confirmPassword: "password1"`
   - **Hasil yang Diharapkan**: Pengguna menerima pesan kesalahan "Username already exists".

5. **Menambah tugas baru**
   - **Input**: `task: "Tugas Baru"`, `deadline: "2023-12-31 23:59"`
   - **Hasil yang Diharapkan**: Tugas baru ditambahkan ke daftar tugas.

6. **Mengedit tugas yang sudah ada**
   - **Input**: `task: "Tugas Baru - Diedit"`, `deadline: "2024-01-01 23:59"`
   - **Hasil yang Diharapkan**: Tugas yang sudah ada diperbarui.

7. **Menghapus tugas**
   - **Input**: Pilih tugas dengan `task_id: "12345"`
   - **Hasil yang Diharapkan**: Tugas dihapus dari daftar tugas.

8. **Menandai tugas sebagai selesai**
   - **Input**: Pilih tugas dengan `task_id: "12345"`
   - **Hasil yang Diharapkan**: Tugas ditandai sebagai selesai dan progres diperbarui.

9. **Menerima notifikasi**
   - **Input**: Tugas dengan tenggat waktu `30 menit`
   - **Hasil yang Diharapkan**: Pengguna menerima notifikasi bahwa tenggat waktu tugas mendekati.

### Blackbox Testing

| No  | Use Case                 | Input                                               | Hasil yang Diharapkan                               | Status |
|-----|--------------------------|-----------------------------------------------------|----------------------------------------------------|--------|
| 1   | Login                    | username: "user1", password: "password1"             | Pengguna berhasil login dan diarahkan ke halaman utama | ✅      |
| 2   | Login                    | username: "user1", password: "wrongpassword"         | Pengguna menerima pesan kesalahan                  | ✅      |
| 3   | Register                 | username: "newuser", password: "password1", confirmPassword: "password1" | Pengguna berhasil mendaftar dan diarahkan ke halaman utama | ✅      |
| 4   | Register                 | username: "user1", password: "password1", confirmPassword: "password1" | Pengguna menerima pesan kesalahan                  | ✅      |
| 5   | Menambah tugas baru      | task: "Tugas Baru", deadline: "2023-12-31 23:59"     | Tugas baru ditambahkan ke daftar tugas             | ✅      |
| 6   | Mengedit tugas           | task: "Tugas Baru - Diedit", deadline: "2024-01-01 23:59" | Tugas yang sudah ada diperbarui                    | ✅      |
| 7   | Menghapus tugas          | task_id: "12345"                                    | Tugas dihapus dari daftar tugas                    | ✅      |
| 8   | Menandai tugas selesai   | task_id: "12345"                                    | Tugas ditandai sebagai selesai dan progres diperbarui | ✅      |
| 9   | Menerima notifikasi      | Tugas dengan tenggat waktu 30 menit                 | Pengguna menerima notifikasi bahwa tenggat waktu tugas mendekati | ✅      |

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

### Melaporkan Masalah

Jika Anda menemukan masalah atau bug dalam aplikasi ini, silakan buka [Issue Baru](https://github.com/jnzega/listosaurus-app/issues) di GitHub dan jelaskan masalah yang Anda temukan.

---

Terima kasih telah menggunakan dan berkontribusi pada Listosaurus! Mari bersama-sama membuat aplikasi ini lebih baik.
