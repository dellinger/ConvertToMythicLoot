"use strict"; 
const Character = require('./Character');
const NewsItem = require('./NewsItem');
class Guild {
    
    constructor(Context,GuildData) {
        this.context = Context;
        this.achievementPoints = GuildData.achievementPoints;
        this.battleGroup = GuildData.battleGroup;
        this.lastModified = GuildData.lastModified;
        this.characters = Character.CharacterFactory(Context,GuildData.members);
        this.name = GuildData.name;
        this.realm = GuildData.realm;
        this.news = NewsItem.NewsItemFactory(GuildData.news);
    }

}
module.exports = Guild;