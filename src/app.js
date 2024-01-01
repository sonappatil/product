const express = require("express");
const path = require("path");
const hbs = require("hbs");
require("./db/conn");
const Register = require("./model/register");


const app = express();
const port = process.env.PORT || 3000;

const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "./templates/views");
const partialPath = path.join(__dirname, "./templates/partials");
// console.log(templatePath);

app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialPath);


app.get('/', (req, res) => {
    res.render("index");
})

app.get("/register", (req, res) => {
    res.render('register');
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.get("/product", (req, res) => {
    res.render("product");
})

app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;
        if (password === confirmpassword) {

            const registerEmployee = new Register({
                email: req.body.email,
                firstname: req.body.firstname,
                password: password,
                confirmpassword: confirmpassword
            })
    
            const registered = await registerEmployee.save();
            res.status(201).render("product");
        } else {
                res.send("Error saving data to the database");
        }
    } catch (error) {
        res.status(400).send(error);
    }
})

app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userEmail = await Register.findOne({ email });
        if(userEmail){
            res.status(201).render("product");
        } else {
            res.send("invalid login details");
        }

    } catch (error) {
        res.status(400).send(error);
    }
})

app.listen(port, () => {
    console.log("listen port");
})