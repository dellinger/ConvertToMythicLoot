// What do I want to do?

// TEAM LOOT

// MVP
// 1) Go through a list of each character in the guild. 
// 2) Check to see if they are a raid member (take from an array of members)
// 3) If they are, store their character information away (not all -- only name and last on date for now)
// 4) Check to see if we can get a list of the loot for the guild.
// 5) iterate over the past 7 days (if possible) and print out loot that raid members received.



"use strict"; 
require('dotenv').config()
const blizzard = require('blizzard.js').initialize({ apikey: process.env.BATTLENET_API_KEY });
const Guild = require('./models/Guild');
const Character = require('./models/Character');
const NewsItem = require('./models/NewsItem');
const Promise = require('bluebird');

var express = require('express');
var app = express();
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'))
// blizzard.wow.character(['profile','audit'], { origin: 'us', realm: 'aerie-peak', name: 'Envin' })
//   .then(response => {
//     console.log(response.data);
//   });


app.get('/', function (req, res) {
  blizzard.wow.guild(['members','news'], { realm: 'aerie-peak', name: 'Convert to Raid Azuregos', origin: 'us' })
    .then(response => {
      var guildData = new Guild(blizzard,response.data);
      console.log(`${guildData.name}\n`);
      console.log(`Member Count: ${guildData.characters.length}`);
      var log = [];
      for (var index in NewsItem.NewsItemFactory(guildData.news)) {
          var news = guildData.news[index];
          if(CONVERT_TO_MYTHIC.indexOf(news.characterName) > -1) {
             // console.log("We have news");
             // console.log(`${news.characterName} received item ${news.itemId} on ${news.friendlyDate}`)
             //log.push(`${news.characterName} received item ${news.itemId} on ${news.friendlyDate}`);
             log.push(news);
          }
      }
      res.render('index', { title: "Convert to Mythic Loot Drops", message: `Number of Guildies: ${guildData.characters.length}`, news: log});
  });
});

app.get('/artifact', function(req,res) {
    Promise.map(CONVERT_TO_MYTHIC,retrieveRaidCharacterInformation).then(function(results) {
        console.log("Something");
        //Pass in a data object for chartjs
        var orderedArtifactPowerList = results.map(char => {return char.artifactPower});
        var orderedArtifactLevelList = results.map(char => {return char.artifactLevel});
        var orderedLabels = results.map(char => {return "\'" + char.name + "\'"});
        var backgroundColorChart = results.map(char => {
            //TODO: Logic for class color
            return "\'rgba(255, 99, 132, 0.2)\'";
        })
        var borderColor = results.map(char => {
            //TODO: Logic for class color
            return "\'rgba(255, 99, 132, 1)\'";
        });

        results.sort((a,b) => {
            return a.artifactPower > b.artifactPower;
        });

        //TODO: Create a scoreboard like page with that sorted data.

        res.render('artifact', { title: "Convert to Mythic Artifact",
             characters: results,
             orderedArtifactPowerList: [orderedArtifactPowerList],
             orderedLabels: [orderedLabels],
             backgroundColorChart : [backgroundColorChart],
             borderColor : [borderColor]
        });
    }, function(err){
       console.log("Bad");
    });

   
});

//TODO: Move this into a different file
function retrieveRaidCharacterInformation(name) {
   return new Promise( (resolve,reject) => {
      blizzard.wow.character(['profile', 'achievements'], { realm: 'aerie-peak', name: name, origin: 'us' })
        .then(response => {
            console.log(`Retrieved char info for ${name}`);
            var characterData = new Character(blizzard,response.data);
            resolve(characterData);
    }, err => {
        console.log(`Couldn't retrieve ${name}`);
        reject("What??");
    });
  });
}

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

var CONVERT_TO_MYTHIC = ["Envin",
                        "Tattva",
                        "Rhyno",
                        "Holybee",
                        "Tovo",
                        "Krabpeople",
                        "Pasha",
                        "Theory",
                        "Ciphervex",
                        "Howland",
                        "Shealani",
                        "Lateraius",
                        "Dumpsterdan",
                        "Kavoc",
                        "Kleptik",
                        "Repans",
                        "Lucos",
                        "Tandcrumpets",
                        "Dellkin",
                        "Locryn",
                        "Nhato",
                        "Millari"
                        ];





