require("dotenv").config();
const app = require("./src/app");
const connectToDatabase = require("./src/database/connectToDatabase");
const PORT = process.env.PORT;

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server is runing on ${PORT}`);
});
