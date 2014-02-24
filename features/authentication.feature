Feature: Logging into Derp Bear

  In order to see the super secret pages
  as a visitor
  I want to Login to Derp Bear


  Scenario: Valid user login
    When I login as a valid user
    Then I should see that I am logged in

  Scenario: Successfully submit form after login
  Given I login as a valid user
  When I submit the basic form example
  Then I should see the thank you message


#  Scenario: Invalid user login other example
#    Given I visit derpbear
#    When I login
#    Then I should see "Username or Password incorrect!"
