@libraries=./Email connector-MDLPCNSG-2-steps
Feature: Email connector: Add sendgrid filters passthrough from datasource

  @pending
  Scenario: Pass mail_settings from datasource

    Given the sendgrid connector
    When initiated with datasource mail_settings
    Then it should be initiated without error
    And the mail_settings are made available to sendgrid

  @pending
  Scenario: Pass tracking_settings from datasource

    Given the sendgrid connector
    When initiated with datasource tracking_settings
    Then it should be initiated without error
    And the tracking_settings are made available to sendgrid
