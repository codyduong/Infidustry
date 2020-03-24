public class Tile getTileOutput(Tile tile, Item item, Tile from, boolean set){
	Array<Tile> proximity = tile.entity.proximity();
	int counter = tile.rotation();
	Tile other = proximity.get(counter*2);
	return other;
}
/*
Tile getTileTarget(Tile tile, Item item, Tile from, boolean set){
    Array<Tile> proximity = tile.entity.proximity();
    int counter = tile.rotation();
    Tile other = proximity.get(counter*2);
    return other;
    //this is the old router code for getTileTarget.
    /*
    for(int i = 0; i < proximity.size; i++){
        if(set) tile.rotation((byte)((tile.rotation() + 1) % proximity.size));
        if(other == from && from.block() == Blocks.overflowGate) continue;
        if(other.block().acceptItem(item, other, Edges.getFacingEdge(tile, other))){
            return other;
        }
    }
}
*/

public class InserterEntity extends TileEntity{
	Item lastItem;
	Tile lastInput;
	float time;
}

const inserter = extendContent(Router, "inserter", {
	super(name);

	draw(Tile tile){
	Draw.rect(region, tile.drawx(), tile.drawy(), 0);
	Draw.rect(arrow, tile.drawx(), tile.drawy(), rotate ? tile.rotation() * 90 : 0);
	}

	update(Tile tile){
		InserterEntity entity = tile.ent();

		if(entity.lastItem == null && entity.items.total() > 0){
			entity.items.clear();
		}

		if(entity.lastItem != null){
			entity.time += 1f / speed * Time.delta();
			Tile target = getTileOutput(tile, entity.lastItem, entity.lastInput, false);

			if(target != null && (entity.time >= 1f || !(target.block() instanceof Router))){
				getTileOutput(tile, entity.lastItem, entity.lastInput, true);
				target.block().handleItem(entity.lastItem, target, Edges.getFacingEdge(tile, target));
				entity.items.remove(entity.lastItem, 1);
				entity.lastItem = null;
			}
		}
	}

})

