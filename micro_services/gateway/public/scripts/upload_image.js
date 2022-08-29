const createAlert = (message, href) => {
    return `
        <div class="newsMessage">
            <h1 class="newsMessage">
                ${message}
            </h1>
            <button id="comeback" class="waves-effect waves-light btn" onclick="window.location.href = '${href}'">
                OK
            </button>
        </div>
    `
}

if (localStorage.token) {
    upload.addEventListener('click', async (e) => {
        if (!nameImage.value) {
            e.preventDefault()
            M.toast({html: 'Picture not added', classes: 'alert'})
        }
    })
}

const form_upload = document.getElementById('form_upload') 

const giveIdUser = async () => {
    const response = await fetch(`${constants.url}/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({token: localStorage.token})
    })
    const currentUser = await response.json()
    return currentUser.id
}

form_upload.onsubmit = async (e) => {
    e.preventDefault()
    const authorId = await giveIdUser()
    const formData = new FormData(form_upload)
    formData.append('authorId', authorId)

    const response = await fetch(`${constants.url}/image/upload`, {
        method: 'POST',
        body: formData,
    })
    if (response.ok) {
        const form = document.querySelector('.form')
        const main = document.querySelector('.main')
        form.remove()
        main.insertAdjacentHTML('afterbegin', createAlert('Thanks, photo uploaded', 'http://127.0.0.1:3000/'))
        const button = document.getElementById('comeback')
        button.focus()
    }
}