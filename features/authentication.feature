Feature: Logging into Derp Bear

  In order to see the super secret pages
  as a visitor
  I want to Login to Derp Bear


  Scenario: Valid user login
    When I login as a valid user
    Then I should see that I am logged in


#  Scenario: Invalid user login
#    Given I visit derpbear
#    When I login
#    Then I should see the logged in message

#  Scenario: Valid user login other example
#    Given I visit derpbear
#    When I login
#    Then I should see "You are now Logged in."


#  Scenario: Invalid user login other example
#    Given I visit derpbear
#    When I login
#    Then I should see "Username or Password incorrect!"
