import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
export default function GameInvitation() {
  const { pathname } = useLocation();
  const [choice, setChoice] = useState(() => {
    try {
      return localStorage.getItem("ez-game-invite");
    } catch {
      return null;
    }
  });
  const [declined, setDeclined] = useState(false);
  if (
    pathname === "/play" ||
    choice === "yes" ||
    (choice === "no" && !declined)
  )
    return null;
  const choose = (value) => {
    setChoice(value);
    try {
      localStorage.setItem("ez-game-invite", value);
    } catch {}
  };
  return (
    <aside className="game-invitation" aria-label="Interactive mode invitation">
      <div className="invitation-copy">
        <span className="invitation-spark" aria-hidden="true">
          ✦
        </span>
        <div>
          <strong>
            {declined
              ? "Boring? Maybe. Efficient? Definitely."
              : "A portfolio. Or a little adventure?"}
          </strong>
          <p>
            {declined
              ? "Enjoy the portfolio. Game mode is always in the navigation."
              : "Same human. Same work. Six levels to explore."}
          </p>
        </div>
      </div>
      <div className="invitation-actions">
        {declined ? (
          <button
            onClick={() => setDeclined(false)}
            aria-label="Dismiss game invitation"
          >
            Carry on ↗
          </button>
        ) : (
          <>
            <button
              className="invitation-no"
              onClick={() => {
                choose("no");
                setDeclined(true);
              }}
            >
              No, just browsing
            </button>
            <Link to="/play" onClick={() => choose("yes")}>
              Yes, let’s play <span aria-hidden="true">→</span>
            </Link>
          </>
        )}
      </div>
    </aside>
  );
}
