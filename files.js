var files = {
  src: [
    'src/tiles.js',
    'src/tileManager.js',
  ],
  testUtils: [
     'test/testUtils.js'
  ],
  test: [
    'test/*Spec.js'
  ],
  angular: function(version) {
    return [
      'lib/angular-' + version + '/angular.js',
      'lib/angular-' + version + '/angular-mocks.js'
    ].concat(['1.2.14', '1.3.0-rc.1'].indexOf(version) !== -1 ? ['lib/angular-' + version + '/angular-animate.js'] : []);
  }
};

if (exports) {
  exports.files = files;
}