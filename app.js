const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const db = require("./db");
const MenuItem = require("./models/model");
const OrderHistory = require("./models/model");


const PORT = 3000;

//Connect to MongoDB
db.connectToMongoDB();

const currentOrder = {};

const getMenuItems = async () => {
  try {
    const items = await MenuItem.find({});
    return items.map(item => `${item.id}. ${item.name} - $${item.price}`).join('\n');
  } catch (err) {
    return "Failed to fetch menu items.";
  }
};



const handleUserMessage = async (socket, message) => {
  const option = parseInt(message);

  if (isNaN(option)) {
    socket.emit("chatbotMessage", "Invalid input. Please enter a number.");
    return;
  }

  const userId = socket.id;
  if (!currentOrder[userId]) {
    currentOrder[userId] = [];
  }

  switch (option) {
    case 1:
      const menuItems = await getMenuItems();
      socket.emit("chatbotMessage", `Here's our menu:\n${menuItems}\n\nSelect an item number to place an order.`);
      break;
    case 99:
      if (currentOrder[userId].length === 0) {
        socket.emit("chatbotMessage", "No order to place. To place a new order, select 1.");
      } else {
        const newOrder = new OrderHistory({
          items: currentOrder[userId],
          createdAt: new Date(),
        });
        await newOrder.save();
        currentOrder[userId] = [];
        socket.emit("chatbotMessage", "Order placed. To place a new order, select 1.");
      }
      break;
      case 98:
        try {
          const orderHistory = await OrderHistory.find({}).sort({ createdAt: -1 }).limit(10);
          if (orderHistory.length === 0) {
            socket.emit("chatbotMessage", "No order history. To place a new order, select 1.");
          } else {
            const formattedOrderHistory = orderHistory.map(order => {
              const items = order.items.map(item => `${item.name} - $${item.price}`).join(", ");
              return `Order placed on ${order.createdAt.toLocaleString()}: ${items}`;
            }).join("\n");
            socket.emit("chatbotMessage", `Order history:\n${formattedOrderHistory}\n`);
          }
        } catch (err) {
          console.error("Error fetching order history:", err);
          socket.emit("chatbotMessage", "Failed to fetch order history.");
        }
        break;      
    case 97:
      const currentOrderItems = currentOrder[userId].map(item => `${item.name} - $${item.price}`).join(", ");
      socket.emit("chatbotMessage", `Current order:\n${currentOrderItems}\n`);
      break;
    case 0:
      if (currentOrder[userId].length === 0) {
        socket.emit("chatbotMessage", "No order to cancel. To place a new order, select 1.");
      } else {
        currentOrder[userId] = [];
        socket.emit("chatbotMessage", "Order canceled. To place a new order, select 1.");
      }
      break;
    default:
      const selectedItem = await MenuItem.findOne({ id: option });
      if (selectedItem) {
        currentOrder[userId].push(selectedItem);
        socket.emit("chatbotMessage", `${selectedItem.name} added to your order. Select another item number or choose from the main menu.`);
      } else {
        socket.emit("chatbotMessage", "Invalid option. Please select a valid number.");
      }
  }
};


// API endpoint for fetching menu items
app.get("/api/menu-items", async (req, res) => {
  try {
    const items = await MenuItem.find({});
    res.json(items);
  } catch (err) {
    console.error("Error fetching menu items:", err);
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
});


// Socket.IO events
io.on("connection", (socket) => {
console.log("User connected:", socket.id);

socket.emit("chatbotMessage", "Welcome! Please select an option:\n1. Place an order\n99. Checkout order\n98. See order history\n97. See current order\n0. Cancel order");

socket.on("userMessage", (message) => {
handleUserMessage(socket, message);
});

socket.on("disconnect", () => {
console.log("User disconnected:", socket.id);
});
});

// Serve static frontend files
app.use(express.static("public"));

// Start the server
http.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});