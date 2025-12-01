Feature: Services Page
  As a user
  I want to view available services
  So that I can understand what services are offered and make informed decisions

  Background:
    Given I navigate to the Services page

  Scenario: Services page displays complete information section
    Then the page should display section heading
    And the section should display tagline
    And the section should display main title
    And the section should display description

  Scenario: Services page displays service details with testimonial
    Then the page should display a testimonial section
    And the testimonial should contain customer quote
    And the testimonial should display customer information
    And there should be descriptive content about services

  Scenario: Services page has video content
    Then the page should have a video link
    And the video link should have an icon
    And clicking the video link should open video player

  Scenario: Services page displays promotional image
    Then the page should display service-related image
    And the image should be properly loaded
    And the image should be responsive

  Scenario: Services page has complete layout
    When I scroll through the page
    Then testimonial section should be visible
    And services content should be visible
    And video content should be accessible
    And images should be properly aligned

  Scenario: Services page is responsive
    When I resize the window to mobile size
    Then testimonial should be visible on mobile
    And content should be readable on mobile
    When I resize the window to desktop size
    Then layout should display in multi-column format

  Scenario: Services page loads asynchronously
    Then the page should load service configuration data
    And all content should render without errors
    And page should be fully interactive
