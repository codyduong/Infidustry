const speed = 8

const inserter = extendContent(Router, "inserter", {

	Router(tile.Name){
		solid = true;
		update = true;
		hasItems = true;
		itemCapacity = 1;
		group = BlockGroup.transportation;
		unloadable = false;
		entityType = RouterEntity::new;
	}

	update(Tile tile){
		var entity = tile.ent();

		if(entity.lastItem == null && entity.items.total() > 0) entity.items.clear();

		if(entity.lastItem != null){
			entity.time += 1 / speed * Time.delta();
			var target = tile.entity.proximity().get(tile.rotation()*2);

			if(target != null && (entity.time >= 1 || !(target.block() instanceof Router))){
				target.block().handleItem(entity.lastItem, target, Edges.getFacingEdge(tile, target));
				entity.items.remove(entity.lastItem, 1);
				entity.lastItem = null;
			}
		}
	},

})

