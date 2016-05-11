#---
# Excerpted from "Rails, Angular, Postgres, and Bootstrap",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit http://www.pragmaticprogrammer.com/titles/dcbang for more book information.
#---
class CustomerDetail < ActiveRecord::Base
  self.primary_key = 'customer_id'

  def credit_card_token
    self.customer_id % 1000
  end
  def serializable_hash(options=nil)
    super(options).merge(credit_card_token: credit_card_token)
  end
end
