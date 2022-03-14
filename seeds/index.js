const mongoose = require("mongoose");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose
	.connect("mongodb://localhost:27017/yelp-camp")
	.then(() => {
		console.log("MONGO CONNECTION OPEN!!!");
	})
	.catch((err) => {
		console.log("OH NO MONGO CONNECTION ERROR");
		console.log(err);
	});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 50; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			author: "6228be2e6d7a8c50eeea34fc",
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			image: "https://source.unsplash.com/collection/483251",
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident quidem, molestias tempora laboriosam assumenda ut debitis eaque corrupti. Neque sunt natus atque quae sapiente iusto. Voluptatibus atque sit repellendus consectetur.",
			price,
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
