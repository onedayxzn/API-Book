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
