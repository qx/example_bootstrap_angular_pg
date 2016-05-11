#---
# Excerpted from "Rails, Angular, Postgres, and Bootstrap",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit http://www.pragmaticprogrammer.com/titles/dcbang for more book information.
#---
class CustomerDetail < ActiveRecord::Base
  # rest of the class...
  self.primary_key = 'customer_id'

  def credit_card_token
    self.customer_id % 1000
  end
  def serializable_hash(options=nil)
    super(options).merge(credit_card_token: credit_card_token)
  end

  def update(params)
    Customer.find(self.customer_id).update(
      params.permit(:first_name, :last_name, :username, :email))

    Address.find(self.billing_address_id).update(
      address_attributes(params,"billing"))

    Address.find(self.shipping_address_id).update(
      address_attributes(params, "shipping"))
  end

private
  def address_attributes(params, type)
    {
       street: params["#{type}_street"],
         city: params["#{type}_city"],
        state: State.find_by_code(params["#{type}_state"]),
      zipcode: params["#{type}_zipcode"],
    }
  end
end
