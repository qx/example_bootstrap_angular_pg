/***
 * Excerpted from "Rails, Angular, Postgres, and Bootstrap",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/dcbang for more book information.
***/
var app = angular.module(
  'customers',
  [
    'ngRoute',
    'ngResource',
    'templates'
  ]
); 
app.config([
          "$routeProvider",
  function($routeProvider) {
    $routeProvider.when("/", {
       controller: "CustomerSearchController",
      templateUrl: "customer_search.html"
    }).when("/:id",{
       controller: "CustomerDetailController",
      templateUrl: "customer_detail.html",
    });
  }
]);

app.controller("CustomerSearchController", [ 
          '$scope','$http','$location',
  function($scope , $http , $location) {                         

    var page = 0;

    $scope.customers = [];
    $scope.search = function(searchTerm) {   
      $scope.loading = true;
      if (searchTerm.length < 3) {
        return;
      }
      $http.get("/customers.json",  
                { "params": { "keywords": searchTerm, "page": page } }
      ).success(
        function(data,status,headers,config) { 
          $scope.customers = data;
          $scope.loading = false;
      }).error(
        function(data,status,headers,config) {
          $scope.loading = false;
          alert("There was a problem: " + status);
        });
    }

    $scope.previousPage = function() {
      if (page > 0) {
        page = page - 1;
        $scope.search($scope.keywords);
      }
    }
    $scope.nextPage = function() {
      page = page + 1;
      $scope.search($scope.keywords);
    }

    $scope.viewDetails = function(customer) {
      $location.path("/" + customer.id);
    }
  }
]);

app.controller("CustomerDetailController", [ 
          "$scope","$routeParams","$resource",
  function($scope , $routeParams , $resource) {
    $scope.customerId = $routeParams.id;
    var Customer = $resource('/customers/:customerId.json')

    $scope.customer = Customer.get({ "customerId": $scope.customerId})

    // rest of the controller...


    $scope.customer.billingSameAsShipping = false;
    $scope.$watch('customer.billing_address_id',function() {
      $scope.customer.billingSameAsShipping = 
        $scope.customer.billing_address_id == 
          $scope.customer.shipping_address_id;
    });

    $scope.save = function() {
      window.blah = $scope.form;
      if ($scope.form.email.$valid) {
        alert("Email is valid");
      } else if ($scope.form.email.$error.required) {
        alert("Email is required");
      } else if ($scope.form.email.$error.email) {
        alert("Email must look like an email");
      }
    }
  }
]);

app.controller("CustomerCreditCardController", [ 
          "$scope","$resource",
  function($scope , $resource) {
    var CreditCardInfo = $resource('/fake_billing.json')
    $scope.setCardholderId = function(cardholderId) {
      $scope.creditCard = CreditCardInfo.get(
        { "cardholder_id": cardholderId}
      )
    }
  }
]);
