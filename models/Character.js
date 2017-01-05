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
        }

        
        if(rawMembersData.achievements){
            var achievementPoints = rawMembersData.achievementPoints;
            var achievementList = rawMembersData.achievements.criteria;
            var quantityList = rawMembersData.achievements.criteriaQuantity;
            
            var key1 = this.achievementList.indexOf(30103);
            var key2 = this.achievementList.indexOf(29395);
            this.artifactPower = this.quantityList[key1];
            this.artifactLevel = this.quantityList[key2];
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