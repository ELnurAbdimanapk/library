function displayBooks(data) {
  const booksContainer = document.getElementById('books');
  booksContainer.innerHTML = "";
  
  data.forEach(book => {
    const bookContainer = document.createElement('div');
    const title = document.createElement('h2');
    const author = document.createElement('p');

    bookContainer.classList.add('book-container');
    title.classList.add('book-title');
    author.classList.add('book-author');

    title.textContent = book.name;
    author.textContent = `Author: ${book.author}`;

    bookContainer.appendChild(title);
    bookContainer.appendChild(author);
    booksContainer.appendChild(bookContainer);
  });
}

fetch('http://localhost:1717/api/books')
  .then(response => response.json())
  .then(data => {
    displayBooks(data);
  })
  .catch(error => console.log(error.message));
// Фильтр кылабз
document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault();
  let inputSearchText = document.getElementById('search-field').value.toLowerCase();
  
  fetch('http://localhost:1717/api/books')
    .then(response => response.json())
    .then(data => {
      // фильтр
      const filteredData = data.filter(book => 
        book.name.toLowerCase().includes(inputSearchText) || 
        book.author.toLowerCase().includes(inputSearchText)
      );
      
      // салабыз
      displayBooks(filteredData);
    })
    .catch(error => console.log(error.message));
});
