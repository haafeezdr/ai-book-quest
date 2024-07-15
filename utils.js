export async function getGoogleBooksInfo(recommendationText) {
    const titles = recommendationText.split('\n').filter(title => title.trim() !== '');
  
    const bookDetailsPromises = titles.map(async (title) => {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}`);
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        return data.items[0].volumeInfo;
      }
      return { title };
    });
  
    return Promise.all(bookDetailsPromises);
  }