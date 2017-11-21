var express = require("express");

var hbs = require("hbs");


var app = express();

app.set("view engine", "hbs");
app.use(express.static(__dirname + "/Express/public"));
hbs.registerPartials(__dirname + "/views/partials");

app.use((req,res,next) => {
    console.log("M:I am first");
next();

});

hbs.registerHelper('getYear', () => {
    return new Date().getFullYear();
});


app.get("/", (req, res) => {
    console.log("F:I am first");
    res.render("home.hbs", {
        title: "Home Page"
    });
});

app.listen(3000);