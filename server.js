const exp = require("express");
const app = exp();

const cors = require("cors");
const dataService = require("./data-service");
const userService = require("./user-service");

const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJWT = require("passport-jwt");

var jwt_obj = {
    secretOrKey: "asdfasd$323423535RE%$^%##sgsdsdfsdfwesfsdf",
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderWithScheme("jwt")
}

var StrategyJWT = passportJWT.Strategy;

var strategy = new StrategyJWT(jwt_obj, function (jwt_payload, next) {
    console.log(jwt_payload);
    if (jwt_payload)
        next(null, {
            userName: jwt_payload.userName,
            fullName: jwt_payload.fullName,
            role: jwt_payload.role
        });
    else
        next(null, false);
});

passport.use(strategy);
app.use(passport.initialize())

app.use(cors());
app.use(exp.json());

//   http://localhost:8080
app.get("/", function (req, res) {
    res.json({ msg: "Hello" });
});

//http://localhost:8080/api/login
app.post('/api/login', function (req, res) {
    //  req.body.userName
    //  req.body.password
    userService.checkUser(req.body).then((userData) => {
        console.log(userData);

        var payload = {
            userName: userData.userName,
            fullName: userData.fullName,
            role: userData.role
        }
        var token = jwt.sign(payload, jwt_obj.secretOrKey);

        res.json({ "msg": "Login successful", "token": token });
    }).catch((e) => {
        console.log(e);
        res.json({ "error": e })
    });
});

//http://localhost:8080/api/vehicles
app.get("/api/vehicles", passport.authenticate("jwt", { session: false }), function (req, res) {
    dataService.getAllVehicles()
        .then((data) => {
            res.json(data);
        }).catch((e) => {
            console.log(e);

            res.status(404).end();
        });
});


app.use(function (req, res) {
    res.status(404).end();
});

var HTTP_PORT = process.env.PORT || 8080;

userService.connect().then(() => {
    app.listen(HTTP_PORT, () => {
        console.log("API listening to port " + HTTP_PORT)
    });
}).catch((e) => {
    console.log(e);
});
