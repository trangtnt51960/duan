const ws = new WebSocket("ws://localhost:8080");
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("send");
const usernameInput = document.getElementById("username");

sendButton.addEventListener("click", () => {
    let username = usernameInput.value.trim();
    let text = messageInput.value.trim();

    if (username === "" || text === "") {
        alert("Vui lòng nhập tên và tin nhắn!");
        return;
    }

    let message = { sender: username, text: text };

    // Hiển thị tin nhắn của chính mình lên chat-box
    displayMessage(message, true);

    // Gửi tin nhắn đến server WebSocket
    ws.send(JSON.stringify(message));

    // Xóa nội dung ô nhập tin nhắn
    messageInput.value = "";
});

ws.onmessage = (event) => {
    let message = JSON.parse(event.data);
    
    // Hiển thị tin nhắn của người khác
    displayMessage(message, false);
};

// Hàm hiển thị tin nhắn
function displayMessage(message, isSelf) {
    let messageElement = document.createElement("div");
    messageElement.className = isSelf ? "my-message" : "other-message";
    messageElement.textContent = `${message.sender}: ${message.text}`;
    chatBox.appendChild(messageElement);

    // Cuộn xuống tin nhắn mới nhất
    chatBox.scrollTop = chatBox.scrollHeight;
}
