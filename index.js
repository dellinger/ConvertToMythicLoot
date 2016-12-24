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
const NewsItem = require('./models/NewsItem');

var express = require('express');
var app = express();
app.set('views', './views');
app.set('view engine', 'pug');
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

app.listen(3000);

var CONVERT_TO_MYTHIC = ["Envin","Tattva","Rhyno","Holybee"];





