# Restaurant Chatbot

This Restaurant Chatbot project allows customers to interact with a chatbot to place orders, view their order history, check current orders, and cancel orders. It is built using Node.js, Express, Socket.IO, and MongoDB.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Real-time chat interface using Socket.IO
- User session management with express-session
- Place orders, view order history, check current orders, and cancel orders
- Menu items stored in MongoDB
- No authentication required

## Installation

To get started with the Restaurant Chatbot, follow these steps:

1. Clone the repository:

git clone https://github.com/pascholynx/restaurant_ChatBot.git


2. Navigate to the project directory:

cd restaurant_ChatBot


3. Install the required dependencies:

npm install


4. Set up your MongoDB server and update the `MONGO_URI` in `app.js` with your MongoDB connection string.

5. Start the server:

npm start


## Usage

1. Open your web browser and navigate to `http://localhost:3000` (or the appropriate port if you changed it).

2. Interact with the chatbot using the provided options:

- `1` to place an order
- `99` to checkout order
- `98` to see order history
- `97` to see the current order
- `0` to cancel the order

3. Follow the chatbot prompts to complete various actions.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)