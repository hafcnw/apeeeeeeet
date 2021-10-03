# Nama/NIM = Hafidz Cahya Nur Wibowo
# Tanggal = 2 Oktober 2021
# Deskripsi = Ini adalah Tugas Pendahuluan Nomor 3 dari Modul 1 Pengenalan Komputasi

x = int(input("Masukkan X: "))

if x > 0:
    hasil = "X adalah bilangan positif"
    if x % 2 == 0:
        hasil = hasil + " " + "genap"
    else:
        hasil = hasil + " " + "ganjil"
elif x < 0:
    hasil = "X adalah bilangan negatif"
else:
    hasil = "X adalah bilangan nol"

print(hasil)