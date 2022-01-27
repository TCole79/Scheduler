/* eslint-disable no-undef */
describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset/");
    cy.visit("/");
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    //Add the command to the test that clicks the add button for the empty appointment. Remember that cy.get() allows arguments that match the jQuery API.
    cy.get("[alt=Add]").first().click();

    // Add the command to type the name "Lydia Miller-Jones" into the student input field.
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    // Add the command to select the interviewer with the name "Sylvia Palmer".
    cy.get("[alt='Sylvia Palmer']").click();

    // Add the command to click the save button.
    cy.contains("Save").click();

    // Add the commands that verify that we show the student and interviewer names within an element that has the ".appointment__card--show" class.
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    cy.get("[alt=Edit]").first().click({ force: true });

    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    // Add the command to click the delete button.
    cy.get("[alt=Delete]").click({ force: true });

    // Add the command to click the confirm button.
    cy.contains("Confirm").click();

    // First check that the "Deleting" indicator should exist. Cypress will make sure that we show the "Deleting" indicator before moving to the next command.
    cy.contains("Deleting").should("exist");
    // Then check that the "Deleting" indicator should not exist. Cypress will keep checking until we remove the indicator, or reach a timeout. In this case, it waits until we remove the indicator to move on.
    cy.contains("Deleting").should("not.exist");
    // Last check that the ".appointment__card--show" element that contains the text "Archie Cohen" should not exist.
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
