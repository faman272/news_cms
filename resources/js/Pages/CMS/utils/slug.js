export const createSlug = (string) => {
    return string
        .toLowerCase() // Ubah ke huruf kecil
        .trim() // Hapus spasi di awal dan akhir
        .replace(/[^a-z0-9 -]/g, '') // Hapus karakter yang tidak diinginkan
        .replace(/\s+/g, '-') // Ganti spasi dengan tanda hubung
        .replace(/-+/g, '-'); // Ganti beberapa tanda hubung berturut-turut dengan satu tanda hubung
};