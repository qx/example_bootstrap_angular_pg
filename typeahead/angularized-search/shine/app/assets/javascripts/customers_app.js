/***
 * Excerpted from "Rails, Angular, Postgres, and Bootstrap",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/dcbang for more book information.
***/
var app = angular.module("customers",[]); 

app.controller("CustomerSearchController", [ 
          "$scope","$http",
  function($scope , $http) {                         
    $scope.customers = [];
    $scope.search = function(searchTerm) {   
      $http.get("/customers.json",  
                { "params": { "keywords": searchTerm } }
      ).then(function(response) {
          $scope.customers = response.data;
      },function(response) {
          alert("There was a problem: " + response.status);
        }
      );
    }
  }
]);
