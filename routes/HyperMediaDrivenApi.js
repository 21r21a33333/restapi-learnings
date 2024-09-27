const router = require('express').Router();

const books = [
    { id: 1, title: 'Clean Code', author: 'Robert Martin' },
    { id: 2, title: 'The Pragmatic Programmer', author: 'Andy Hunt' }
];
// Utility function to generate hypermedia links
function generateLinks(bookId) {
    return {
        self: `/books/${bookId}`,
        update: `/books/${bookId}`,
        delete: `/books/${bookId}`
    };
}

// Route for fetching all books
router.get('/books', (req, res) => {
    const response = books.map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        links: generateLinks(book.id)  // Add hypermedia links
    }));
    res.json(response);
});

// Route for fetching a single book
router.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    const response = {
        id: book.id,
        title: book.title,
        author: book.author,
        links: generateLinks(book.id)  // Add hypermedia links
    };

    res.json(response);
});

// Route for updating a book
router.patch('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const updatedBook = { id: bookId, title: 'Refactoring', author: 'Martin Fowler' };

    // Update the books list (for simplicity)
    const index = books.findIndex(book => book.id === bookId);
    if (index !== -1) {
        books[index] = updatedBook;
        res.status(200).json({ message: 'Book updated successfully', links: generateLinks(bookId) });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// Route for deleting a book
router.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const index = books.findIndex(book => book.id === bookId);

    if (index !== -1) {
        books.splice(index, 1);
        res.status(204).end(); // No content
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

module.exports = router;