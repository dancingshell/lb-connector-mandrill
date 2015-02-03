@libraries=./Email connector-MDLPCNSG-2-steps
Feature: Email connector: Add sendgrid filters passthrough from datasource

  Scenario: Pass filters from datasource

    Given the sendgrid connector
    When initiated with datasource filters
    Then it should be initiated without error
    And the filters are made available to sendgrid
