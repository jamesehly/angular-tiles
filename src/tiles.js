/*jshint globalstrict:true*/
/*global angular:false*/

"use strict";

angular.module("angular-tiles", []);

var $angularTileDirective = function() { 
    return {
        restrict: 'AE',
        scope: {
            panelHeight: "@",
            panelOverflow: "@",
            panelStretch: "@",
            panelWidth: "@",  
            panelHidden: "@",
            panelClose: "="

        },
        link: function(scope, element) {

            if (!scope.panelHeight) {
                scope.panelHeight = "100%";
            }
            if (!scope.panelWidth) {
                scope.panelWidth = "100%";
            }
            if (!scope.panelOverflow) {
                scope.panelOverflow = "hidden";
            }
            if (!scope.panelStretch) {
                scope.panelStretch = "vertical";
            }

            if (scope.panelHidden === "true") {
                element[0].style.display = "none";
            }
            if (scope.panelStretch === "horizontal") {
                element[0].style.cssFloat = "left";
            } 

            scope.$watch("panelClose", function() {
                element.attr("panel-hidden", scope.panelClose);
                $(window).resize();
            });
            element[0].style.overflow = scope.panelOverflow;
            element.height(scope.panelHeight);
            element.width(scope.panelWidth);
        }
    };
};

var $angularTileContainerDirective = function() {
    return {
        restrict: 'AE',
        scope: {
            panelFullscreen: "@"
        },
        link: function(scope, element) {
            var panelManager = new TileManager(element);
            var windowElement = $($window);
            if (scope.panelFullscreen === "false") {
                windowElement = element.parent();
            }
            element.height(windowElement.height());
            element.width(windowElement.width());
            element[0].style.overflow = "hidden";
            // De-bouncing this using $timeout and resize event
            $($window).on("resize", function() {
                if (!panelManager.resizing) {
                    panelManager.resizing = true;
                    $timeout(function() {
                        element.height(windowElement.height());
                        element.width(windowElement.width());
                        panelManager.redrawChildPanels(element);
                    }, 100);
                }
            });
            $($window).resize();
        }
    };
};

angular.module("angular-tiles")
        .directive("atTile", $angularTileDirective)
        .directive("atContainer", $angularTileContainerDirective);