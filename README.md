# Angular Tiles

#### The Window Tile Manager for AngularJS

Angular Tiles provides a system to easily create tiling layouts with AngularJS 
using custom tags and element attributes.

## Get Started

**(1)** Download Source or Clone and Build 
 - [download the release](https://github.com/jamesehly/angular-tiles/release/angular-tiles.js) (or [minified](https://github.com/jamesehly/angular-tiles/release/angular-tiles.min.js))
 - clone & build this repository (you're on your own for now, but basically clone and grunt dev, build or release)

**(2)** Include `angular-tiles.js` (or `angular-tiles.min.js`) in your file after including AngularJS.

**(3)** Add `'angular-tiles'` to your main module's list of dependencies

Here's an example

```html
<!doctype html>
<html ng-app="myApp">
<head>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.1.5/angular.min.js"></script>
    <script src="js/angular-tiles.min.js"></script>
    <script>
        var myApp = angular.module('myApp', ['angular-tiles']);
    </script>
</head>
<body>
    <!-- Start with an at-container (setting tile-fullscreen="false" forces the container to be it's parents dimensions) -->
    <at-container>
        <!-- then nest any number of at-tile elements -->
        <at-tile tile-height="40px">
            <div class="header">
                <h3>Angular Tiles</h3>
            </div>
        </at-tile>
        <!-- at-tile elements must be direct children of an at-container or at-tile --> 
        <at-tile tile-overflow="auto">
            <div class="content">
                ...
                Lorem Ipsum Content Here
                ...
            </div>
        </at-tile>
        <at-tile tile-height="40px">
            <div class="footer">
                <ul class="nav nav-pills nav-justified">
                    <li><i class="glyphicon glyphicon-chevron-left"></i></li>
                    <li>MENU</li>
                    <li><i class="glyphicon glyphicon-chevron-right"></i></li>
                </ul>
            </div>
        </at-tile>
    </at-container>
</body>
</html>
```

That's all for now folks!