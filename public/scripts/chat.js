const socket = io();

const form = document.getElementById('message_box');
const input = document.getElementById('message_input');

form.addEventListener('submit', function(e) {
    e.preventDefault()
    if (input.value) {
        socket.emit('chat message', input.value)
        input.value = ''
    }
});