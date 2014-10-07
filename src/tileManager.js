var TileManager = function() {
    this.resizing = false;
    this.resetDefaults();
};
TileManager.prototype.resetDefaults = function() {
    this.tileChildren = false;
    this.tileHeights = new Array;
    this.tileWidths = new Array;
    this.totalVerticalVariableTiles = 0;
    this.totalHorizontalVariableTiles = 0;
    this.totalVariableTileHeight = 0;
    this.totalVariableTileWidth = 0;
    this.currentTile = false;
};
TileManager.prototype.getTileChildren = function(element) {
    this.tileChildren = element.children("at-tile, [at-tile]");
    if (this.tileChildren.length > 0) {
        return true;
    } 
    return false; 
};
TileManager.prototype.setCurrentTile = function(element) {
    this.currentTile = $(element);
    this.currentTileHeight = this.currentTile.attr("tile-height");
    this.currentTileWidth = this.currentTile.attr("tile-width");
    this.currentTileStretch = this.currentTile.attr("tile-stretch");
    this.currentTileHidden = this.currentTile.attr("tile-hidden");
    if (!this.currentTileHeight) {
        this.currentTileHeight = "100%";
    }
    if (!this.currentTileWidth) {
        this.currentTileWidth = "100%";
    }
};
TileManager.prototype.loadTileData = function() {
    var tileManager = this;
    this.tileChildren.each(function() {
        tileManager.setCurrentTile(this);
        if (tileManager.currentTileHidden != "true") {
            tileManager.tileHeights.push(tileManager.currentTileHeight);
            tileManager.tileWidths.push(tileManager.currentTileWidth);
        }
    });
};
TileManager.prototype.setTotalVariableTileHeight = function() {
    for (var n in this.tileHeights) {
        if (this.tileHeights[n].indexOf("%") > 0) {
            this.totalVerticalVariableTiles += 1;
        } else {
            this.totalVariableTileHeight -= parseInt(this.tileHeights[n]);
        }
    }
    this.totalVariableTileHeight = this.totalVariableTileHeight / this.totalVerticalVariableTiles;
};
TileManager.prototype.setTotalVariableTileWidth = function() {
    for (var n in this.tileWidths) {
        if (this.tileWidths[n].indexOf("%") > 0) {
            this.totalHorizontalVariableTiles += 1;
        } else {
            this.totalVariableTileWidth -= parseInt(this.tileWidths[n]);
        }
    }
    this.totalVariableTileWidth = this.totalVariableTileWidth / this.totalHorizontalVariableTiles;
};
TileManager.prototype.setTileAttributes = function() {
    var tileManager = this;
    this.tileChildren.each(function() {
        tileManager.setCurrentTile(this);
        if (!tileManager.currentTileHeight || tileManager.currentTileHeight == "100%") {
            tileManager.currentTile.height(tileManager.totalVariableTileHeight);
        }
        if (tileManager.currentTileStretch == "horizontal") {
            if (!tileManager.currentTileWidth || tileManager.currentTileWidth == "100%") {
                tileManager.currentTile.width(tileManager.totalVariableTileWidth);
            }
            tileManager.currentTile.height(tileManager.totalVariableTileHeight * tileManager.totalVerticalVariableTiles);
        }
        if (tileManager.currentTileHidden == "true") {
            tileManager.currentTile[0].style.display = "none";
        } else {
            tileManager.currentTile[0].style.display = "block";
        }
    });
    this.tileChildren.each(function() {
        tileManager.setCurrentTile(this);
        tileManager.redrawChildTiles(tileManager.currentTile);
    });
};
TileManager.prototype.redrawChildTiles = function(element) {
    this.resetDefaults();
    if (this.getTileChildren(element)) {
        this.totalVariableTileHeight = element.height();
        this.totalVariableTileWidth = element.width();
        this.loadTileData();
        this.setTotalVariableTileHeight();
        this.setTotalVariableTileWidth();
        this.setTileAttributes();
    }
    this.resizing = false;
};