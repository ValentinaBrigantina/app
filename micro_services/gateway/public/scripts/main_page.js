const createPhotoCard = (path, caption, name, avatar) => (
    `
        <div class="card">
            <div class="name_message card-action">
                <div class="avatar">
                    <img class="responsive-img" src="${avatar}" alt="${name}">
                 </div>
                 ${name}
            </div>
            <div class="card-image photo">
                <a href="#"><img class="photo_from_gallery" src="${path}"></a>
            </div>
            <div class="card-content">
                <p>${caption}</p>
            </div>
        </div>
       
    `
)

const message = (
    `
        <div class="newsMessage">
            <h1 class="newsMessage">
                Log in and upload the first photo!
            </h1>
            <div class="row">
                <img class="imageMain" src="images/service/start.jpeg">
            </div>
        </div>
    `
)

const gallery = document.querySelector('.gallery')
const preloader = document.querySelector('.preloader-wrapper')
const renderGallery = async () => {
    const response = await fetch(`${constants.url}/gallery`)
    const images = await (response.ok ? response.json() : [])

    if (images.length === 0) {
        gallery.insertAdjacentHTML('beforeend', message)
    }

    let count = 0
    const promises = images.map((image) => new Promise((resolve) => {
        if (image.avatar === "") {
            image.avatar = "images/service/ext.png" 
        }
        const slide = createPhotoCard(image.image, image.caption, image.name, image.avatar)
        gallery.insertAdjacentHTML('beforeend', slide)
        const photos = document.querySelectorAll('.photo_from_gallery')
        const photo = photos[count++]
        photo.onload = () => {
            resolve({ loaded: true })
        }
        setTimeout(() => {
            resolve({ loaded: false, photo })
        }, 500)
    }))
    const loadResult = await Promise.all(promises) 
}

document.addEventListener("DOMContentLoaded", async () => {
    await renderGallery()
    preloader.remove()
    gallery.classList.add('opacity-block')
    gallery.scrollTop = gallery.scrollHeight
})
