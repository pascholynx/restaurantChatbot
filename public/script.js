document.addEventListener("DOMContentLoaded", function () {
  const chatInput = document.querySelector(".chat-input-area input");
  const sendButton = document.querySelector(".chat-input-area button");
  const chatMessages = document.querySelector(".chat-messages");

  // Establish a connection with the server
  const socket = io();

  // Listen for chatbot messages from the server
  socket.on("chatbotMessage", (message) => {
    addMessage("chatbot", message);
  });

  // Send message on button click
  sendButton.addEventListener("click", () => {
    sendMessage();
  });

  // Send message on pressing Enter key
  chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  });

  function sendMessage() {
    const message = chatInput.value.trim();

    if (message !== "") {
      addMessage("user", message);
      socket.emit("userMessage", message); // Emit user message to the server
      chatInput.value = "";
    }
  }

  function addMessage(type, message) {
    const messageContainer = document.createElement("div");
    messageContainer.className = `message ${type}`;
    messageContainer.textContent = message;

    chatMessages.appendChild(messageContainer);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});
