Feature: Gallery Page
  As a user
  I want to view the gallery
  So that I can see projects, work samples, and portfolio items

  Background:
    Given I navigate to the Gallery page

  Scenario: Gallery page displays image grid
    Then gallery images should be loaded
    And at least three images should be visible
    And images should be arranged in a grid layout

  Scenario: Gallery images have proper attributes
    Then each gallery image should have valid source
    And each gallery image should have descriptive alt text
    And all images should be properly sized

  Scenario: Gallery supports lightbox view for images
    When I click on a gallery image
    Then a lightbox should open
    And the clicked image should be displayed enlarged
    And lightbox navigation controls should be visible

  Scenario: Gallery lightbox navigation works
    When I click on a gallery image
    And the lightbox opens
    Then I should be able to navigate to next image
    And I should be able to navigate to previous image
    And I should be able to close the lightbox with close button

  Scenario: Gallery lightbox keyboard navigation
    When I click on a gallery image
    And the lightbox opens
    Then pressing next button should display next image
    And pressing previous button should display previous image

  Scenario: Gallery page is responsive
    When I resize the window to mobile size
    Then gallery images should be displayed in responsive grid
    And images should be properly scaled on mobile
    When I resize the window to desktop size
    Then gallery layout should display properly

  Scenario: Gallery images load asynchronously
    Then the page should load gallery images from service
    And all images should render without errors
    And gallery section should be properly scrolled into view
