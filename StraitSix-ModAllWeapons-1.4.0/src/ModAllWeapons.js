exports.mod = (mod_data) => {
	logger.logInfo(`[MOD] ${mod_data.name}`);
	let ItemsData = fileIO.parse(fileIO.read(db.user.cache.items));
	var consolelog = "";	

	for(let itemId in ItemsData.data){
		var item = ItemsData.data[itemId];
			//logger.logInfo(JSON.stringify(item));
		if (typeof item._props.RaidModdable != "undefined"){
			item._props.RaidModdable = true
		}

		if (typeof item._props.ToolModdable != "undefined"){
			item._props.ToolModdable = true
		}

		if (typeof item._props.Slots == "undefined") 
			continue;

		for(let slot of item._props.Slots){
			if(typeof slot._required == "undefined") 
				continue;
			if (slot._name.toLowerCase().includes("barrel") || 
				slot._name.toLowerCase().includes("pistol_grip") || 
				slot._name.toLowerCase().includes("pistolgrip") || 
				slot._name.toLowerCase().includes("reciever") || 
				slot._name.toLowerCase().includes("charge"))
				//item._parent === ("55818a304bdc2db5418b457d")) 
				continue;
			if(slot._required == true){
				slot._required = false;

				consolelog += slot._name + "Item now moddable\n";
			}
		}
	}
	fileIO.write(`user/mods/${mod_data.author}-${mod_data.name}-${mod_data.version}/logs/console.log`, consolelog);
	fileIO.write(db.user.cache.items,ItemsData);
	logger.logSuccess(`[MOD] ${mod_data.name}; Applied`);	
}