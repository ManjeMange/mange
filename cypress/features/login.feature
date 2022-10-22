Feature: Log In

  Background:
    Given the user "Megan" exists with:
      | email     | login_test_11@example.com  |
      | password  | Test_user_p@ssword1     |

  Scenario: Signing in
    Given I am on the "/login" page
    When I fill out the form with:
      | email     | login_test_11@example.com  |
      | password  | Test_user_p@ssword1       |
    And I submit the form
    Then I should be signed in
    And I should be on the "/" page

  Scenario: Signing in with incorrect credentials
    Given I am on the "/login" page
    When I fill out the form with:
      | email     | test@example.com      |
      | password  | some_very_wrong_pass  |
    And I submit the form
    Then I should not be signed in
    And I should see a log in error

