/***
 * Excerpted from "Rails, Angular, Postgres, and Bootstrap",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/dcbang for more book information.
***/
var app = angular.module('customers');
app.controller("CustomerDetailController", [
          "$scope","$routeParams","$resource",
  function($scope , $routeParams , $resource) {
    $scope.customerId = $routeParams.id;
    var Customer = $resource('/customers/:customerId.json',
                             {"customerId": "@customer_id"},
                             { "save": { "method": "PUT" }});
    $scope.customer = Customer.get({ "customerId": $scope.customerId})



    $scope.customer.billingSameAsShipping = false;
    $scope.$watch('customer.billing_address_id',function() {
      $scope.customer.billingSameAsShipping = 
        $scope.customer.billing_address_id == 
          $scope.customer.shipping_address_id;
    });

    $scope.save = function() {
      if ($scope.form.$valid) {
        $scope.customer.$save(
          function() {
            $scope.form.$setPristine();
            $scope.form.$setUntouched();
            alert("Save Successful!");
          },
          function() {
            alert("Save Failed :(");
          }
        );
      }
    }
  }
]);
