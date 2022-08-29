const createSlide = (path, caption, name, avatar) => {
    return `
        <div class="card">
            <div class="name_message card-action">
                <div class="avatar">
                    <img class="responsive-img" src="${avatar}" alt="${name}">
                 </div>
                 ${name}
            </div>
            <div class="card-image photo">
                <a href="#"><img src="${path}"></a>
            </div>
            <div class="card-content">
                <p>${caption}</p>
            </div>
        </div>
       
    `
}

const gallery = document.querySelector('.gallery');
const renderGallery = async () => {
    const response = await fetch(`${constants.url}/gallery`)
    const images = await (response.ok ? response.json() : [])

    images.forEach(image => {
        if (image.avatar === "") {
            image.avatar = "images/service/ext.png" 
        }
        const slide = createSlide(image.image, image.caption, image.name, image.avatar)
        gallery.insertAdjacentHTML('beforeend', slide)
    })
}

document.addEventListener("DOMContentLoaded", async () => {
    await renderGallery()
    setTimeout(() => {
        gallery.scrollTop = gallery.scrollHeight
    }, 50)
})
