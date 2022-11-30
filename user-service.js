const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let usersSchema = new Schema({
    userName: {
        type: String,
        unique: true
    },
    password: String,
    fullName: String,
    email: String,
    role: String
})

let User;

module.exports.connect = function () {
    return new Promise(function (resolve, reject) {
        let db1 = mongoose.createConnection("mongodb+srv://admin:y2LresEu7IHfCsv3@cluster0.pccp8.mongodb.net/db2?retryWrites=true&w=majority");

        User = db1.model("users", usersSchema);
        resolve();
    })
}


module.exports.checkUser = function (userData) {
    return new Promise(function (resolve, reject) {
        User.find({
            userName: userData.userName,
            password: userData.password
        }).limit(1).exec().then((userObj) => {
            if (userObj.length == 0)
                reject("Error: Unable to find a user with this info " + userData.userName);
            else
                resolve(userObj);
        }).catch((err) => {
            console.log(err);
            reject(err);
        });

    })

}




