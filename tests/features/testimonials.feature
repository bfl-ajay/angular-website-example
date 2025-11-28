Feature: Testimonials Page
  As a user
  I want to read testimonials
  So that I can understand client feedback and success stories

  Scenario: Testimonials page displays feedback
    Given I navigate to the Testimonials page
    Then testimonial cards should be displayed
    And each testimonial should have content

  Scenario: Testimonial cards show user information
    Given I navigate to the Testimonials page
    When I view a testimonial card
    Then it should display the client name
    And it should display the client position
    And it should display the testimonial text
    And it should display a user image or avatar

  Scenario: Multiple testimonials are displayed
    Given I navigate to the Testimonials page
    Then at least two testimonials should be visible
    And testimonials should be properly formatted

  Scenario: Testimonials page is responsive
    Given I navigate to the Testimonials page with mobile viewport
    Then testimonial cards should stack vertically
    And cards should be readable on mobile devices
