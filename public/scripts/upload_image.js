addImagePet.addEventListener('click', async () => {
    if (!localStorage.token) {
        alert('Need to login')
    }
})

upload.addEventListener('click', async (e) => {
    if (!nameImage.value) {
        e.preventDefault()
        alert('Picture not added')
    }
})