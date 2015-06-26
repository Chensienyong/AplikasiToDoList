# Aplikasi To Do List

## Dependencies

Sebelum bisa menjalankan aplikasi, pastikan beberapa hal telah ada:

1. Database MySQL dengan model tabel sesuai dengan yang ada pada pada direktori `data`.

2. Environment variabel berikut dikonfigurasikan:
a. `MYSQLDB_HOST`, berisi *hostname* dari sistem basis data.
b. `MYSQLDB_USER`, berisi pengguna yang dapat mengakses basis data.
c. `MYSQLDB_PASSWORD`, berisi password pengguna pada (b).
d. `MYSQLDB_DB`, berisi nama basis data yang akan digunakan.

Untuk menjalankan server, gunakan perintah :

$ npm install -g gulp

bila terdapat Permission denied, gunakan sudo.

Untuk menginstall *dependency*, gunakan perintah:

$ npm install

bila terdapat Permission denied, gunakan sudo.

## Menjalankan Aplikasi

Untuk menjalankan server, gunakan perintah :

$ gulp server

Dan aplikasi akan dapat diakses pada `http://localhost:3000/`.