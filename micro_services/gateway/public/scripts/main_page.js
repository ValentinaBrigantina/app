const createSlide = (path, name) => {
    return `
        <li>
            <img src=${path}>
            <div class="caption center-align">
                <h3>${name}</h3>
            </div>
        </li>
    `
}

(async () => {
    const response = await fetch(`${constants.url}/pet`)
    const pets = await (response.ok ? response.json() : [])
    const slider = document.querySelector('.slides')

    pets.forEach(pet => {
        const slide = createSlide(pet.image, pet.name)
        slider.insertAdjacentHTML('beforeend', slide)
    })

    M.Slider.init(
        document.querySelectorAll('.slider'), {
            interval: 20000
        }
    )
})()
