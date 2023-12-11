async function main() {
    const response = await fetch('http://localhost:3001/listBooks')
    const data = await response.json()
    
    data.forEach(renderBook)
    newForm()
}

function renderBook(book) {
    const root = document.getElementById('root')

    const li = document.createElement('li')
    li.textContent = book.title
    
    const input = document.createElement('input')
    input.value = book.quantity

    const saveBtn = document.createElement('button')
    saveBtn.textContent = 'save'

    saveBtn.addEventListener('click', async () => {
        await fetch('http://localhost:3001/updateBook', {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                id: book.id,
                quantity: input.value
            })
        })
    })
    //Delete book button
    const delBtn = document.createElement('button')
    delBtn.textContent = 'delete'

    delBtn.addEventListener('click', async () => {
        await fetch('http://localhost:3001/removeBook/{bookId}', {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
    })

    

    li.append(input, saveBtn, delBtn)

    root.append(li)
}
//New form
async function newForm() {
    const root = document.getElementById('root')

    const newResponse = await fetch('http://localhost:3001/listBooks')
    const newDataGrab = await newResponse.json()
    //failed test for last id in array
    // const lastId = newDataGrab.books[newDataGrab.books.length - 1].id;
    // const newId = lastId + 1;
    
    const bookForm = document.createElement('form')
    bookForm.textContent = 'Add a new book here: '
    bookForm.setAttribute('class', 'd-flex flex-column container')
    bookForm.setAttribute('id', 'newBookForm')
    //Div for title input
    const titleContainer = document.createElement('div')

    const titleLabel = document.createElement('label')
    titleLabel.textContent = 'Add book title:'
    titleContainer.append(titleLabel)

    const titleInput = document.createElement('input')
    titleInput.setAttribute('label', 'bookTitle')
    titleInput.setAttribute('type', 'text')
    titleInput.setAttribute('class', 'form-control')
    titleContainer.append(titleInput)
    //Div for description input
    const descContainer = document.createElement('div')

    const descLabel = document.createElement('label')
    descLabel.textContent = 'Add book description:'
    descContainer.append(descLabel)

    const descInput = document.createElement('input')
    descInput.setAttribute('label', 'bookDescription')
    descInput.setAttribute('type', 'text')
    descInput.setAttribute('class', 'form-control')
    descContainer.append(descInput)
    //Div for current book quantity
    const quantityContainer = document.createElement('div')

    const quantityLabel = document.createElement('label')
    quantityLabel.textContent = 'Add current book quantity'
    quantityContainer.append(quantityLabel)

    const quantityInput = document.createElement('input')
    quantityInput.setAttribute('label', 'bookQuantity')
    quantityInput.setAttribute('type', 'number')
    quantityInput.setAttribute('class', 'form-control')
    quantityContainer.append(quantityInput)
    //Div for image URL
    const imgUrlContainer = document.createElement('div')

    const imgUrlLabel = document.createElement('label')
    imgUrlLabel.textContent = 'Add image URL:'
    imgUrlContainer.append(imgUrlLabel)

    const imgUrlInput = document.createElement('input')
    imgUrlInput.setAttribute('label', 'imageUrl')
    imgUrlInput.setAttribute('type', 'text')
    imgUrlInput.setAttribute('class', 'form-control')
    imgUrlContainer.append(imgUrlInput)
    //Div for submit button
    const bookSave = document.createElement('button')
    bookSave.setAttribute('id', 'saveBook')
    bookSave.setAttribute('type', 'submit')
    bookSave.setAttribute('class', 'btn btn-primary')
    bookSave.textContent = 'Submit New Book'
    
    bookForm.append(titleContainer, descContainer, quantityContainer, imgUrlContainer, bookSave)

    root.append(bookForm)

    //Book submission
    const formSubmit = document.getElementById('newBookForm')
    formSubmit.addEventListener('submit', (event) => {
        event.preventDefault()
        const formData = new FormData(formSubmit)
        
        fetch('http://localhost:3001/addBook', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                id: newId,
                year: new Date().getFullYear(),
                formData,
            })
        })
        bookForm.reset()
    })
}
main()