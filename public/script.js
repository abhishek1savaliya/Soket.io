
const socket = io();
const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("message");
const allMessage = document.getElementById("show");
let username = "";

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("usernameModal").classList.remove("hidden");
});

document
  .getElementById("submitUsername")
  .addEventListener("click", function () {
    username = document.getElementById("usernameInput").value;
    document.getElementById("usernameModal").classList.add("hidden");
  });

function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00ffffff).toString(16).toUpperCase();
  return "#" + "00000".substring(0, 6 - c.length) + c;
}

socket.on("message", (data) => {
  const p = document.createElement("p");
  const color = stringToColor(data.senderId);
  p.innerHTML = `<strong style="color:${color};">${data.senderId}:</strong> ${data.message}`;
  allMessage.appendChild(p);
});

sendBtn.addEventListener("click", (e) => {
  const message = messageInput.value.trim();

  if (!username) {
    document.getElementById("alertMessage").textContent =
      "Enter the Username";
    document.getElementById("customAlert").classList.remove("hidden");
    return;
  }

  if (message.length === 0) {
    document.getElementById("alertMessage").textContent =
      "Message cannot be empty";
    document.getElementById("customAlert").classList.remove("hidden");
    return;
  }

  const senderId = username;
  const data = { message, senderId };
  socket.emit("message", data);
  messageInput.value = "";
});

document
  .getElementById("closeAlert")
  .addEventListener("click", function () {
    document.getElementById("customAlert").classList.add("hidden");
  });
  