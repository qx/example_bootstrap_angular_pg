/***
 * Excerpted from "Rails, Angular, Postgres, and Bootstrap",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/dcbang for more book information.
***/
var app = angular.module('customers');
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

