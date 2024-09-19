def reverse_word_keep_numbers(word):
    # Pisahkan bagian huruf dan angka
    letters = ""
    numbers = ""
    for char in word:
        if char.isalpha():
            letters += char
        else:
            numbers += char

    # Balikkan bagian huruf
    reversed_letters = letters[::-1]

    # Gabungkan huruf yang telah dibalik dengan angka
    return reversed_letters + numbers


word = "NEGIE1"
reversed_word = reverse_word_keep_numbers(word)
print(reversed_word)  # Output: EIGEN1


def kata_terpanjang(kalimat):

    kata_kata = kalimat.split()  # Pisahkan kalimat menjadi list kata-kata
    panjang_maks = 0
    kata_terpanjang = ""

    for kata in kata_kata:
        if len(kata) > panjang_maks:
            panjang_maks = len(kata)
            kata_terpanjang = kata

    return kata_terpanjang


kalimat = "Saya sangat menyukai belajar pemrograman komputer"
hasil = kata_terpanjang(kalimat)
print("Kata terpanjang:", hasil)
print("Panjang kata terpanjang:", len(hasil))


def hitung_kemunculan(input_list, query_list):

    hasil = []
    for kata_query in query_list:
        jumlah = input_list.count(kata_query)
        hasil.append(jumlah)
    return hasil


input_list = ['xc', 'dz', 'bbb', 'dz']
query_list = ['bbb', 'ac', 'dz']
hasil = hitung_kemunculan(input_list, query_list)
print(hasil)


def hitung_selisih_diagonal(matriks):

    n = len(matriks)  # Ukuran matriks
    diagonal_utama = 0
    diagonal_kedua = 0

    for i in range(n):
        diagonal_utama += matriks[i][i]  # Diagonal utama
        diagonal_kedua += matriks[i][n - i - 1]  # Diagonal kedua

    return diagonal_utama - diagonal_kedua


matriks = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]
hasil = hitung_selisih_diagonal(matriks)
print("Selisih diagonal:", hasil)
