#This is a book management api


#User routes

/*** Registeration ***/
method: POST
URL: http://localhost:8080/api/register
JSON body 
{
    name: "Ahmad",
    email: "khanahmad@gmail.com",
    password: "asdf",
    isAdmin: false,
}

/*** Login ***/
method: POST
URL: http://localhost:8080/api/login
JSON body 
{
    email: "khanahmad@gmail.com",
    password: "asdf",
}

#Book routes

/*** get single book ***/
method: GET
URL: http://localhost:8080/api/books/:id

/*** get multiple books ***/
method: GET
URL: http://localhost:8080/api/books

/*** add new book ***/
method: POST
URL: http://localhost:8080/api/books
JSON body 
{
    title: "Life of Pie",
    author: "Ahmad",
    category: "Ficiton",
    price: 4500,
    quantity: 670,
}

/*** get multiple books ***/
method: GET
URL: http://localhost:8080/api/books

/*** edit a book ***/
method: PATCH
URL: http://localhost:8080/api/books/:id
JSON body 
{
    title: "Life of Pie",
    author: "Ahmad",
    category: "Ficiton",
    price: 4500,
    quantity: 670,
}


/*** delete a book ***/
method: DELETE
URL: http://localhost:8080/api/books/:id

