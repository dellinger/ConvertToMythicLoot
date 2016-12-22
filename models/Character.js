"use strict"; 
class Character {
    constructor(Context,rawMembersData) {
        this.context = Context;
        this.rank = rawMembersData.rank;
        if(!rawMembersData.character) {
            throw new Error("Something not quite right");
        }
        this.name = rawMembersData.character.name;
        this.level = rawMembersData.character.level;
        this.class = rawMembersData.character.class;
        this.lastModified = rawMembersData.character.lastModified;
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