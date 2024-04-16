const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Conn established');
});

socket.on('message', (data) => {
  console.log('Message received:', data);
  displayMessage(data);
});

function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value.trim();
  if (message) {
    socket.emit('message', { text: message });
    messageInput.value = '';
  }
}

function displayMessage(data) {
  const chatContainer = document.getElementById('chatContainer');
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('message-container')

  messageContainer.innerText = data.text;
  chatContainer.appendChild(messageContainer);
}