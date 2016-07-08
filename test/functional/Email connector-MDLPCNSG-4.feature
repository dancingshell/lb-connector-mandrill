Feature: Email connector: Add sendgrid options passthrough from datasource

  @pending
  Scenario: Pass options from datasource

    Given the sendgrid connector
    When initiated with datasource options
    Then it should be initiated without error
    And the options are made available to sendgrid
