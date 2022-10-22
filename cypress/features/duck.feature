Feature: Login
  Scenario: Visiting the login page
    When I visit "/login"
    Then I should see "Sign in to your account"
