# == Schema Information
#
# Table name: users
#
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#

#---
# Excerpted from "Rails, Angular, Postgres, and Bootstrap",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit http://www.pragmaticprogrammer.com/titles/dcbang for more book information.
#---
require 'rails_helper'
require 'support/violate_check_constraint_matcher'

describe User do
  describe "email" do

    # ... rest of the test
    
    let(:user) { 
      User.create!(email: "foo@example.com", 
                   password: "qwertyuiop", 
                   password_confirmation: "qwertyuiop")
    }
    it "absolutely prevents invalid email addresses" do
      expect {
        user.update_attribute(:email, "foo@bar.com")
      }.to violate_check_constraint(:email_must_be_company_email)
    end
  end
end
