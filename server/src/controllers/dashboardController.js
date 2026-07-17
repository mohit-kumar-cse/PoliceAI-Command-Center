// C:\PoliceAI-Command-Center\server\src\controllers\dashboardController.js
const Crime = require("../models/Crime");
const Alert = require("../models/Alert");
const Vehicle = require("../models/Vehicle");
const Camera = require("../models/Camera");



const getDashboardData = async(req,res)=>{


try{


// Total crimes

const totalCrimes = await Crime.countDocuments();


// Active alerts

const activeAlerts = await Alert.find({

status:"active"

}).sort({

createdAt:-1

}).limit(10);




// Active vehicles

const vehicles = await Vehicle.find();



// Cameras

const cameras = await Camera.find();




// Crime graph data

const crimeGraph = await Crime.aggregate([
  {
    $group: {
      _id: { year: { $year: "$date" }, month: { $month: "$date" } },
      count: { $sum: 1 },
    },
  },
  { $sort: { "_id.year": 1, "_id.month": 1 } },
]);




// Map locations

const locations = await Crime.find()

.select(

"latitude longitude crimeType severity"

)

.limit(50);




res.status(200).json({


success:true,


totalCrimes,


alerts:activeAlerts,


vehicles,


cameras,


crimeGraph,


locations



});



}

catch(error){


res.status(500).json({

success:false,

message:error.message

});


}



};



module.exports={

getDashboardData

};