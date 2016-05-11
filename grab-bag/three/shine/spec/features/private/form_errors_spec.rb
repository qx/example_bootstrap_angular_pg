#---
# Excerpted from "Rails, Angular, Postgres, and Bootstrap",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit http://www.pragmaticprogrammer.com/titles/dcbang for more book information.
#---
require 'rails_helper'

feature "Form Errors" do
  include SignUpAndLogin

  scenario "Form errors demo in bootstrap" do
    sign_up_and_log_in
    visit "/bootstrap_demo"
    screenshot! filename: "bootstrap-form-errors.png", selector: ".form-error"
  end
end
