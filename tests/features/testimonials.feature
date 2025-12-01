Feature: Testimonials Page
  As a user
  I want to read testimonials and client feedback
  So that I can understand client satisfaction and success stories

  Background:
    Given I navigate to the Testimonials page

  Scenario: Testimonials page displays section information
    Then the page should display section heading
    And the page should display testimonials title
    And the page should display testimonials description

  Scenario: Testimonials page displays feedback cards
    Then testimonial cards should be displayed
    And each testimonial should have content
    And at least three testimonials should be visible

  Scenario: Testimonial cards show complete user information
    When I view a testimonial card
    Then it should display the client name
    And it should display the client position or company
    And it should display the testimonial quote text
    And it should display a user image or avatar

  Scenario: Testimonial content is properly formatted
    When I view a testimonial card
    Then the testimonial text should be readable
    And the client information should be clearly visible
    And the quote should be properly styled
    And the user image should be visible and properly sized

  Scenario: Multiple testimonials are displayed
    Then at least three testimonials should be visible
    And testimonials should be properly formatted
    And each testimonial should be independent
    And testimonials should have consistent styling

  Scenario: Testimonials display feedback detail
    When I view each testimonial card
    Then testimonial quote should be a non-empty string
    And client name should be displayed
    And each testimonial should have at least one line of feedback

  Scenario: Testimonials page has proper layout
    Then testimonials should be arranged in a grid or carousel
    And testimonials should have proper spacing
    And all testimonials should be visible in viewport

  Scenario: Testimonials page is responsive
    When I resize the window to mobile size
    Then testimonial cards should stack vertically
    And cards should be readable on mobile devices
    And images should scale appropriately
    When I resize the window to desktop size
    Then testimonials should display in proper layout

  Scenario: Testimonials load asynchronously
    Then the page should load testimonial data from service
    And all testimonials should render successfully
    And user images should load without errors
    And no duplicate testimonials should appear
