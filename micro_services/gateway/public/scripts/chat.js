const socket = io()

const createMessage = (name, message, date) => {
    return `
        <li>
            <div class=item_message>
                <div class=name_message>
                    ${name}
                </div>
                <div class=text_message>
                    ${message}
                </div>
                <div class=date_message>
                    ${date}
                </div>
            </div>
        </li>
    `
}

const messages = document.getElementById('messages')
const form = document.getElementById('message_box')
const input = document.getElementById('message_input')

const getDate = () => {
    const date = new Date()
    return date
}

(async () => {
    const response = await fetch(`${constants.url}/messages`)
    const chatMessage = await (response.ok ? response.json() : [])
    chatMessage.forEach(message => {
        const content = createMessage(message.author, message.message, message.date)
        messages.insertAdjacentHTML('beforeend', content)
    })
})()

form.addEventListener('submit', function(e) {
    e.preventDefault()
    if (input.value) {
        socket.emit('onChatMessage', {
            id: Date.now(),
            message: input.value,
            date: getDate(),
            author: localStorage.token || 'unknown'
        })
        input.value = ''
    }
})

socket.on('onChatMessage', function(msg) {
    const item = createMessage(msg.author, msg.message, msg.date)
    messages.insertAdjacentHTML('beforeend', item)
})