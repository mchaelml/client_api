/*global angular  */

/* we 'inject' the ngRoute module into our app. This makes the routing functionality to be available to our app. */
var myApp = angular.module('myApp', ['ngRoute'])

/* the config function takes an array. */
myApp.config( ['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/search', {
		  templateUrl: 'templates/search.html',
      controller: 'searchController'
		})
    .when('/detail/:id/:volumeInfo', {
      templateUrl: 'templates/detail.html',
      controller: 'detailController'
    })
    .when('/favourites', {
		  templateUrl: 'templates/favourites.html',
      controller: 'favouritesController'
		})
		.when('/recent', {
		  templateUrl: 'templates/test.html',
      controller: 'testController'
		})
		.otherwise({
		  redirectTo: 'search'
		})
	}])


myApp.controller('searchController', function($scope, $http) {
  $scope.message = 'This is the search screen'
  $scope.search = function($event) {
    console.log('search()')
    if ($event.which == 13) { // enter key presses
      var search = $scope.searchTerm
      console.log(search)
      var url = 'https://www.googleapis.com/books/v1/volumes?maxResults=40&fields=items(id,volumeInfo(title))&q='+search
      $http.get(url).success(function(response) {
        console.log(response)
        $scope.books = response.items
        $scope.searchTerm = ''
      })
    }
  }
})

myApp.controller('detailController', function($scope, $routeParams) {
  $scope.message = 'This is the detail screen'
  $scope.id = $routeParams.id
  $scope.title = $routeParams.volumeInfo
  console.log($scope.title)
  //$scope.stuff = {
    //id : $scope.id,
    //title : $scope.title
  //}
  $scope.stuff = {
    id : $routeParams.id,
    title : $routeParams.volumeInfo
  }
  console.log("stuff:"+$scope.stuff)
  $scope.addToFavourites = function(stuff) {
    console.log('adding: '+stuff+' to favourites.')
    localStorage.setItem('stuff',stuff)
  }
  //$scope.addToFavourites = function(id) {
    //console.log('adding: '+id+' to favourites.')
    //localStorage.setItem(id,id)
  //}
  //$scope.addToFavourites = function(title) {
    //console.log('adding: '+title+' to favourites.')
    //localStorage.setItem(title, title)
  //}
})

myApp.controller('testController', function($scope, $routeParams) {
  $scope.message = 'This is the test'
  $scope.id = $routeParams.id
 
  
})
 
myApp.controller('favouritesController', function($scope) {
  console.log('fav controller')
  $scope.message = 'This is the favourites screen'
  //$scope.delete = function(book) {
    //console.log('deleting id '+book)
    //$scope.books.splice($scope.toRemove,1);
    //$scope.toRemove = null;
    //localStorage.removeItem(book)
  //}
  $scope.delete = function(book) {
    //$scope.books.splice($scope.toRemove, 1);
    //$scope.toRemove = null;
    localStorage.removeItem(book)
    
  };
  var init = function() {
    console.log('getting books')
    var items = Array()
    console.log(localStorage)
    for (var a in localStorage) {
      console.log("a:"+a)
      
      items.push(localStorage[a])
      
    }
    console.log($scope.books)
    $scope.books = items
  }
  init()
})
