import React, { useEffect, useState, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import Resume from "./components/Resume/ResumeNew";
import ScrollToTop from "./components/ScrollToTop";
import CommandMenu from "./components/CommandMenu";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import "./App.css";
import GameInvitation from "./components/Game/GameInvitation";
import "./components/Game/game.css";
const GameMode = lazy(() => import("./components/Game/GameMode"));
function SiteFrame({ children }) {
  const { pathname } = useLocation();
  const isGame = /^\/play\/?$/.test(pathname);
  useEffect(() => {
    if (!isGame) document.title = "EZ | Portfolio";
  }, [pathname, isGame]);
  return isGame ? (
    <Suspense
      fallback={
        <div className="game-loading" role="status">
          Loading the adventure…
        </div>
      }
    >
      <GameMode />
    </Suspense>
  ) : (
    children
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("ez-theme") || "light";
    } catch {
      return "light";
    }
  });
  const [commandOpen, setCommandOpen] = useState(false);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("ez-theme", theme);
    } catch {}
  }, [theme]);
  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <SiteFrame>
        <div className="App">
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <Navbar
            theme={theme}
            onTheme={() => setTheme(theme === "light" ? "dark" : "light")}
            onSearch={() => setCommandOpen(true)}
          />
          <GameInvitation />
          <ScrollToTop />
          <main id="main-content" tabIndex={-1}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/resume" element={<Resume />} />
              <Route
                path="*"
                element={
                  <section className="page-shell not-found">
                    <span className="eyebrow">404</span>
                    <h1>Page not found.</h1>
                    <Link className="button primary" to="/">
                      Back to Home ↗
                    </Link>
                  </section>
                }
              />
            </Routes>
          </main>
          <Footer />
          <CommandMenu
            open={commandOpen}
            onClose={() => setCommandOpen(false)}
          />
        </div>
      </SiteFrame>
    </Router>
  );
}
export default App;
