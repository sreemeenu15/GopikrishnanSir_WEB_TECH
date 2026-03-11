let page = 0;
async function addNote(){

    const note = {
        title: document.getElementById("title").value,
        subject: document.getElementById("subject").value,
        description: document.getElementById("description").value
    };

    await fetch("/notes",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(note)
    });

    loadNotes();
}

async function loadNotes(){

    const res = await fetch("/notes");
    const notes = await res.json();

    let html = "";

    notes.forEach(n => {

        html += `
        <div>
            <b>${n.title}</b> - ${n.subject}
            <p>${n.description}</p>
            <button onclick="editNote('${n.id}','${n.title}','${n.description}')">Edit</button>
            <button onclick="deleteNote('${n.id}')">Delete</button>
        </div>
        `;
    });

    document.getElementById("notes").innerHTML = html;
}

async function deleteNote(id){

    await fetch("/notes/"+id,{
        method:"DELETE"
    });

    loadNotes();
}

async function editNote(id,title,description){

    const newTitle = prompt("Update title", title);
    const newDescription = prompt("Update description", description);

    const updatedNote = {
        title: newTitle,
        description: newDescription
    };

    await fetch("/notes/"+id,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(updatedNote)
    });

    loadNotes();
}

async function loadBooks(){

    const res = await fetch("/books");
    const books = await res.json();

    renderBooks(books);
}

function renderBooks(books){

    let html = "";

    books.forEach(b => {

        html += `
        <div>
            <h3>${b.title}</h3>
            <p>Author: ${b.author}</p>
            <p>Category: ${b.category}</p>
            <p>Price: ${b.price}</p>
            <p>Rating: ${b.rating}</p>
        </div>
        `;
    });

    document.getElementById("books").innerHTML = html;
}
async function searchBooks(){

    const title = document.getElementById("searchTitle").value;

    const res = await fetch("/books/search?title="+title);
    const books = await res.json();

    renderBooks(books);
}

async function filterCategory(){

    const category = document.getElementById("category").value;

    const res = await fetch("/books/category/"+category);
    const books = await res.json();

    renderBooks(books);
}

async function sortPrice(){

    const res = await fetch("/books/sort/price");
    const books = await res.json();

    renderBooks(books);
}

async function sortRating(){

    const res = await fetch("/books/sort/rating");
    const books = await res.json();

    renderBooks(books);
}

async function topBooks(){

    const res = await fetch("/books/top");
    const books = await res.json();

    renderBooks(books);
}

async function nextPage(){

    page++;

    const res = await fetch("/books/page?page="+page);
    const data = await res.json();

    renderBooks(data.content);
}

loadNotes();
loadBooks();