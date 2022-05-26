require('dotenv').config();
const express = require('express')
const cors = require('cors')

const app = express();

//middlewares
app.use(express.json());
app.use(cors({
    methods:"*",
    origin:"*"
}))

//routes
app.use('/files', require("./routes/files.js"));
app.get("/", (req,res) => {
    res.status(200).send({message: "Welcome to the MEN-REST-API"});
  }); 

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

module.exports = app
