const express = require('express');
const compression = require('compression');
// const { databaseconnect } = require("./dbconfig");
const hypermedia = require('./routes/HyperMediaDrivenApi');
const compressrouter = require('./routes/compression');
const enforce = require('express-sslify');


//establishing connection
// databaseconnect();
//creating app
const app = express();

// app.use(enforce.HTTPS({ trustProtoHeader: true }));

//parsing middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// Use compression middleware
app.use(compression());

// Example response to be cached
const books = [
    { id: 1, title: 'Clean Code', author: 'Robert Martin' },
    { id: 2, title: 'The Pragmatic Programmer', author: 'Andy Hunt' }
];

// Route to fetch books, with caching headers for both browser and CDN
app.get('/books', (req, res) => {
    // Cache-Control for both browser and CDN
    res.set({
        'Cache-Control': 'public, max-age=3600, s-maxage=7200, must-revalidate'
    });

    // Send response
    res.json(books);
});



app.use("/hyper", (req, res, next) => { console.log("hi"); next(); }, hypermedia);
app.use("/compress", (req, res, next) => { console.log("compress"); next(); }, compressrouter);

app.use("*", (req, res) => {
    res.json({ "staus": "no page found " })
})
app.listen(3000, () => {
    console.log("server stated at 3000")
})

