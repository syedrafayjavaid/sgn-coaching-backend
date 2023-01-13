const express = require('express')
const app = express()
const dotenv = require('dotenv');
const cors = require('cors')
const morgan = require('morgan')
const port = process.env.port || 3005;
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())


// load env variables
dotenv.config({ path: "./config/config.env" });


// Connect with database
connectDB();


if (process.env.NODE_ENV == 'development') {
    app.use(morgan("dev"));
}





// Route Files
const auth = require("./routes/auth");
const coach = require("./routes/coach")
const package = require("./routes/package")



// Mount routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/coaches", coach);
app.use("/api/v1/packages", package);



app.listen(port, () => {
    console.log(`The SGN Coaching App is listening on port ${port}`)
})

app.get('/', (req, res) => {
    res.send(`The SGN Coaching App is live on port ${port}`)
})
