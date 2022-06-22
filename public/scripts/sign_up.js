let userData = {}
    name_user.addEventListener('input', (event) => {
        userData.name = event.target.value
    })
    
    password.addEventListener('input', (event) => {
        userData.password = event.target.value
    })
    
    submit_signup.addEventListener('click', async () => {
        const response = await fetch(`${constants.url}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(userData)
        })
        userData = {}
        name_user.value = ''
        password.value = ''
    })