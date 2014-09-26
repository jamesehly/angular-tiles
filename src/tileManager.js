var TileManager = function() {
    this.resizing = false;
    this.resetDefaults();
};
TileManager.prototype.resetDefaults = function() {
    this.panelChildren = false;
    this.panelHeights = new Array;
    this.panelWidths = new Array;
    this.totalVerticalVariablePanels = 0;
    this.totalHorizontalVariablePanels = 0;
    this.totalVariablePanelHeight = 0;
    this.totalVariablePanelWidth = 0;
    this.currentPanel = false;
};
TileManager.prototype.getPanelChildren = function(element) {
    this.panelChildren = element.children("[sy-panel]");
    if (this.panelChildren.length > 0) {
        return true;
    }
    return false;
};
TileManager.prototype.setCurrentPanel = function(element) {
    this.currentPanel = $(element);
    this.currentPanelHeight = this.currentPanel.attr("panel-height");
    this.currentPanelWidth = this.currentPanel.attr("panel-width");
    this.currentPanelStretch = this.currentPanel.attr("panel-stretch");
    this.currentPanelHidden = this.currentPanel.attr("panel-hidden");
    if (!this.currentPanelHeight) {
        this.currentPanelHeight = "100%";
    }
    if (!this.currentPanelWidth) {
        this.currentPanelWidth = "100%";
    }
};
TileManager.prototype.loadPanelData = function() {
    var panelManager = this;
    this.panelChildren.each(function() {
        panelManager.setCurrentPanel(this);
        if (panelManager.currentPanelHidden != "true") {
            panelManager.panelHeights.push(panelManager.currentPanelHeight);
            panelManager.panelWidths.push(panelManager.currentPanelWidth);
        }
    });
};
TileManager.prototype.setTotalVariablePanelHeight = function() {
    for (var n in this.panelHeights) {
        if (this.panelHeights[n] == "100%") {
            this.totalVerticalVariablePanels += 1;
        } else {
            this.totalVariablePanelHeight -= parseInt(this.panelHeights[n]);
        }
    }
    this.totalVariablePanelHeight = this.totalVariablePanelHeight / this.totalVerticalVariablePanels;
};
TileManager.prototype.setTotalVariablePanelWidth = function() {
    for (var n in this.panelWidths) {
        if (this.panelWidths[n] == "100%") {
            this.totalHorizontalVariablePanels += 1;
        } else {
            this.totalVariablePanelWidth -= parseInt(this.panelWidths[n]);
        }
    }
    this.totalVariablePanelWidth = this.totalVariablePanelWidth / this.totalHorizontalVariablePanels;
};
TileManager.prototype.setPanelAttributes = function() {
    var panelManager = this;
    this.panelChildren.each(function() {
        panelManager.setCurrentPanel(this);
        if (!panelManager.currentPanelHeight || panelManager.currentPanelHeight == "100%") {
            panelManager.currentPanel.height(panelManager.totalVariablePanelHeight);
        }
        if (panelManager.currentPanelStretch == "horizontal") {
            if (!panelManager.currentPanelWidth || panelManager.currentPanelWidth == "100%") {
                panelManager.currentPanel.width(panelManager.totalVariablePanelWidth);
            }
            panelManager.currentPanel.height(panelManager.totalVariablePanelHeight * panelManager.totalVerticalVariablePanels);
        }
        if (panelManager.currentPanelHidden == "true") {
            panelManager.currentPanel[0].style.display = "none";
        } else {
            panelManager.currentPanel[0].style.display = "block";
        }
    });
    this.panelChildren.each(function() {
        panelManager.setCurrentPanel(this);
        panelManager.redrawChildPanels(panelManager.currentPanel);
    });
};
TileManager.prototype.redrawChildPanels = function(element) {
    this.resetDefaults();
    if (this.getPanelChildren(element)) {
        this.totalVariablePanelHeight = element.height();
        this.totalVariablePanelWidth = element.width();
        this.loadPanelData();
        this.setTotalVariablePanelHeight();
        this.setTotalVariablePanelWidth();
        this.setPanelAttributes();
    }
    this.resizing = false;
};