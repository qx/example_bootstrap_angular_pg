/***
 * Excerpted from "Rails, Angular, Postgres, and Bootstrap",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/dcbang for more book information.
***/
var app = angular.module('customers');
app.controller("CustomerSearchController", [
          '$scope','$location', "customerSearch",
  function($scope , $location ,  customerSearch) {                         

    $scope.customers = [];
    customerSearch.successCallback(function(customers) {
      $scope.customers = customers;
    });

    $scope.search       = customerSearch.search
    $scope.previousPage = customerSearch.previousPage;
    $scope.nextPage     = customerSearch.nextPage;

    $scope.viewDetails = function(customer) {
      $location.path("/" + customer.id);
    }
  }
]);

