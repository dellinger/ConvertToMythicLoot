"use strict";
const moment = require('moment');
class NewsItem {
    constructor(rawData) {
        this.characterName = rawData.character;
        this.context = rawData.context;
        this.itemId = rawData.itemId; //TODO: instantiate actual item
        this.bonusLists = rawData.bonusLists;
        this.timestamp = rawData.timestamp;
        this.type = rawData.type;
        this.friendlyDate = moment(this.timestamp).format("dddd, MMMM Do YYYY, h:mm:ss a");
    }
    static NewsItemFactory(rawData) {
        let newsItems = [];
        for(var index in rawData) {
            newsItems.push(new NewsItem(rawData[index]));
        }
        return newsItems;    
    }
}
module.exports = NewsItem;