require("dotenv").config();
const axios = require("axios");
const key = process.env.RAWG_API_KEY;

const platformAbbreviations = {
    "pc": "PC",
    "playstation5": "PS5",
    "playstation4": "PS4",
    "playstation3": "PS3",
    "playstation2": "PS2",
    "playstation1": "PS1",
    "ps-vita": "VITA",
    "psp": "PSP",
    "xbox-series-x": "XSX",
    "xbox-one": "XONE",
    "xbox360": "X360",
    "xbox-old": "XBOX",
    "nintendo-switch": "NSW",
    "wii-u": "WIIU",
    "wii": "WII",
    "gamecube": "GCN",
    "nintendo-64": "N64",
    "nintendo-3ds": "3DS",
    "nintendo-ds": "NDS",
    "nintendo-dsi": "DSi",
    "game-boy-advance": "GBA",
    "game-boy-color": "GBC",
    "game-boy": "GB",
    "snes": "SNES",
    "nes": "NES",
    "sega-genesis": "GEN",
    "sega-saturn": "SAT",
    "dreamcast": "DC",
    "sega-master-system": "SMS",
    "sega-game-gear": "GG",
    "sega-cd": "SCD",
    "sega-32x": "32X",
    "ios": "iOS",
    "android": "ANDR",
    "macos": "MAC",
    "linux": "LNX",
    "web": "WEB",
    "atari-2600": "2600",
    "atari-5200": "5200",
    "atari-7800": "7800",
    "atari-lynx": "LYNX",
    "jaguar": "JAG",
    "neo-geo": "NGEO",
    "commodore-amiga": "AMI",
    "3do": "3DO",
    "turbografx-16": "TG16",
};

// Defining methods for the searchController
module.exports = {
    find: function(req, res) {
        axios
            .get("https://api.rawg.io/api/games?key=" + key + "&search=" + encodeURIComponent(req.params.id) + "&search_precise=true&page_size=50")
            .then(response => {
                // Map RAWG response to match the Giant Bomb field shape
                // so the client code doesn't need to change
                const results = response.data.results.map(game => ({
                    name: game.name,
                    deck: null,
                    guid: String(game.id),
                    site_detail_url: "https://rawg.io/games/" + game.slug,
                    api_detail_url: "https://api.rawg.io/api/games/" + game.id,
                    expected_release_year: game.released ? new Date(game.released).getFullYear() : null,
                    date_last_updated: game.updated,
                    image: {
                        medium_url: game.background_image,
                        date_added: game.released
                    },
                    platforms: game.platforms ? game.platforms.map(p => ({
                        abbreviation: platformAbbreviations[p.platform.slug] || p.platform.slug.toUpperCase(),
                        name: p.platform.name
                    })) : null
                }));
                res.json(results);
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ error: "Failed to search RAWG API" });
            });
        },
    detail: function(req, res) {
        axios
            .get("https://api.rawg.io/api/games/" + req.params.id + "?key=" + key)
            .then(response => {
                res.json({ description: response.data.description_raw || null });
            })
            .catch(error => {
                console.log(error);
                res.json({ description: null });
            });
        }
  };
