"use strict"; 
class Item {
    constructor(context,rawData) {
        this.context = context;
        this.armor = rawData.armor;
        this.artifactId = rawData.artifactId;
        this.availableContexts = rawData.availableContexts;
        this.baseArmor = rawData.baseArmor;
        this.bonusLists = rawData.bonusLists;
        this.bonusStats = rawData.bonusStats;
        this.bonusSummary = rawData.bonusSummary;
        this.buyPrice = rawData.buyPrice;
        this.containerSlots = rawData.containerSlots;
        this.context = rawData.context;
        this.description = rawData.description;
        this.displayInfoId = rawData.displayInfoId;
        this.equippable = rawData.equippable;
        this.hasSockets = rawData.hasSockets;
        this.icon = rawData.icon;
        this.id = rawData.id;
        this.inventoryType = rawData.inventoryType;
        this.itemClass = rawData.itemClass;
        this.itemLevel = rawData.itemLevel;
        this.itemSource = rawData.itemSource;
        this.name = rawData.name;
        this.quality = rawData.quality;
    }

    getItems(itemId, bonuses) {
        return this.context.wow.item({ id: itemId, origin: 'us' });
    }

}
module.exports = Item;