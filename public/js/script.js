const socket = io();

      // Hide the chat area initially
      document.getElementById('chat').style.display = 'none';

      // Handle form submission to join chat
      document.getElementById('go-button').addEventListener('click', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();
        if (username) {
          socket.emit('join', username);
          document.getElementById('username-form').style.display = 'none';
          document.getElementById('chat').style.display = 'block';
          document.getElementById('username-display').textContent = username;
        }
      });

      // Handle form submission to send message
      document.getElementById('message-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const message = document.getElementById('message-input').value.trim();
        if (message) {
          socket.emit('chat message', message);
          document.getElementById('message-input').value = '';
        }
      });

      // Handle incoming messages
      socket.on('chat message', (data) => {
        const messageElement = document.createElement('div');
        messageElement.innerHTML = `<strong>${data.username}:</strong> ${data.message}`;
        document.getElementById('messages').appendChild(messageElement);
      });

      // Handle user joining the chat
      socket.on('user joined', (username) => {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${username} has joined the chat`;
        document.getElementById('messages').appendChild(messageElement);
      });

      // Handle user leaving the chat
      socket.on('user left', (username) => {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${username} has left the chat`;
        document.getElementById('messages').appendChild(messageElement);
      });