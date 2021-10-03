#Nama/NIM = Hafidz Cahya Nur Wibowo
#Tanggal = 2 Oktober 2021
#Deskripsi = Ini adalah Tugas Pendahuluan Nomor 2 dari Modul 1 Pengenalan Komputasi

angka_1 = int(input("Masukkan angka pertama: ")) #input integer untuk memasukkan angka pertama
angka_2 = int(input("Masukkan angka kedua: ")) #input integer untuk memasukkan angka kedua
operasi = str(input("Masukkan operator: ")) #input string untuk memasukkan operator yang diinginkan
operasi_benar = True #nama fungsi yang mendefinisikan operasi_benar

if operasi == "+":
    hasil = angka_1 + angka_2
elif operasi == "-":
    hasil = angka_1 - angka_2
elif operasi == "*":
    hasil = angka_1 * angka_2
elif operasi == "/":
    hasil = angka_1 / angka_2
elif operasi == "%":
    hasil = angka_1 % angka_2
else:
    operasi_benar = False
    print("Operasi tidak valid")
if operasi_benar == True:
    print(f"{angka_1} {operasi} {angka_2} = {hasil}") #fungsi f digunakan untuk dapat merujuk pada variabel yang ada