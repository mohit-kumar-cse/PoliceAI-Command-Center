// C:\PoliceAI-Command-Center\server\src\controllers\aiController.js
const aiService = require("../services/aiService");
const Prediction = require("../models/Prediction");
const { sendAlert } = require("../services/websocketService");

exports.predictCrimeRisk = async (req, res) => {
    try {
        const result = await aiService.predictCrimeRisk(req.body);

        const savedPrediction = await Prediction.create({
            area: req.body.area,
            day: req.body.day,
            crime_type: req.body.crime_type,
            risk_level: result.risk_level,
            risk_score: result.risk_score,
        });

        // Push a live alert to connected dashboards when risk is HIGH
        if (result.risk_level === "HIGH") {
            sendAlert({
                area: req.body.area,
                crime_type: req.body.crime_type,
                risk_level: result.risk_level,
                risk_score: result.risk_score,
                message: `High risk of ${req.body.crime_type} predicted in ${req.body.area}`,
            });
        }

        res.status(200).json({
            success: true,
            prediction: result,
            prediction_id: savedPrediction._id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Crime Prediction Failed",
            error: error.message,
        });
    }
};