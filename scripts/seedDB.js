const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Games collection and inserts the books below

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/virtualbacklog",
    { useNewUrlParser: true }
);

const gameSeed = [{
        title: "Tetris Effect",
        system: "PS4",
        developer: "Enhance Games",
        box_art: "https://www.giantbomb.com/api/image/scale_medium/3059453-image.jpeg",
        description: "Tetris for the PS4/PSVR by Tetsuya Mizuguchi, creator of REZ and Lumines.",
        is_beaten: true,
        favorite: true,
        now_playing: false,
        owned: true,
        rating: 9.5,
        price: 40,
        year_released: 2018,
        date: new Date(Date.now()),
        user: "Justin",
        note: "testing"
    },
    {
        title: "BioShock Infinite",
        system: "PS3",
        developer: "Irrational Games",
        box_art: "https://www.giantbomb.com/api/image/scale_medium/2379677-bioshockinfinite_boxart.jpg",
        description: "The third game in the BioShock series leaves the bottom of the sea behind for an entirely new setting - the floating city of Columbia, circa 1912. Come to retrieve a girl named Elizabeth, ex-detective Booker DeWitt finds more in store for him there than he could ever imagine.",
        is_beaten: true,
        favorite: true,
        now_playing: false,
        rating: 10,
        price: 10,
        year_released: 2013,
        date: new Date(Date.now()),
        user: "Justin",
        note: "testing"
    },
    {
        title: "Metroid: Zero Mission",
        system: "GBA",
        developer: "Nintendo",
        box_art: "https://www.giantbomb.com/api/image/scale_medium/2617564-mzm.jpg",
        description: "A GBA Metroid game and remake of the original Metroid for the NES. It also depicts what happens immediately after the self destruct sequence by Mother Brain.",
        is_beaten: true,
        favorite: true,
        now_playing: false,
        rating: 9.5,
        price: 25,
        year_released: 2004,
        date: new Date(Date.now()),
        user: "Justin",
        note: "testing"
    }
]

db.Game
    .deleteMany({})
    .then(() => db.Game.collection.insertMany(gameSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

// Template for more seed data
// { 
// title: "",
// system: "",
// developer: "",
// box_art: "",
// description: "",
// is_beaten: ,
// favorite: ,
// now_playing: ,
// rating: ,
// price: ,
// year_released: ,
// date: new Date(Date.now()),
// note: ,
// user: 
// },