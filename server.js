const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 1717

app.set('view engine', 'ejs')

const defaultData = require('./db/defaultData')
const auth = require('./auth')
const books = require('./crud')
const db = require('./db')

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.static('public')) //publictin  ichinde css js bolot
db.defaults(defaultData).write()

app.use(express.json())
const session = require('express-session');

app.use(
  session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  })
);


app.get('/',(req,res) => {        //papkanyn atyn ele jazabyz
    res.render('index')
})
app.get('/me', (req, res) => {
    res.render('me', { username: req.session.username });
});


app.get('/login',(req,res) => {     
    res.render('registration')
})


// Регистрейшн
app.post('/check-user',(req,res) => {
    const username = req.body.username
    if(!username || username.trim() === "")
        return  res.redirect('/')       //egerde username tuura emes bolso anda redirect
    else
    req.session.username = req.body.username;
    res.redirect('/me');
})
app.get('/signin',(req,res) => {
    res.render('signin')
})
// Voyti
app.post('/signin' ,(req,res) => {
    const { username, password } = req.body;
    const user = db.get('users').find({username}).value()
    
    if(user) {
        req.session.username = username
        res.redirect('/me')
    }else{
        res.redirect('/login')
    }
})


// Me
app.get('/me', (req, res) => {
    const token = req.get('X-Auth');
    const user = db.get('users').find({ token }).value();

    if (!user) {
        res.status(403).send('Access is denied');
    } else {
        res.send(user.data);
    }
});


// Books Apige
app.get('/api/books',(req, res) => {
    const books = db.get('books').value();
    res.json(books)
})

// Books Korsotot
app.get('/books', (req, res) => {
    res.render('books')
})

// Books:id
app.get('/books/api/:id',(req, res) => {
    const bookId = req.params.id
   const book = db.get('books').find({id:bookId}).value();
   if(!book){
    res.status(404).send("jok")
   }else{
    res.json(book)
   }
})

// Create
app.get('/books/create', (req, res) => {
    res.render('createBook')
})
// Books/id korsotot
app.get('/books/:id', (req, res) => {
    res.render('bookItem')
})


//  app.get('/books/:id', books.getItem)
app.put('/books/update/:id', books.updateItem)
app.delete('/books/delete/:id', books.deleteItem)

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))