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

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})