#---
# Excerpted from "Rails, Angular, Postgres, and Bootstrap",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit http://www.pragmaticprogrammer.com/titles/dcbang for more book information.
#---
require 'rails_helper'

describe FakeBillingController do
  describe "#show" do
    context "json" do
      context "with cardholder_id" do
        before do
          get :show, cardholder_id: "234234234"
          @parsed_response = JSON.parse(response.body)
        end
        specify { expect(@parsed_response["lastFour"]).to_not eq(nil) }
        specify { expect(@parsed_response["cardType"]).to_not eq(nil) }
        specify { expect(@parsed_response["expirationMonth"]).to_not eq(nil) }
        specify { expect(@parsed_response["expirationYear"]).to_not eq(nil) }
        specify { expect(@parsed_response["detailsLink"]).to_not eq(nil) }
      end
      context "without cardholder_id" do
        before do
          get :show
        end
        specify { expect(response.code).to eq("404") }
      end
    end
  end
end
