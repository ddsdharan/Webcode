// API endpoint URL
const apiUrl = "https://www.anapioficeandfire.com/api/books";
const charactersUrl = "https://www.anapioficeandfire.com/api/characters";
// Create search bar HTML elements
const searchBarDiv = document.createElement("div");
searchBarDiv.classList.add("search-bar");
const searchInputLabel = document.createElement("label");
searchInputLabel.textContent = "Search books  ";
searchInputLabel.setAttribute("for", "search");
const searchInput = document.createElement("input");
searchInput.setAttribute("type", "text");
searchInput.setAttribute("id", "search");
// Add search bar elements to the HTML
searchBarDiv.appendChild(searchInputLabel);
searchBarDiv.appendChild(searchInput);
document.body.insertBefore(searchBarDiv, document.body.firstChild);
// Select the HTML elements where the books will be displayed and the search input
const booksDiv = document.querySelector("#books");
const searchInpu = document.querySelector("#search");
const charactersDiv = document.querySelector("#characters");
// Fetch data from API and display books
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        displayBooks(data);
        fetch(charactersUrl)
            .then(response => response.json())
            .then(charactersData => {
                // Display the first 5 characters
                displayCharacters(charactersData.slice(0, 5));
            })
        // Add event listener to search input to filter books
        searchInput.addEventListener("input", () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredBooks = data.filter(book => book.name.toLowerCase().includes(searchTerm));
            displayBooks(filteredBooks);
        });
    })
    .catch(error => console.error(error));
// Function to display books on the page
function displayBooks(books) {
    // Clear previous book elements from the HTML
    booksDiv.innerHTML = "";
    // Loop through the first 10 books in the array
    for (let i = 0; i < 10 && i < books.length; i++) {
        // Create a new HTML element for each book
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        // Get the title and author information for the book
        const bookTitle = books[i].name;
        const ISBN = books[i].isbn;
        const numberofpages = books[i].numberOfPages;
        const bookAuthor = books[i].authors;
        const publisher = books[i].publisher;
        const releaseddate = books[i].released;
        // Set the text content of the book element
        const bookText = document.createTextNode(`${bookTitle} by ${bookAuthor} ISBN: ${ISBN} No.Pages - ${numberofpages} Published by ${publisher} released in the year of ${releaseddate}`);
        bookDiv.appendChild(bookText);
        // Add the book element to the HTML
        booksDiv.appendChild(bookDiv);
    }
}
// Function to display characters on the page
function displayCharacters(characters) {
    // Clear previous character elements from the HTML
    charactersDiv.innerHTML = "";
    // Loop through the first 5 characters in the array
    for (let i = 0; i < 5 && i < characters.length; i++) {
        // Create a new HTML element for each character
        const charactersDiv = document.createElement("div");
        charactersDiv.classList.add("character");
        // Get the name and gender information for the character
        const characterName = characters[i].name;
        const characterGender = characters[i].gender;
        // Set the text content of the character element
        const characterText = document.createTextNode(`${characterName} (${characterGender})`);
        charactersDiv.appendChild(characterText);
        // Add the character element to the HTML
        charactersDiv.appendChild(charactersDiv);
    }
}