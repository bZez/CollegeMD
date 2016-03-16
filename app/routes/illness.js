var Illness = require('../models/illness.js');

module.exports = {
	addIllness: function (req, res) {
		var body = req.body;

		symptomsUpper = [];

		for (symp in body.symptoms) {
			symptomsUpper.push(symp.toUpperCase());
		}

		var newIllness = new Illness({
			name: body.name.toUpperCase(),
			symptoms: symptomsUpper,
			createdAt: body.timestamp 
		});

		newIllness.save(function(err, newIll){
			//Adds the Illness to the database
			if (err) {
				return res.status(400).send({message: "Illness Not Added"});
			} else {
				return res.status(200).send({message: "Illness Added", data: newIll});
			}
		});
	},
	getIllness: function (req, res) {
		//Gets the Illness for a particular search from the database
		var body = req.body;

		Illness.findOne({name: body.name.toUpperCase()}, function( err, illness) {
			if (err) {
				return res.status(400).send({message: "Illness Not Found", data: []});
			} else {
				return res.status(200).send({message: "Illness Found", data: illness});
			}
		});
	},
	getIllnessBySymptoms:  function (req, res) {
		var body = req.body;

		symptomsUpper = [];

		for (symp in body.symptoms) {
			symptomsUpper.push(symp.toUpperCase());
		}

		Illness.find({ symptoms: { $eq: symptomsUpper} }, function( err, illness) {
			if (err) {
				return res.status(400).send({message: "Illness Not Found", data: []});
			} else {
				return res.status(200).send({message: "Illness Found", data: illness});
			}
		});
	},
	deleteIllness: function(req, res) {
		var body = req.body;

		Illness.remove({name: body.name.toUpperCase()},function( err, response) {
			if (err) {
				return res.status(400).send({message: "Illness Not Found"});
			} else {
				return res.status(200).send({message: "Illness Deleted"});
			}
		});
	}
};