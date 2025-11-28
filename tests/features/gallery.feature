Feature: Gallery Page
  As a user
  I want to view the gallery
  So that I can see the work and projects

  Scenario: Gallery page displays images
    Given I navigate to the Gallery page
    Then gallery images should be loaded
    And at least one image should be visible

  Scenario: Gallery images are clickable
    Given I navigate to the Gallery page
    When I click on a gallery image
    Then the image should be displayed in a larger view
    And navigation controls should be available

  Scenario: Gallery supports lightbox view
    Given I navigate to the Gallery page
    When I click on an image
    Then a lightbox should open
    And I should be able to navigate between images
    And I should be able to close the lightbox

  Scenario: Gallery is responsive
    Given I navigate to the Gallery page with mobile viewport
    Then images should be displayed in a responsive grid
    And images should be properly scaled on mobile
