console.log('token', localStorage.token);

if (!localStorage.token) {
    const containerUpload = document.querySelector('.containerUpload')

    let div = document.createElement('div')
    div.className = "warning"
    div.innerHTML = "<strong>Need to login!</strong>"
    containerUpload.replaceWith(div)
}

upload.addEventListener('click', async (e) => {
    if (!nameImage.value) {
        e.preventDefault()
        alert('Picture not added')
    }
})