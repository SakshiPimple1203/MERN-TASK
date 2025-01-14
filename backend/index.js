const express = require("express");
const cors = require("cors");
const app = express();
const initRoute = require("./src/models/routes/initRoute");


app.use(cors()); 
app.use(express.json()); 

app.use("/api", initRoute); 


app.get("/", (req, res) => {
  res.send("Welcome to the API server!");
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
