#---
# Excerpted from "Rails, Angular, Postgres, and Bootstrap",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit http://www.pragmaticprogrammer.com/titles/dcbang for more book information.
#---
class FakeBillingController < ApplicationController
  skip_before_action :authenticate_user!
  def show
    if params[:cardholder_id]
      #sleep 3
      render json: {
               lastFour: Faker::Business.credit_card_number[-4..-1],
               cardType: Faker::Business.credit_card_type,
        expirationMonth: Faker::Business.credit_card_expiry_date.month,
         expirationYear: Faker::Business.credit_card_expiry_date.year,
            detailsLink: Faker::Internet.url,
      }
    else
      head :not_found
    end
  end
end
