require("dotenv").config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const morgan = require("morgan");
const usersRoutes = require("./routes/users.routes")
const authRoutes = require("./routes/auth.routes")
const productsRoutes = require("./routes/products.routes")
const payRoutes = require("./routes/pay.routes")


const helmet = require("helmet")
const xss = require("xss-clean")
const cors = require("cors")
const fileUpload = require("express-fileupload")

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(helmet())
app.use(xss())
app.use(cors())
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
)

app.use(usersRoutes)
app.use(authRoutes)
app.use(productsRoutes)
app.use(payRoutes)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
// Home
app.get("/", (req, res) => {
  res.send("API Tickitz")
})



app.listen(8000, () => {
  console.log("App running in port 8000")
})
