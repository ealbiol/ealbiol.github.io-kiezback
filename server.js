require("./config/config");


const cors = require('cors')
const mongoose = require("mongoose")
const express = require("express")
const app = express()



//Middlewares
app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
app.use(cors());


//RUTES
const neighborhoods = require("./routes/neighborhoods");
const coatsOfArmsImages = require("./routes/coatsOfArmsImages");
const technologies = require("./routes/technologies");
const adminUsers = require("./routes/adminUsers")
const neighborhoodsProperties = require("./routes/neighborhoodsProperties")


app.use("/users", require("./routes/users"))

app.use("/neighborhoods", neighborhoods)
app.use("/coatsOfArmsImages", coatsOfArmsImages)
app.use("/technologies", technologies)
app.use("/adminUsers", adminUsers)
app.use("/neighborhoodsProperties", neighborhoodsProperties)





//Mongoose connection to MongoDB
mongoose.connect("mongodb+srv://ealbiol:Testtest11@cluster0.kuhaj.mongodb.net/kiez?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    ignoreUndefined: true
});

const db = mongoose.connection;

db.on("error", err => console.log("Connection to MongoDB failed: ", err));
db.once("open", () => console.log("Connected to MongoDB succesfuly"));




app.listen(process.env.PORT, () => {
    console.log("Listening on port --->", process.env.PORT);
})









