const inserter = extendContent(Router, "inserter", {
	update(tile){
		RouterEntity entity = tile.ent();

		if(entity.lastItem == null && entity.items.total() > 0){
			entity.items.clear();
		}

		if(entity.lastItem != null){
			entity.time += 1f / speed * Time.delta();
			Tile target = tile.entity.proximity().get(tile.rotation*2);

			if(target != null && (entity.time >= 1f || !(target.block() instanceof Router))){
				target.block().handleItem(entity.lastItem, target, Edges.getFacingEdge(tile, target));
				entity.items.remove(entity.lastItem, 1);
				entity.lastItem = null;
			}
		}
	}

})

