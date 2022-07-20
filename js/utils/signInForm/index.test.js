/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { getByTestId, getByRole, getByLabelText } from "@testing-library/dom";

// gestion des Events
import userEvent from "@testing-library/user-event";
import { handleSignInForm } from "./index.js";
import SignInPage from "../../pages/signIn/index.js";

beforeEach(() => {
  // console.log("++ On monte le DOM avant chaque tests");
  document.body.innerHTML = SignInPage.render();
  // on ajoute les events lié a la page
  handleSignInForm();
});

afterEach(() => {
  // console.log("** On démonte le DOM après chaque tests");
  document.body.innerHTML = "";
});

describe("SignInForm Integration test", () => {
  /**--------**/
  it("On doit afficher un message d'erreur quand l'e-mail n'est as correct", () => {
    // Simule les events
    // de type clavier
    userEvent.type(
      // la valeur du label
      getByLabelText(document.body, "Votre addresse e-mail"),
      "thoma@truc.fr",
    );
    // de type souris
    userEvent.click(
      // le role sur le bouton
      getByRole(document.body, "button"),
    );
    // toHaveClass fait partie de jest-dom
    expect(getByTestId(document.body, "user-email-error-msg")).not.toHaveClass(
      "hidden",
    );
  });

  /**--------**/
  it("On doit afficher un message d'erreur quand l'e-mail est valide mais que le MDP n'est pas rempli", () => {
    // Simule les events
    // de type clavier
    userEvent.type(
      // la valeur du label
      getByLabelText(document.body, "Votre addresse e-mail"),
      "thomas@facadia.com",
    );

    // de type souris
    userEvent.click(
      // le role sur le bouton
      getByRole(document.body, "button"),
    );

    // toHaveClass fait partie de jest-dom
    expect(getByTestId(document.body, "user-email-error-msg")).toHaveClass(
      "hidden",
    );

    expect(
      getByTestId(document.body, "user-password-error-msg"),
    ).not.toHaveClass("hidden");
  });

  /**--------**/
  it("On doit afficher un message d'erreur quand le mot de passe est incorrect", () => {
    // email
    userEvent.type(
      getByLabelText(document.body, "Votre addresse e-mail"),
      "thomas@facadia.com",
    );
    // event sur le label
    // MDP
    userEvent.type(
      getByLabelText(document.body, "Votre mot de passe"),
      "wrongpassword",
    );
    // event sur le click du bouton
    userEvent.click(getByRole(document.body, "button"));

    expect(
      getByTestId(document.body, "user-password-error-msg"),
    ).not.toHaveClass("hidden");
  });

  /**-------------**/
  it("Pas de messages d'erreur si l'email et le MDP sont correct", () => {
    // Simule les events
    // de type clavier
    userEvent.type(
      // la valeur du label
      getByLabelText(document.body, "Votre addresse e-mail"),
      "thomas@facadia.com",
    );
    userEvent.type(
      getByLabelText(document.body, "Votre mot de passe"),
      "azerty",
    );
    // de type souris
    userEvent.click(
      // le role sur le bouton
      getByRole(document.body, "button"),
    );
    // email
    expect(getByTestId(document.body, "user-email-error-msg")).toHaveClass(
      "hidden",
    );
    // MDP
    expect(getByTestId(document.body, "user-email-error-msg")).toHaveClass(
      "hidden",
    );
  });
});
