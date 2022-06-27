const socket = io()

const messages = document.getElementById('messages')
const form = document.getElementById('message_box')
const input = document.getElementById('message_input')

const getDate = () => {
    const date = new Date()
    return date
}

form.addEventListener('submit', function(e) {
    e.preventDefault()
    if (input.value) {
        socket.emit('onChatMessage', {
            id: Date.now(),
            message: input.value,
            date: getDate(),
            author: localStorage.token || 'anon'
        })
        input.value = ''
    }
})

socket.on('onChatMessage', function(msg) {
    var item = document.createElement('li')
    item.textContent = msg.message
    messages.appendChild(item)
})