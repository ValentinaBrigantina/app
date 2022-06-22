window.constants = {
    url: 'http://127.0.0.1:3000',
    // url: `http://167.172.33.131,
}

const onloadHandler = async () => {

    const sidenavs = document.querySelectorAll('.sidenav')
    M.Sidenav.init(sidenavs)

    // upload.addEventListener('click', async (e) => {
    //     if (!nameImage.value) {
    //         e.preventDefault()
    //         alert('Picture not added')
    //     }
    // })

    signOut.addEventListener('click', async () => {
       localStorage.removeItem('token')
    })
}

document.addEventListener("DOMContentLoaded", onloadHandler)
