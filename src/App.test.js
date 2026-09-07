import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "./App";

beforeAll(() => {
  window.scrollTo = jest.fn();
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
  };
});
beforeEach(() => {
  window.history.replaceState({}, "", "/");
  localStorage.clear();
});

test("navigation exposes the original content and filters all eight projects", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { name: /I'M Ezhilan Chinnasamy/ }),
  ).toBeInTheDocument();
  fireEvent.click(
    within(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).getByRole("link", { name: "Projects" }),
  );
  expect(screen.getAllByRole("article")).toHaveLength(8);
  fireEvent.click(screen.getByRole("button", { name: /AI & Agents/ }));
  expect(screen.getAllByRole("article")).toHaveLength(2);
  fireEvent.change(screen.getByRole("searchbox", { name: "Search projects" }), {
    target: { value: "unknown project" },
  });
  expect(screen.getByText("No projects found.")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Reset filters" }));
  expect(screen.getAllByRole("article")).toHaveLength(8);
  fireEvent.change(screen.getByRole("searchbox", { name: "Search projects" }), {
    target: { value: "RAGAS" },
  });
  expect(screen.getAllByRole("article")).toHaveLength(1);
  expect(window.location.search).toContain("q=RAGAS");
  fireEvent.click(screen.getByRole("button", { name: "List view" }));
  expect(screen.getByRole("button", { name: "List view" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  expect(window.location.search).toContain("view=list");
});

test("theme and mobile navigation expose their current state", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Switch to dark theme" }));
  expect(document.documentElement.dataset.theme).toBe("dark");
  expect(localStorage.getItem("ez-theme")).toBe("dark");
  fireEvent.click(screen.getByRole("button", { name: "Open navigation" }));
  expect(
    screen.getByRole("button", { name: "Close navigation" }),
  ).toHaveAttribute("aria-expanded", "true");
  fireEvent.click(
    within(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).getByRole("link", { name: "About" }),
  );
  expect(
    screen.getByRole("button", { name: "Open navigation" }),
  ).toHaveAttribute("aria-expanded", "false");
  expect(screen.getByText("Professional")).toBeInTheDocument();
});

test("keyboard search navigates to a matching project and resume retains the original document", () => {
  render(<App />);
  fireEvent.keyDown(window, { key: "k", ctrlKey: true });
  const dialog = screen.getByRole("dialog");
  fireEvent.change(within(dialog).getByRole("textbox"), {
    target: { value: "Walmart" },
  });
  fireEvent.click(
    within(dialog).getByRole("link", { name: /Walmart Sales Forecasting/ }),
  );
  expect(screen.getAllByRole("article")).toHaveLength(1);
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  fireEvent.click(
    within(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).getByRole("link", { name: "Resume" }),
  );
  expect(screen.getByRole("link", { name: /Download CV/ })).toHaveAttribute(
    "download",
    "EZHILAN-CHINNASAMY-Resume.pdf",
  );
});
