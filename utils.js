export const getGoogleBooksInfo = async (titlesArr) => {
    return await Promise.all(titlesArr.map(async ({ title }) => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}&langRestrict=en&maxResults=1`);
            if (!response.ok) {
                throw new Error('Failed to fetch book info');
            }
            const responseData = await response.json();
            const bookObj = responseData.items[0];
            return {
                title,
                subtitle: bookObj.volumeInfo.subtitle || "",
                genre: bookObj.volumeInfo.categories ? bookObj.volumeInfo.categories[0] : "NA",
                authors: bookObj.volumeInfo.authors || [],
                summary: bookObj.volumeInfo.description || "",
                publisher: bookObj.volumeInfo.publisher || "",
                image: bookObj.volumeInfo.imageLinks ? bookObj.volumeInfo.imageLinks.thumbnail : "",
                isbn10: bookObj.volumeInfo.industryIdentifiers ? getIsbn10(bookObj.volumeInfo.industryIdentifiers) : undefined,
            };
        } catch (error) {
            console.error('Error fetching book info:', error);
            return null; // or handle the error in a different way
        }
    }));
}

const getIsbn10 = (industryIdentifiers) => {
    for (const identifier of industryIdentifiers) {
        if (identifier.type === "ISBN_10") {
            return identifier.identifier;
        }
    }
    return undefined; // handle the case when ISBN-10 is not found
}