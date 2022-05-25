const express = require('express')
require('dotenv').config();

const app = express()

//middlewares
app.use(express.json());

//routes
app.use('/files', require("./routes/files.js"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})