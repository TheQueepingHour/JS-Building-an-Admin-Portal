async function main() {
    const response = await fetch('http://localhost:3001/listBooks')
    const data = await response.json()
    
    data.forEach(renderBook)
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

    li.append(input, saveBtn)

    root.append(li)
}

main()