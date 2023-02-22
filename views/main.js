const chatbox = document.querySelector('.chat-box')
const inputField = chatbox.querySelector('input[type="text"]')
const button = chatbox.querySelector('input[type="button"]')
const chatboxBody = chatbox.querySelector('.chat-box-body')


button.addEventListener('click', sendMessage)

inputField.addEventListener('keypress', event => {
    if (event.which === 13) {
        sendMessage()
    }
})

function sendMessage() {
    const message = inputField.value
    inputField.value = ''
    chatboxBody.innerHTML += `<div class="outgoing-message">${ message }</div>`
    scrollToButtom()

    fetch('http://localhost:8080/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            console.log(message);
            chatboxBody.innerHTML += `<div class="incoming-message">${data.message}</div>`
            scrollToButtom()
        })
}

function scrollToButtom() {
    chatboxBody.scrollTop = chatboxBody.scrollHeight;
}

