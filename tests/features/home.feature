Feature: Home Page
  As a visitor
  I want to view the home page
  So that I can understand the website purpose

  Background:
    Given I navigate to the home page

  Scenario: Home page displays hero banner
    Then the hero banner should be visible
    And the header title should be displayed
    And the header description should be displayed

  Scenario: Home page displays footer
    When I scroll to the bottom of the page
    Then the footer should be visible
    And the footer should contain copyright information

  Scenario: Home page has social media links
    When I scroll to the footer section
    Then social media icons should be displayed
    And at least two social media links should be present
