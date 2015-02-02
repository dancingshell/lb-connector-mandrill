Feature: Email connector: Add an loopback connector for sending emails from SendGrid

  Scenario: SendGrid init with invalid properties

    Given the sendgrid connector
    When initiated without the correct properties
    Then it should throw an error

  Scenario: SendGrid init with valid properties

    Given the sendgrid connector
    When initiated with the correct properties
    Then it should be initiated without error

  Scenario: Sending an email from Email.send

    Given the sendgrid connector
    When initiated with the correct properties
    And called using the method Email.send
    Then it should send the email

  Scenario: Sending an email from Email.prototype.send

    Given the sendgrid connector
    When initiated with the correct properties
    And called using the method Email.prototype.send
    Then it should send the email
