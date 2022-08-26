const socket = io()

const createMessage = (name, message, date, avatar) => (
    `
        <li>
            <div class="item_message">
                <div class="name_message">
                    <div class="avatar">
                        <img class="responsive-img" src="${avatar}" alt="${name}">
                    </div>
                    ${name}
                </div>
                <div class="text_message">
                    ${message}
                </div>
                <div class="date_message">
                    ${date}
                </div>
            </div>
        </li>
    `
)

const messages = document.getElementById('messages')
const form = document.getElementById('message_box')
const input = document.getElementById('message_input')
const getDate = () => {
    const options = {
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        hourCycle: "h24",
    }
    const date = new Date().toLocaleString('en-US', options)
    return date
}

(async () => {
    const response = await fetch(`${constants.url}/messages`)
    const chatMessage = await (response.ok ? response.json() : [])
    chatMessage.forEach(message => {
        if (message.avatar === "") {
            message.avatar = "images/service/ext.png" 
        }
        const content = createMessage(message.name, message.message, message.date, message.avatar)
        messages.insertAdjacentHTML('beforeend', content)
    })
    messages.scrollTop = messages.scrollHeight
})()

const socketEmit = () => {
    if (input.value) {
        socket.emit('onChatMessage', {
            message: input.value,
            date: getDate(),
            userToken: localStorage.token || 'unknown'
        })
        input.value = ''
    }
}

input.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        socketEmit()
    }
})

form.addEventListener('submit', e => {
    e.preventDefault()
    socketEmit()
})

socket.on('onChatMessage', msg => {
    if (msg.avatar === "") {
        msg.avatar = "images/service/ext.png" 
    }
    const item = createMessage(msg.name, msg.message, msg.date, msg.avatar)
    messages.insertAdjacentHTML('beforeend', item)
    messages.scrollTop = messages.scrollHeight
})