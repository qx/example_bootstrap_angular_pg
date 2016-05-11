/***
 * Excerpted from "Rails, Angular, Postgres, and Bootstrap",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/dcbang for more book information.
***/
describe("CustomerCreditCardController", function() {
  describe("Initialization", function() {
    var scope        = null,
        cardholderId = 42,
        cardInfo = {
               lastFour: '4321',
               cardType: 'visa',
        expirationMonth: 3,
         expirationYear: 2018,
            detailsLink: 'http://billing.example.com/foo'
        };
        
    beforeEach(module("customers"));

    beforeEach(inject(function ($controller, 
                                $rootScope, 
                                $httpBackend) {
      scope       = $rootScope.$new();
      httpBackend = $httpBackend;

      httpBackend.when(
        'GET',
        '/fake_billing.json?cardholder_id=' + cardholderId
      ).respond(cardInfo);

      controller  = $controller("CustomerCreditCardController", {
        $scope: scope
      });
    }));

    // tests will go here...


    it("does not hit the backend initially", function() {
      expect(scope.creditCard).not.toBeDefined();
    });

    it("when setCardholderId is called, hits back-end", function() {
      scope.setCardholderId(cardholderId); // (1)
      expect(scope.creditCard).toBeDefined(); // (2)
      expect(scope.creditCard.lastFour).not.toBeDefined();// (3)
      httpBackend.flush(); // (4)
      expect(scope.creditCard).toEqualData(cardInfo); // (5)
    });
  });
});
