const crypto = require('crypto');
const router = require('express').Router();


// Example: A cacheable response for fetching a book
/*
res.set({
        'Cache-Control': 'public, max-age=3600, s-maxage=7200, must-revalidate'
    });
public: The response can be cached by both browsers and intermediate caches like CDNs.
private: The response is cached only by the browser, not by intermediary caches.
max-age: Specifies the maximum amount of time (in seconds) the response can be cached before it is considered stale.
s-maxage: Similar to max-age, but specifically for shared caches (like CDNs). If not specified, max-age applies to both the browser and shared caches.
must-revalidate: Forces the client to revalidate the cached response with the server after it becomes stale.
no-store: Prevents caching altogether (both browser and intermediary caches).

*/
router.get('/books/:id', (req, res) => {
    const bookId = req.params.id;

    // Set Cache-Control header to make the response cacheable for 1 hour (3600 seconds)
    res.set('Cache-Control', 'public, max-age=3600'); // 1 hour

    res.json({
        id: bookId,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald"
    });
});

// Example: A non-cacheable response for creating a new book (since it's a dynamic operation)
router.post('/books', (req, res) => {
    const newBook = req.body;

    // Set Cache-Control header to prevent caching (no-store or no-cache)
    res.set('Cache-Control', 'no-store'); // Prevent caching for dynamic content

    res.json({ message: 'New book created', newBook });
});
/*
Other Caching Headers:

ETag: Used to determine if the resource has changed.The client can send an If - None - Match header with the ETag, and if the resource hasn’t changed, the server can respond with a 304 Not Modified status.
    Expires: Specifies an expiration date for the resource.After this date, the client should fetch a new version.
    */

app.get('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const bookData = {
        id: bookId,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald"
    };

    // Generate a simple ETag for this resource (you can hash the content for a real use case)
    const etag = `${bookId}-${new Date().getTime()}`; // Simple ETag example

    res.set('ETag', etag);
    res.set('Cache-Control', 'public, max-age=3600'); // Cacheable for 1 hour

    // Check if the client already has the latest version using the If-None-Match header
    if (req.headers['if-none-match'] === etag) {
        // If the ETag matches, send a 304 Not Modified
        return res.status(304).end();
    }

    res.json(bookData);
});


/*
    etag with hashed data
    */


// Mock data (e.g., list of books)
let books = [
    { id: 1, title: 'Clean Code', author: 'Robert Martin' },
    { id: 2, title: 'The Pragmatic Programmer', author: 'Andy Hunt' }
];

// Generate a simple ETag based on the content of the resource
function generateETag(data) {
    return crypto.createHash('md5').update(JSON.stringify(data)).digest('hex');
}

// Route for fetching books with ETag and Cache-Control
app.get('/books', (req, res) => {
    const etag = generateETag(books);

    // Check if the ETag sent by the client matches the current ETag
    if (req.headers['if-none-match'] === etag) {
        // ETag matches, send 304 Not Modified
        res.status(304).end();
        return;
    }

    // Set ETag and Cache-Control headers
    res.set({
        'ETag': etag,
        'Cache-Control': 'public, max-age=3600, must-revalidate'
    });

    // Send the response with the books data
    res.json(books);
});

// Example of updating a book, which changes the ETag
app.patch('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const updatedBook = { id: bookId, title: 'Refactoring', author: 'Martin Fowler' };

    // Update the books list (for simplicity)
    books = books.map(book => (book.id === bookId ? updatedBook : book));

    res.status(200).json({ message: 'Book updated successfully' });
});




module.exports = router;