const checkToken = async () => {
    if (localStorage.token) {
        const response = await fetch(`${constants.url}/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({token: localStorage.token})
        })
        const dataUser = await response.json()
        if (!dataUser.name) {
            localStorage.removeItem('token')
        }
        return dataUser
    }
}

const renderAvatar = (avatar, name) => (
        `
            <div class="avatar">
                <img class="responsive-img" src="${avatar}" alt="${name}">
            </div>
        
        `
)

const btnAddImage = document.getElementById('btnAddImage')
const btnChat = document.getElementById('btnChat')
const btnSignUp = document.getElementById('btnSignUp')
const btnSignIn = document.getElementById('btnSignIn')
const btnMyProfile = document.getElementById('btnMyProfile')
const btnAddImageMobile = document.querySelector('.btnAddImageMobile')
const btnChatMobile = document.querySelector('.btnChatMobile')
const btnSignUpMobile = document.querySelector('.btnSignUpMobile')
const btnSignInMobile = document.querySelector('.btnSignInMobile')
const btnMyProfileMobile = document.querySelector('.btnMyProfileMobile')
const signOut = document.querySelector('.signOut')
const signOutMobile = document.querySelector('.signOutMobile')
const navigation = document.querySelector('.navigation')

navigation.hidden = true

signOut.addEventListener('click', () => {
    localStorage.removeItem('token')
 })

 signOutMobile.addEventListener('click', () => {
    localStorage.removeItem('token')
 })

const renderingNav = async () => {
    const dataUser = await checkToken()

    if (localStorage.token) {
        btnSignUp.remove()
        btnSignIn.remove()
        const image = dataUser.image ? dataUser.image : "images/service/ext.png"
        const avatar = renderAvatar(image, dataUser.name)
        btnMyProfile.insertAdjacentHTML('beforeend', avatar)

    } else {
        btnAddImage.remove()
        btnChat.remove()
        btnMyProfile.remove()
    }
    navigation.hidden = false
}

const renderingNavMobile = async () => {
    const dataUser = await checkToken()

    if (localStorage.token) {
        btnSignUpMobile.remove()
        btnSignInMobile.remove()
        const image = dataUser.image ? dataUser.image : "images/service/ext.png"
        const avatar = renderAvatar(image, dataUser.name)
        btnAddImageMobile.insertAdjacentHTML('afterbegin', avatar)
    } else {
        btnAddImageMobile.remove()
        btnChatMobile.remove()
        btnMyProfileMobile.remove()
    }
}

const onloadHandler = async () => {
    await renderingNav()
    await renderingNavMobile()
    const sidenavs = document.querySelectorAll('.sidenav')
    const dropdown = document.querySelector('.dropdown-trigger')
    M.Sidenav.init(sidenavs)
    M.Dropdown.init(dropdown)
}

document.addEventListener("DOMContentLoaded", onloadHandler)
