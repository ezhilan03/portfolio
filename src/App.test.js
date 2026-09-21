import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "./App";
jest.mock("./components/Game/arcadeRenderer", () => ({
  renderArcade: jest.fn(),
}));

beforeAll(() => {
  window.scrollTo = jest.fn();
  HTMLElement.prototype.scrollIntoView = jest.fn();
  HTMLCanvasElement.prototype.getContext = () => ({});
  global.ResizeObserver = class {
    observe() {}
    disconnect() {}
  };
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
    screen.getByRole("heading", { name: /Ezhilan Chinnasamy/ }),
  ).toBeInTheDocument();
  fireEvent.click(
    within(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).getByRole("link", { name: "Work" }),
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

test("theme persists and visible navigation reaches About", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Switch to dark theme" }));
  expect(document.documentElement.dataset.theme).toBe("dark");
  expect(localStorage.getItem("ez-theme")).toBe("dark");
  fireEvent.click(
    within(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).getByRole("link", { name: "About" }),
  );
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

test.each(["/play", "/play/", "/play/old-link"])(
  "hidden game route %s returns to the portfolio",
  async (path) => {
    window.history.replaceState({}, "", path);
    render(<App />);
    expect(
      await screen.findByRole("heading", { name: /Ezhilan Chinnasamy/ }),
    ).toBeInTheDocument();
    expect(window.location.pathname).toBe("/");
    expect(
      screen.queryByRole("link", { name: /Enter game mode/ }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/Yes, let’s play/)).not.toBeInTheDocument();
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    expect(
      within(screen.getByRole("dialog")).queryByRole("link", {
        name: /Game mode/,
      }),
    ).not.toBeInTheDocument();
  },
);

test("experience is directly reachable from another page and the optional lamp toggles", () => {
  render(<App />);
  const nav = within(
    screen.getByRole("navigation", { name: "Main navigation" }),
  );
  fireEvent.click(nav.getByRole("link", { name: "Work" }));
  fireEvent.click(nav.getByRole("link", { name: "Experience" }));
  expect(window.location.hash).toBe("#experience");
  const experience = screen.getByRole("region", { name: "Work Experience" });
  expect(within(experience).getAllByRole("article")).toHaveLength(3);
  expect(within(experience).getByText("Student Assistant")).toBeVisible();
  expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  const lamp = screen.getByRole("button", { name: "Desk lamp" });
  expect(lamp).toHaveAttribute("aria-pressed", "false");
  fireEvent.click(lamp);
  expect(lamp).toHaveAttribute("aria-pressed", "true");
});
