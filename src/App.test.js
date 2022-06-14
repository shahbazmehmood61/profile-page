import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Signup from "./Pages/Signup";
import Forgot from "./Pages/ForgotPassword";

describe("Run App", () => {
  test("render signup with given fields", () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    const linkElement = screen.getByText(/Register/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("render signup with given fields", () => {
    render(
      <BrowserRouter>
        <Forgot />
      </BrowserRouter>
    );
    ["Name", "Email", "Password", "Role"].map((label) => {
      const labelText = screen.getByText(label);
      expect(labelText).toBeInTheDocument();
    });
  });
});
