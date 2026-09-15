import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import OrganizationLoginPage from "../pages/OrganizationLoginPage";

const mockMutateAsync = vi.fn();
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../hooks/useLogin", () => ({
  useLogin: () => ({
    mutateAsync: mockMutateAsync,
    isPending: false,
  }),
}));

describe("OrganizationLoginPage", () => {
  it("should submit the login form", async () => {
    render(
      <BrowserRouter>
        <OrganizationLoginPage />
      </BrowserRouter>
    );

    const user = userEvent.setup();

    await user.type(
      screen.getByPlaceholderText(/admin@company.com/i),
      "admin@test.com"
    );

    await user.type(
      screen.getByPlaceholderText(/enter your password/i),
      "Password@123"
    );

    await user.click(
      screen.getByRole("button", {
        name: /continue to workspace/i,
      })
    );

    expect(mockMutateAsync).toHaveBeenCalledWith({
      email: "admin@test.com",
      password: "Password@123",
      loginType: "organization",
    });

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });
});