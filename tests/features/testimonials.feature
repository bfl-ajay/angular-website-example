Feature: Testimonials Page
  As a user
  I want to read testimonials
  So that I can understand client feedback

  Background:
    Given I navigate to the Testimonials page

  Scenario: Testimonials page displays feedback cards
    Then testimonial cards should be displayed
    And each testimonial should have content
    And at least three testimonials should be visible

  Scenario: Testimonial cards show user information
    When I view a testimonial card
    Then it should display the client name
    And it should display the client position
    And it should display the testimonial text
    And it should display a user image or avatar

  Scenario: Testimonials are properly formatted
    Then testimonials should be properly formatted
    And each testimonial should be independent
