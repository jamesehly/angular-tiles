/// <reference path="_references.js" />
/// <reference path="..\..\Sycorr.WebFrontend\Assets\js\sycorr\syWebFrontend.js" />
/// <reference path="..\..\Sycorr.WebFrontend\Assets\js\sycorr\syPanel.js" />

describe("Angular Tile Tests", function () {

    describe("SycorrPanel Directive Defaults Tests", function () {

        var element, scope, compile, compiledElement, iscope;

        beforeEach(function () {
            module("SycorrWebFrontend");
        });

        beforeEach(
            inject(function ($compile, $rootScope) {
                scope = $rootScope.$new();
                compile = $compile;
                element = angular.element("<div sy-panel></div>");
                compiledElement = compile(element)(scope);
            }));

        it("should have a scope defined", function () {
            expect(element.isolateScope()).toBeDefined();
        });

        it("should have 100% width", function () {
            expect(element.css("width")).toBe("100%");
        });

        it("should have css overflow property set to hidden", function() {
            expect(element[0].style.overflow).toBe("hidden");
        });
    });

    describe("SycorrPanel Directive Custom Options Tests", function () {

        var element, scope, compile, compiledElement;

        beforeEach(function () {
            module("SycorrWebFrontend");
        });

        beforeEach(
            inject(function ($compile, $rootScope) {
                scope = $rootScope.$new();
                compile = $compile;
                element = angular.element("<div sy-panel panel-hidden='true' panel-stretch='horizontal' panel-height='50px' panel-overflow='auto'></div>");
                compiledElement = compile(element)(scope);
                scope.$digest();
            }));

        it("should have a scope defined", function () {
            expect(element.scope()).toBeDefined();
        });

        it("should have 100% width", function () {
            expect(element.width()).toBe(100);
        });

        it("should have overflow set to auto", function () {
            expect(element[0].style.overflow).toBe("auto");
        });

        it("should set scope.panelHidden to true", function () {
            expect(element.isolateScope().panelHidden).toBeDefined();
            expect(element.isolateScope().panelHidden).toBe("true");
        });

        it("should have set scope.panelHeight to 50px and element height should be 50px", function () {
            expect(element.isolateScope().panelHeight).toBeDefined();
            expect(element.isolateScope().panelHeight).toBe("50px");
            expect(element.css("height")).toBe("50px");
        });

        it("should set scope.panelStretch to horizontal", function () {
            expect(element.isolateScope().panelStretch).toBeDefined();
            expect(element.isolateScope().panelStretch).toBe("horizontal");
        });

        it("should set css float property to left", function () {
            expect(element[0].style.float).toBe("left");
        });
    });

    describe("SycorrPanelContainer Directive Tests", function () {

        var element, scope, compile, compiledElement, window;

        beforeEach(function () {
            module("SycorrWebFrontend");
        });

        beforeEach(
            inject(function ($compile, $rootScope, $window) {
                scope = $rootScope.$new();
                compile = $compile;
                element = angular.element("<div sy-panel-container><div sy-panel></div><div sy-panel></div></div>");
                compiledElement = compile(element)(scope);
                scope.$digest();
                window = $window;
            }));

        it("should have a scope defined", function () {
            expect(element.scope()).toBeDefined();
        });

        it("panel container width should equal the window width", function () {
            expect(element.width()).toBe(window.innerWidth);
        });

        it("panel container width should equal the container element width", function () {
            var container = angular.element("<div style='width:1111px'></div>");
            var thisElement = angular.element("<div sy-panel-container panel-fullscreen='false'><div sy-panel></div><div sy-panel></div></div>");
            thisElement.appendTo(container);
            compile(thisElement)(scope);
            expect(thisElement.width()).toBe(container.width());
        });

        it("should have css overflow property set to hidden", function () {
            expect(element[0].style.overflow).toBe("hidden");
        });
    });

    describe("SycorrPanelManager Object Tests", function() {

        var panelManager, element;

        beforeEach(function() {
            panelManager = new SycorrPanelManager();
            element = angular.element("<div sy-panel-container ><div sy-panel></div><div sy-panel></div></div>");
        });

        it("should have resizing set to false", function() {
            expect(panelManager.resizing).toBeFalsy();
        });

        it("should find sy-panel child elements", function() {
            expect(panelManager.getPanelChildren(element)).toBeTruthy();
            expect(panelManager.panelChildren.length).toBe(2);
        });

        it("should not find sy-panel child elements if they are not there", function () {
            expect(panelManager.getPanelChildren(angular.element("<div sy-panel></div>"))).toBeFalsy();
            expect(panelManager.panelChildren.length).toBe(0);
        });

        it("should set the current panel and it's attributes: defaults", function() {
            panelManager.setCurrentPanel(angular.element("<div sy-panel></div>"));
            expect(panelManager.currentPanel.length).toBe(1);
            expect(panelManager.currentPanelHeight).toBe("100%");
            expect(panelManager.currentPanelWidth).toBe("100%");
            expect(panelManager.currentPanelStretch).toBeFalsy();
            expect(panelManager.currentPanelHidden).toBeFalsy();
        });

        it("should set the current panel and it's attributes: custom", function () {
            panelManager.setCurrentPanel(angular.element("<div sy-panel panel-height='100px' panel-width='100px' panel-stretch='horizontal' panel-hidden='true'></div>"));
            expect(panelManager.currentPanel.length).toBe(1);
            expect(panelManager.currentPanelHeight).toBe("100px");
            expect(panelManager.currentPanelWidth).toBe("100px");
            expect(panelManager.currentPanelStretch).toBe("horizontal");
            expect(panelManager.currentPanelHidden).toBe("true");
        });

        it("should populate the panel heights array when loadPanelData is called: default data", function () {
            var thisElement = angular.element("<div sy-panel-container style='height:1000px;width:1000px'><div sy-panel></div><div sy-panel></div></div>");
            panelManager.getPanelChildren(thisElement);
            panelManager.loadPanelData();
            expect(panelManager.panelHeights).toEqual(['100%', '100%']);
            expect(panelManager.panelWidths).toEqual(['100%', '100%']);
        });

        it("should populate the panel heights array when loadPanelData is called: custom data", function () {
            var thisElement = angular.element("<div sy-panel-container style='height:1000px;width:1000px'><div sy-panel panel-height='100px'></div><div sy-panel panel-width='100px'></div></div>");
            panelManager.getPanelChildren(thisElement);
            panelManager.loadPanelData();
            expect(panelManager.panelHeights).toEqual(['100px', '100%']);
            expect(panelManager.panelWidths).toEqual(['100%', '100px']);
        });

        it("should figure the totalVariablePanelHeight and totalVariablePanelWidth", function () {
            var thisElement = angular.element("<div sy-panel-container style='height:1000px;width:1000px'><div sy-panel panel-height='100px'></div><div sy-panel panel-width='100px'></div></div>");
            thisElement.appendTo('body');
            panelManager.getPanelChildren(thisElement);
            panelManager.totalVariablePanelHeight = thisElement.height();
            panelManager.totalVariablePanelWidth = thisElement.width();
            panelManager.loadPanelData();
            panelManager.setTotalVariablePanelHeight();
            panelManager.setTotalVariablePanelWidth();
            expect(thisElement.height()).toEqual(1000);
            expect(thisElement.width()).toEqual(1000);
            expect(panelManager.totalVariablePanelHeight).toEqual(900);
            expect(panelManager.totalVariablePanelWidth).toEqual(900);
        });

        it("should figure the totalVariablePanelHeight and totalVariablePanelWidth more complex", function () {
            var thisElement = angular.element("<div sy-panel-container style='height:1000px;width:1000px'><div sy-panel panel-height='100px'></div><div sy-panel panel-width='100px'></div><div sy-panel panel-height='100px'></div><div sy-panel panel-width='100px'></div></div>");
            thisElement.appendTo('body');
            panelManager.getPanelChildren(thisElement);
            panelManager.totalVariablePanelHeight = thisElement.height();
            panelManager.totalVariablePanelWidth = thisElement.width();
            panelManager.loadPanelData();
            panelManager.setTotalVariablePanelHeight();
            panelManager.setTotalVariablePanelWidth();
            expect(thisElement.height()).toEqual(1000);
            expect(thisElement.width()).toEqual(1000);
            expect(panelManager.totalVariablePanelHeight).toEqual(400);
            expect(panelManager.totalVariablePanelWidth).toEqual(400);
        });

        it("should close a panel if panel-hidden is set to 'true'", function() {
            var thisElement = angular.element("<div sy-panel-container style='height:1000px;width:1000px'><div id='panel1' panel-stretch='horizontal' panel-width='100px' sy-panel panel-hidden='true'></div><div id='panel2' panel-stretch='horizontal' sy-panel></div></div>");
            thisElement.appendTo('body');
            panelManager.redrawChildPanels(thisElement);
            var panel1 = thisElement.find("#panel1");
            var panel2 = thisElement.find("#panel2");
            expect(panel1[0].style.display).toBe("none");
            expect(panel2.width()).toBe(1000);
        });

        it("should close a panel if panel-hidden is set to 'true' after initial load", function () {
            var thisElement = angular.element("<div sy-panel-container style='height:1000px;width:1000px'><div id='panel1' panel-stretch='horizontal' sy-panel></div><div id='panel2' panel-stretch='horizontal' sy-panel></div></div>");
            thisElement.appendTo('body');
            panelManager.redrawChildPanels(thisElement);
            var panel1 = thisElement.find("#panel1");
            var panel2 = thisElement.find("#panel2");
            expect(panel1[0].style.display).toBe("block");
            expect(panel2[0].style.display).toBe("block");
            expect(panel2.width()).toBe(500);
            panel2.attr("panel-hidden", true);
            panelManager.redrawChildPanels(thisElement);
            expect(panel1[0].style.display).toBe("block");
            expect(panel2[0].style.display).toBe("none");
            expect(panel1.width()).toBe(1000);
        });
    });
})
