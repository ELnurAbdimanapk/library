const bookId = '373yyr74y'

fetch(`http://localhost:1717/books/api/${bookId}`)
.then(response => response.json())
.then(data => {
  console.log(data);
  const bookContainer = document.getElementById('book');
  bookContainer.innerHTML = `
    <h1>${data.name}</h1>
    <p>${data.author}</p>
  `;
})
.catch(error => console.log(error.message));
