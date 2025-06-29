'use strict';

let stompClient = null;
let username = null;
let roomId = null;
let typingTimeout = null;

const connect = (event) => {
    username = document.querySelector('#name').value.trim();
    
    if (username) {
        document.querySelector('#username-page').classList.add('hidden');
        document.querySelector('#chat-page').classList.remove('hidden');
        
        const socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);
        
        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault();
}

const onConnected = () => {
    // Subscribe to the Public Topic
    stompClient.subscribe(`/topic/public/${roomId}`, onMessageReceived);
    
    // Tell your username to the server
    stompClient.send(`/app/chat.addUser/${roomId}`,
        {},
        JSON.stringify({sender: username, type: 'JOIN', chatRoom: roomId})
    );
    
    document.querySelector('.connecting').classList.add('hidden');
    document.querySelector('#room-id-display').textContent = `Room: ${roomId}`;
}

const onError = (error) => {
    console.log('Could not connect to WebSocket server. Please refresh this page to try again!');
    console.log(error);
}

const sendMessage = (event) => {
    const messageInput = document.querySelector('#message');
    const messageContent = messageInput.value.trim();
    
    if (messageContent && stompClient) {
        const chatMessage = {
            sender: username,
            content: messageContent,
            type: 'CHAT',
            chatRoom: roomId
        };
        
        stompClient.send(`/app/chat.sendMessage/${roomId}`, {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
    event.preventDefault();
}

const onMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);
    
    if (message.type === 'TYPING') {
        if (message.sender !== username) {
            document.querySelector('#typing-username').textContent = message.sender;
            document.querySelector('#typing-indicator').classList.remove('hidden');
            
            // Hide typing indicator after 2 seconds of inactivity
            clearTimeout(typingTimeout);
            typingTimeout = setTimeout(() => {
                document.querySelector('#typing-indicator').classList.add('hidden');
            }, 2000);
        }
        return;
    }
    
    const messageElement = document.createElement('li');
    messageElement.classList.add('chat-message');
    
    if (message.type === 'JOIN') {
        messageElement.classList.add('event');
        message.content = message.sender + ' joined the chat';
    } else if (message.type === 'LEAVE') {
        messageElement.classList.add('event');
        message.content = message.sender + ' left the chat';
    } else {
        // Regular chat message
        messageElement.classList.add(message.sender === username ? 'self' : 'other');
        
        const avatarElement = document.createElement('div');
        avatarElement.classList.add('chat-message-avatar');
        avatarElement.textContent = message.sender[0].toUpperCase();
        messageElement.appendChild(avatarElement);
    }
    
    const contentElement = document.createElement('div');
    contentElement.classList.add('chat-message-content');
    contentElement.textContent = message.content;
    
    const metaElement = document.createElement('div');
    metaElement.classList.add('chat-message-meta');
    const timestamp = new Date(message.timestamp).toLocaleTimeString();
    metaElement.textContent = message.sender + ' • ' + timestamp;
    
    messageElement.appendChild(contentElement);
    messageElement.appendChild(metaElement);
    
    document.querySelector('#messageArea').appendChild(messageElement);
    document.querySelector('#messageArea').scrollTop = document.querySelector('#messageArea').scrollHeight;
}

const handleTyping = () => {
    if (stompClient) {
        const chatMessage = {
            sender: username,
            type: 'TYPING',
            chatRoom: roomId
        };
        
        stompClient.send(`/app/chat.typing/${roomId}`, {}, JSON.stringify(chatMessage));
    }
}

// Load available rooms or create a new one
const loadRooms = async () => {
    try {
        const response = await fetch('/api/rooms');
        const rooms = await response.json();
        
        const roomSelect = document.querySelector('#room-select');
        roomSelect.innerHTML = '<option value="">Select a room</option>';
        
        rooms.forEach(room => {
            const option = document.createElement('option');
            option.value = room.id;
            option.textContent = room.name;
            roomSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading rooms:', error);
    }
}

const createRoom = async (roomName) => {
    try {
        const response = await fetch('/api/rooms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: roomName })
        });
        
        const room = await response.json();
        return room.id;
    } catch (error) {
        console.error('Error creating room:', error);
        return null;
    }
}

const handleRoomSelection = async (event) => {
    event.preventDefault();
    
    const selectedRoom = document.querySelector('#room-select').value;
    const newRoomName = document.querySelector('#new-room').value.trim();
    
    if (selectedRoom) {
        roomId = selectedRoom;
        connect(event);
    } else if (newRoomName) {
        roomId = await createRoom(newRoomName);
        if (roomId) {
            connect(event);
        } else {
            alert('Failed to create room. Please try again.');
        }
    } else {
        alert('Please select an existing room or create a new one.');
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadRooms();
    
    document.querySelector('#usernameForm').addEventListener('submit', handleRoomSelection, true);
    document.querySelector('#messageForm').addEventListener('submit', sendMessage, true);
    document.querySelector('#message').addEventListener('input', handleTyping, true);
});