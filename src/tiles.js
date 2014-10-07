/*jshint globalstrict:true*/
/*global angular:false*/

"use strict";

angular.module("angular-tiles", []);

var $angularTileDirective = function() {
    return {
        restrict: 'AE',
        scope: {
            tileHeight: "@",
            tileOverflow: "@",
            tileStretch: "@",
            tileWidth: "@",
            tilelHidden: "@",
            tilelClose: "="

        },
        link: function(scope, element) {

            if (!scope.tileHeight) {
                scope.tileHeight = "100%";
            }
            if (!scope.tileWidth) {
                scope.tileWidth = "100%";
            }
            if (!scope.tileOverflow) {
                scope.tileOverflow = "hidden";
            }
            if (!scope.tileStretch) {
                scope.tileStretch = "vertical";
            }

            if (scope.tileHidden === "true") {
                element[0].style.display = "none";
            } else {
                element[0].style.display = "block";
            }
            if (scope.tileStretch === "horizontal") {
                element[0].style.cssFloat = "left";
            }

            scope.$watch("tileClose", function() {
                element.attr("tile-hidden", scope.tileClose);
                $(window).resize();
            });
            element[0].style.overflow = scope.tileOverflow;
            element.height(scope.tileHeight);
            element.width(scope.tileWidth);
        }
    };
};

var $angularTileContainerDirective = {};
$angularTileContainerDirective.$inject = ["$window"];
var $angularTileContainerDirective = function($window) {

    var resize = function() {

    }

    return {
        restrict: 'AE',
        scope: {
            tileFullscreen: "@"
        },
        link: function(scope, element) {
            var tileManager = new TileManager(element);
            var windowElement = $($window);
            var timer = null, longtimer = null;

            if (scope.tileFullscreen === "false") {
                windowElement = element.parent();
            }
            element.height(windowElement.height());
            element.width(windowElement.width());
            element[0].style.overflow = "hidden";
            element[0].style.display = "block";

            // De-bouncing this using setTimout
            $($window).on("resize", function() {
                clearInterval(timer);
                // this timer is for visual feedback
                timer = setTimeout(function() {
                    element.height(windowElement.height());
                    element.width(windowElement.width());
                    tileManager.redrawChildTiles(element);
                }, 100);
                // this timer is for cleanup
                clearInterval(longtimer);
                longtimer = setTimeout(function() {
                    element.height(windowElement.height());
                    element.width(windowElement.width());
                    tileManager.redrawChildTiles(element);
                }, 1000);
            });
            $($window).resize();

        }
    };
};

angular.module("angular-tiles")
        .directive("atTile", $angularTileDirective)
        .directive("atContainer", $angularTileContainerDirective);