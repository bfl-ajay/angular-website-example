Feature: Clients Page
  As a user
  I want to view client and company information
  So that I can see who the company works with and build trust

  Background:
    Given I navigate to the Clients page

  Scenario: Clients page displays introduction section
    Then the page should display section heading
    And the section should display company description
    And introduction content should be properly formatted

  Scenario: Clients page displays company logos grid
    Then company logos should be displayed
    And at least three company logos should be visible
    And logos should be arranged in a grid layout

  Scenario: Client company blocks have complete information
    When I view the clients section
    Then each company block should have a logo
    And each company block should display company name
    And each company block should be interactive

  Scenario: Client company overlay appears on hover
    When I hover over a company logo
    Then the company name overlay should appear
    And the overlay should display company information

  Scenario: Client companies are linked
    When I click on a company logo
    Then the company link should be clickable
    And the link should navigate to company website

  Scenario: Clients page displays multiple companies
    Then at least three client companies should be displayed
    And each client should have proper formatting
    And all clients should be visible in viewport

  Scenario: Clients page is responsive
    When I resize the window to mobile size
    Then client logos should be responsive
    And logos should stack appropriately on mobile
    And company information should be readable
    When I resize the window to desktop size
    Then logos should display in proper grid format

  Scenario: Clients page loads asynchronously
    Then the page should load company data from service
    And all company logos should render successfully
    And no broken images should be displayed
