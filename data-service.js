var vehiclesData = [{
    id: 1,
    year: "2023",
    make: "make1",
    model: "model1",
    vin: "vin1"
},
{
    id: 2,
    year: "2022",
    make: "make2",
    model: "model2",
    vin: "vin2"
},
{
    id: 3,
    year: "2021",
    make: "make3",
    model: "model3",
    vin: "vin3"
}];


module.exports.getAllVehicles = function () {

    // return vehiclesData;

    return new Promise(function (resolve,reject) {
        resolve(vehiclesData);
    })

}


