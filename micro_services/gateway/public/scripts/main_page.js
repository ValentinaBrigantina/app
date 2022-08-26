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
                <img src="${path}">
            </div>
            <div class="card-content">
                <p>${caption}</p>
            </div>
        </div>
       
    `
}

(async () => {
    const response = await fetch(`${constants.url}/gallery`)
    const images = await (response.ok ? response.json() : [])
    const gallery = document.querySelector('.gallery')

    images.forEach(image => {
        const slide = createSlide(image.image, image.caption, image.name, image.avatar)
        gallery.insertAdjacentHTML('beforeend', slide)
    })
})()
