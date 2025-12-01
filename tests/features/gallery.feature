Feature: Gallery Page
  As a user
  I want to view the gallery
  So that I can see projects and portfolio items

  Background:
    Given I navigate to the Gallery page

  Scenario: Gallery page displays images
    Then gallery images should be loaded
    And at least three images should be visible

  Scenario: Gallery images are clickable
    When I click on a gallery image
    Then a lightbox should open
    And I should be able to close the lightbox

  Scenario: Gallery images have proper attributes
    Then each gallery image should have valid source
    And each gallery image should have descriptive alt text
