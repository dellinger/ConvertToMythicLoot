"use strict"; 
class Character {

    constructor(Context,rawMembersData) {
        this.context = Context;
        this.rank = rawMembersData.rank;
        if(rawMembersData.character) {
            this.name = rawMembersData.character.name;
            this.level = rawMembersData.character.level;
            this.class = rawMembersData.character.class;
            this.lastModified = rawMembersData.character.lastModified;
        } else {
            this.name = rawMembersData.name;
            this.level = rawMembersData.level;
            this.class = rawMembersData.class;
            this.lastModified = rawMembersData.lastModified;
        }

        if(rawMembersData.achievements){
            var achievementPoints = rawMembersData.achievementPoints;
            var achievementList = rawMembersData.achievements.criteria;
            var quantityList = rawMembersData.achievements.criteriaQuantity;
            
            var key1 = achievementList.indexOf(30103);
            var key2 = achievementList.indexOf(29395);
            this.artifactPower = quantityList[key1];
            this.artifactLevel = quantityList[key2];
        }
        this.metadata = {
            chartBackgroundColor : 'rgba(255, 99, 132, 0.2)',
            chartBorderColor : 'rgba(255,99,132,1)'
        }
        
    }
    static CharacterFactory(Context,rawMembersData) {
        let characters = [];
        for(var member in rawMembersData) {
            characters.push(new Character(Context,rawMembersData[member]));
        }
        if(characters.length === 0) {
            console.warn("Did you forget to add 'members' to the api call?");
        }
        return characters;    
    }
}  
module.exports = Character;