const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


export async function fetchBooksFromBackend() {
  try {
    const response = await fetch(`${BACKEND_URL}/books/`);
    const data = await response.json();

    return data.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author?.name || 'Bilinmiyor',
      description: book.description || 'Açıklama yok.',
      coverImageUrl: book.cover_image_url || null,
      createdAt: book.createdAt ? new Date(book.createdAt) : new Date(),
      isbn: book.isbn || '',
    }));
  } catch (error) {
    console.error('Kitap verisi alınamadı:', error);
    return [];
  }
}


// ISBN ile tek bir kitap arama
export async function fetchBookByISBN(isbn) {
  try {
    const response = await fetch(`${BACKEND_URL}/books/?isbn=${isbn}`);
    const data = await response.json();

    if (!data || data.length === 0) {
      return null; // Kitap bulunamadı
    }

    const book = data[0]; // Genellikle ISBN tekildir, ilk kitabı al
    return {
      id: book.id,
      title: book.title,
      author: book.author?.name || 'Bilinmiyor',
      description: book.description || 'Açıklama yok.',
      coverImageUrl: book.cover_image_url || null,
      createdAt: book.createdAt ? new Date(book.createdAt) : new Date(),
      isbn: book.isbn || '',
    };
  } catch (error) {
    console.error('Kitap verisi alınamadı:', error);
    return null;
  }
}