import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUp,
  FiVolume2,
  FiVolumeX,
  FiPause,
  FiBookOpen,
  FiMaximize,
  FiX,
  FiZap,
  FiTarget,
} from "react-icons/fi";
import { ArcadeEngine } from "./arcadeEngine";
import { renderArcade } from "./arcadeRenderer";
import { missions, records, readSave } from "./arcadeData";
import portrait from "../../Assets/Game/characters.png";
import "./arcade.css";

const keys = {
  ArrowLeft: "left",
  KeyA: "left",
  ArrowRight: "right",
  KeyD: "right",
  ArrowUp: "up",
  KeyW: "up",
  Space: "jump",
  KeyK: "jump",
  KeyJ: "fire",
  KeyX: "fire",
  ShiftLeft: "dash",
  ShiftRight: "dash",
  KeyL: "dash",
};
const emptyHud = {
  stage: 0,
  hp: 6,
  maxHp: 6,
  score: 0,
  progress: 0,
  weapon: 1,
  boss: null,
  dashReady: true,
  records: 0,
};

function Sound() {
  let context;
  const notes = {
    shot: [150, 0.035, "square", 0.025],
    jump: [400, 0.11, "triangle", 0.08],
    dash: [200, 0.1, "sawtooth", 0.035],
    kill: [95, 0.09, "sawtooth", 0.055],
    hurt: [65, 0.19, "sawtooth", 0.08],
    discovery: [780, 0.25, "triangle", 0.1],
    upgrade: [550, 0.2, "square", 0.035],
    health: [680, 0.15, "triangle", 0.08],
    checkpoint: [880, 0.25, "triangle", 0.09],
    bossShot: [80, 0.12, "sawtooth", 0.02],
    bossDefeated: [180, 0.45, "triangle", 0.1],
  };
  return {
    unlock() {
      const C = window.AudioContext || window.webkitAudioContext;
      if (C && !context) context = new C();
      context?.resume().catch(() => {});
    },
    play(type) {
      if (!context || context.state !== "running" || !notes[type]) return;
      const [frequency, duration, wave, volume] = notes[type],
        osc = context.createOscillator(),
        gain = context.createGain();
      osc.type = wave;
      osc.frequency.setValueAtTime(frequency, context.currentTime);
      osc.frequency.exponentialRampToValueAtTime(
        Math.max(25, frequency * 0.45),
        context.currentTime + duration,
      );
      gain.gain.setValueAtTime(volume, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        context.currentTime + duration,
      );
      osc.connect(gain);
      gain.connect(context.destination);
      osc.start();
      osc.stop(context.currentTime + duration);
    },
    close() {
      context?.close().catch(() => {});
    },
  };
}

export default function GameMode() {
  const canvas = useRef(null),
    arena = useRef(null),
    engine = useRef(null),
    audio = useRef(null),
    eventHandler = useRef(null),
    screenRef = useRef("title"),
    mutedRef = useRef(false),
    returnScreen = useRef("paused"),
    dialog = useRef(null);
  const [screen, setScreen] = useState("title");
  const [save, setSave] = useState(readSave);
  const [hud, setHud] = useState(emptyHud);
  const [assist, setAssist] = useState(false);
  const [muted, setMuted] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [unsupported, setUnsupported] = useState(false);
  const mission = missions[hud.stage];
  screenRef.current = screen;
  mutedRef.current = muted;
  const changeScreen = (value) => {
    screenRef.current = value;
    setScreen(value);
  };
  const persist = (patch) =>
    setSave((previous) => {
      const next =
        typeof patch === "function"
          ? patch(previous)
          : { ...previous, ...patch };
      try {
        localStorage.setItem(
          "ez-arcade-v1",
          JSON.stringify({ ...next, version: 1 }),
        );
      } catch {}
      return next;
    });
  eventHandler.current = (event) => {
    if (!mutedRef.current) audio.current?.play(event.type);
    if (event.type === "stage")
      persist({ stage: event.stage, checkpoint: event.checkpoint, won: false });
    if (event.type === "discovery") {
      const record = records.find((r) => r.id === event.id);
      persist((previous) => ({
        ...previous,
        records: [...new Set([...previous.records, event.id])],
      }));
      setToast({ title: record.title, text: record.subtitle, intel: true });
    }
    if (event.type === "checkpoint") {
      persist({ checkpoint: true });
      setToast({
        title: "Checkpoint restored",
        text: "Health refilled. Your next attempt starts here.",
      });
    }
    if (event.type === "upgrade")
      setToast({
        title: "Spread shot online",
        text: "Three shots. Same unlimited ammo. Hold fire.",
      });
    if (event.type === "health")
      setToast({ title: "Field repair", text: "+3 health. Keep going." });
    if (event.type === "boss")
      setToast({
        title: "Incoming: " + missions[engine.current?.stage || 0].boss,
        text: "Jump over the shots. Dash through danger. Keep firing.",
      });
    if (event.type === "bossDefeated")
      setToast({
        title: "Boss down. Gate open.",
        text: "Reach the glowing exit on the right.",
      });
    if (event.type === "death") changeScreen("dead");
    if (event.type === "cleared" || event.type === "won") {
      persist((previous) => ({
        ...previous,
        stage: event.type === "won" ? 2 : event.stage + 1,
        checkpoint: false,
        won: event.type === "won",
        best: Math.max(previous.best, event.score),
      }));
      changeScreen(event.type);
      setToast(null);
    }
  };
  useEffect(() => {
    document.title = "After Hours · A playable portfolio by Ezhilan";
    const c = canvas.current,
      context = c?.getContext("2d", { alpha: false });
    if (!context) {
      setUnsupported(true);
      return;
    }
    audio.current = Sound();
    engine.current = new ArcadeEngine();
    engine.current.state = "title";
    const resize = () => {
      c.width = arena.current.clientWidth < 620 ? 640 : 960;
      c.height = 540;
      engine.current.viewWidth = c.width;
    };
    const observer = new ResizeObserver(resize);
    observer.observe(arena.current);
    resize();
    let frame,
      previous = performance.now(),
      accumulator = 0,
      lastHud = 0;
    const tick = (now) => {
      accumulator += Math.min(0.06, (now - previous) / 1000);
      previous = now;
      const g = engine.current;
      while (accumulator >= 1 / 120) {
        g.step(1 / 120);
        accumulator -= 1 / 120;
      }
      g.reducedMotion = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      renderArcade(context, g, now / 1000);
      if (now - lastHud > 100) {
        setHud(g.snapshot());
        lastHud = now;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const loseFocus = () => {
      engine.current.clearInput();
      if (screenRef.current === "playing") {
        engine.current.pause();
        changeScreen("paused");
      }
    };
    const visibility = () => {
      if (document.hidden) loseFocus();
    };
    const down = (e) => {
      if (
        e.target.closest?.("button,a,input,select,textarea") &&
        e.code === "Space"
      )
        return;
      const action = keys[e.code];
      if (action && screenRef.current === "playing") {
        e.preventDefault();
        engine.current.setInput(action, true);
      }
      if ((e.code === "Escape" || e.code === "KeyP") && !e.repeat) {
        e.preventDefault();
        if (screenRef.current === "playing") {
          engine.current.pause();
          changeScreen("paused");
        } else if (screenRef.current === "paused") {
          engine.current.resume();
          changeScreen("playing");
          canvas.current.focus();
        }
      }
      if (e.code === "KeyE" && screenRef.current === "playing") {
        e.preventDefault();
        engine.current.pause();
        returnScreen.current = "playing";
        changeScreen("codex");
      }
    };
    const up = (e) => {
      if (keys[e.code]) engine.current.setInput(keys[e.code], false);
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", loseFocus);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      audio.current?.close();
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", loseFocus);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 6500);
    return () => clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    if (screen === "codex") {
      if (dialog.current && !dialog.current.open) dialog.current.showModal();
    } else if (dialog.current?.open) dialog.current.close();
  }, [screen]);
  const begin = (continuing = false) => {
    audio.current?.unlock();
    const g = new ArcadeEngine({
      stage: continuing ? save.stage : 0,
      checkpoint: continuing ? save.checkpoint : false,
      assist,
      discovered: save.records,
      onEvent: (event) => eventHandler.current(event),
    });
    g.viewWidth = canvas.current.width;
    engine.current = g;
    setHud(g.snapshot());
    setToast(null);
    changeScreen("playing");
    canvas.current.focus();
  };
  const pause = () => {
    engine.current.pause();
    changeScreen("paused");
  };
  const resume = () => {
    engine.current.resume();
    changeScreen("playing");
    canvas.current.focus();
  };
  const journal = () => {
    returnScreen.current = screen;
    engine.current?.pause();
    setSelectedRecord(null);
    changeScreen("codex");
  };
  const closeJournal = () => {
    if (returnScreen.current === "playing") resume();
    else changeScreen(returnScreen.current);
  };
  const retry = () => {
    engine.current.retry();
    setToast(null);
    changeScreen("playing");
    canvas.current.focus();
  };
  const next = () => {
    engine.current.next();
    setHud(engine.current.snapshot());
    changeScreen("playing");
    canvas.current.focus();
  };
  const touch = (key, down, e) => {
    e.preventDefault();
    if (down) {
      e.currentTarget.setPointerCapture(e.pointerId);
      canvas.current.focus();
    }
    engine.current?.setInput(key, down);
  };
  const touchButton = (key, label, child, extra = "") => (
    <button
      className={`arc-touch ${extra}`}
      aria-label={label}
      onPointerDown={(e) => touch(key, true, e)}
      onPointerUp={(e) => touch(key, false, e)}
      onPointerCancel={(e) => touch(key, false, e)}
      onLostPointerCapture={() => engine.current?.setInput(key, false)}
    >
      {child}
    </button>
  );
  const fullScreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await arena.current.requestFullscreen();
    } catch {
      setToast({
        title: "Ready to play",
        text: "Your browser can play here. Turn your phone sideways for a wider view.",
      });
    }
  };
  const currentRecord = records.find((r) => r.id === selectedRecord);
  const active = screen === "playing";
  const archived = records.filter((r) => save.records.includes(r.id));
  const entry = currentRecord || archived[0];
  return (
    <div className="arcade-root">
      <header className="arcade-header">
        <Link
          to="/"
          className="arcade-brand"
          aria-label="Exit game to portfolio"
        >
          ez<span>AFTER HOURS</span>
        </Link>
        <span className="arcade-credit">A PLAYABLE PORTFOLIO</span>
        <div className="arcade-tools">
          <button
            onClick={journal}
            aria-label={`Open field notes, ${save.records.length} discoveries`}
          >
            <FiBookOpen />
            <span>Field notes</span>
            <b>{save.records.length}/11</b>
          </button>
          <button
            onClick={() => {
              audio.current?.unlock();
              setMuted(!muted);
            }}
            aria-label={muted ? "Turn sound on" : "Mute sound"}
          >
            {muted ? <FiVolumeX /> : <FiVolume2 />}
          </button>
          <Link to="/" className="arcade-exit" aria-label="Exit game">
            Exit <FiX />
          </Link>
        </div>
      </header>
      <main className="arcade-main">
        <div className="arcade-machine" ref={arena}>
          <div className="arcade-hud">
            <div className="hud-player">
              <span className="hud-label">
                EZ / {String(hud.stage + 1).padStart(2, "0")}
              </span>
              <span
                className="hud-health"
                aria-label={`Health ${hud.hp} of ${hud.maxHp}`}
              >
                {Array.from({ length: hud.maxHp }, (_, i) => (
                  <i key={i} className={i < hud.hp ? "filled" : ""} />
                ))}
              </span>
            </div>
            <div className="hud-mission">
              <strong>{mission.name}</strong>
              <span>{String(hud.progress).padStart(2, "0")}% explored</span>
            </div>
            <div className="hud-score">
              <span className="hud-label">SCORE</span>
              <strong>{String(hud.score).padStart(6, "0")}</strong>
            </div>
            <button
              onClick={
                active ? pause : screen === "paused" ? resume : fullScreen
              }
              aria-label={
                active
                  ? "Pause game"
                  : screen === "paused"
                    ? "Resume game"
                    : "Expand game"
              }
            >
              {active ? (
                <FiPause />
              ) : screen === "paused" ? (
                <FiArrowRight />
              ) : (
                <FiMaximize />
              )}
            </button>
          </div>
          <div className="arcade-scene">
            <canvas
              ref={canvas}
              width="960"
              height="540"
              tabIndex="0"
              aria-label="After Hours action platformer. Move with A and D or arrow keys. Double jump with Space. Shoot with J. Dash with Shift. Press P to pause or E for field notes."
            />
            {unsupported && (
              <div className="arcade-overlay">
                <h1>This browser can’t draw the game.</h1>
                <p>Open this page in a browser with Canvas support.</p>
                <Link to="/">Back to portfolio</Link>
              </div>
            )}
            {screen === "title" && !unsupported && (
              <section className="arcade-title">
                <div className="title-copy">
                  <span className="arcade-eyebrow">
                    EZHILAN CHINNASAMY PRESENTS
                  </span>
                  <h1>
                    AFTER
                    <br />
                    <span>HOURS</span>
                    <i>↗</i>
                  </h1>
                  <p>
                    The workday is over.
                    <br />
                    The real adventure starts here.
                  </p>
                  <div className="arcade-start-actions">
                    <button
                      className="arc-primary"
                      onClick={() => begin(false)}
                    >
                      Start adventure <FiArrowRight />
                    </button>
                    {(save.stage > 0 || save.checkpoint) && !save.won && (
                      <button
                        className="arc-secondary"
                        onClick={() => begin(true)}
                      >
                        Continue · Stage {save.stage + 1}
                      </button>
                    )}
                  </div>
                  <label className="assist-setting">
                    <input
                      type="checkbox"
                      checked={assist}
                      onChange={(e) => setAssist(e.target.checked)}
                    />
                    Explorer assist{" "}
                    <span>More health. Slower enemy shots.</span>
                  </label>
                </div>
                <div className="title-mission">
                  <span>01 / CLOUD RUINS</span>
                  <strong>
                    Run. Jump.
                    <br />
                    Shoot. Discover.
                  </strong>
                  <p>3 stages · 3 bosses · 11 hidden signals</p>
                </div>
              </section>
            )}
            {active && (
              <>
                {hud.boss !== null && (
                  <div className="arc-boss-health">
                    <span>{mission.boss}</span>
                    <progress
                      max="100"
                      value={hud.boss}
                      aria-label="Boss health"
                    />
                  </div>
                )}
                {toast && (
                  <div
                    className={`arc-toast ${toast.intel ? "intel" : ""}`}
                    role="status"
                  >
                    <span>{toast.intel ? "SIGNAL RECOVERED" : "RADIO"}</span>
                    <strong>{toast.title}</strong>
                    <p>{toast.text}</p>
                    {toast.intel && (
                      <button onClick={journal}>
                        Read later in field notes <FiBookOpen />
                      </button>
                    )}
                  </div>
                )}
                <div className="arc-weapon">
                  <FiTarget />
                  {hud.weapon === 2 ? "SPREAD SHOT" : "PULSE RIFLE"}
                  <span>∞</span>
                  <b className={hud.dashReady ? "ready" : ""}>
                    {hud.dashReady ? "DASH READY" : "RECHARGING"}
                  </b>
                </div>
              </>
            )}
            {screen === "paused" && (
              <section className="arcade-overlay">
                <span className="arcade-eyebrow">TAKE A BREATHER</span>
                <h1>Signal paused.</h1>
                <p>The world can wait.</p>
                <button className="arc-primary" onClick={resume}>
                  Back to the action <FiArrowRight />
                </button>
                <div className="arc-overlay-links">
                  <button onClick={journal}>Read field notes</button>
                  <button onClick={retry}>Restart checkpoint</button>
                </div>
              </section>
            )}
            {screen === "dead" && (
              <section className="arcade-overlay">
                <span className="arcade-eyebrow">YOU’RE STILL IN THIS</span>
                <h1>Signal lost.</h1>
                <p>
                  Every good run has a second attempt.
                  <br />
                  {engine.current?.checkpoint
                    ? "Your checkpoint is safe."
                    : "Try a double jump or dash through incoming fire."}
                </p>
                <button className="arc-primary" onClick={retry}>
                  Retry checkpoint <FiArrowRight />
                </button>
                <button
                  className="arc-text-button"
                  onClick={() => {
                    engine.current.assist = true;
                    setAssist(true);
                    retry();
                  }}
                >
                  Retry with explorer assist
                </button>
              </section>
            )}
            {screen === "cleared" && (
              <section className="arcade-overlay arc-cleared">
                <span className="arcade-eyebrow">
                  STAGE {hud.stage + 1} COMPLETE
                </span>
                <h1>Signal restored.</h1>
                <p>
                  {mission.character.company}
                  <br />
                  <strong>{mission.character.role}</strong>
                </p>
                <div className="arc-evolution">
                  <div
                    style={{
                      backgroundImage: `url(${portrait})`,
                      backgroundPosition: `${(hud.stage + 1) * 50}% center`,
                    }}
                  />
                  <span>
                    NEXT CHAPTER
                    <strong>{missions[Math.min(2, hud.stage + 1)].name}</strong>
                    <small>Your character evolves. A new stage awaits.</small>
                  </span>
                </div>
                <button className="arc-primary" onClick={next}>
                  Enter stage {hud.stage + 2} <FiArrowRight />
                </button>
              </section>
            )}
            {screen === "won" && (
              <section className="arcade-overlay arc-win">
                <span className="arcade-eyebrow">ALL THREE STAGES CLEARED</span>
                <h1>Deadline defeated.</h1>
                <p>
                  You’ve played through my world.
                  <br />
                  Let’s build something in yours.
                </p>
                <div className="arc-win-stats">
                  <span>
                    <b>{hud.score.toLocaleString()}</b>score
                  </span>
                  <span>
                    <b>{save.records.length}/11</b>signals recovered
                  </span>
                </div>
                <a
                  className="arc-primary"
                  href="mailto:ezhilan03@gmail.com?subject=Let%E2%80%99s%20build%20something"
                >
                  Party up with Ezhilan <FiArrowRight />
                </a>
                <div className="arc-overlay-links">
                  <button onClick={journal}>Explore the recovered work</button>
                  <button onClick={() => begin(false)}>Play again</button>
                </div>
              </section>
            )}
          </div>
          <div
            className={`arc-touch-controls ${active ? "" : "inactive"}`}
            aria-label="Touch game controls"
          >
            <div className="touch-movement">
              {touchButton("left", "Move left", <FiArrowLeft />)}
              {touchButton("right", "Move right", <FiArrowRight />)}
              {touchButton("up", "Aim up", <FiArrowUp />, "touch-aim")}
            </div>
            <div className="touch-action">
              {touchButton(
                "dash",
                "Dash",
                <>
                  <FiZap />
                  <small>DASH</small>
                </>,
              )}
              {touchButton(
                "jump",
                "Jump",
                <>
                  <FiArrowUp />
                  <small>JUMP</small>
                </>,
                "touch-jump",
              )}
              {touchButton(
                "fire",
                "Fire",
                <>
                  <FiTarget />
                  <small>FIRE</small>
                </>,
                "touch-fire",
              )}
            </div>
          </div>
          <footer className="arcade-controls">
            <span>
              <kbd>A D</kbd> move
            </span>
            <span>
              <kbd>SPACE</kbd> double jump
            </span>
            <span>
              <kbd>J</kbd> shoot
            </span>
            <span>
              <kbd>W</kbd> aim up
            </span>
            <span>
              <kbd>SHIFT</kbd> dash
            </span>
            <span>
              <kbd>P</kbd> pause
            </span>
            <button onClick={fullScreen}>
              <FiMaximize /> Fullscreen
            </button>
          </footer>
        </div>
        <div className="arcade-under">
          <span>Built from a real career. Played one life at a time.</span>
          <span>
            Collect signals to uncover the work.{" "}
            <Link to="/">Explore the portfolio ↗</Link>
          </span>
        </div>
      </main>
      <dialog
        className="arc-journal"
        ref={dialog}
        onCancel={(e) => {
          e.preventDefault();
          closeJournal();
        }}
        aria-label="Recovered field notes"
      >
        <header>
          <div>
            <span className="arcade-eyebrow">THE WORK BEHIND THE WORLD</span>
            <h2>
              Field notes <small>{save.records.length}/11</small>
            </h2>
          </div>
          <button onClick={closeJournal} aria-label="Close field notes">
            <FiX />
          </button>
        </header>
        <p className="journal-intro">
          Your discoveries are saved on this device. Play on to find more. You
          can read the full portfolio any time.
        </p>
        {!entry ? (
          <div className="journal-empty">
            <FiBookOpen />
            <h3>A fresh notebook.</h3>
            <p>
              Pass a career hologram or collect a glowing intel cartridge to
              recover a piece of Ezhilan’s work.
            </p>
            <button className="arc-primary" onClick={closeJournal}>
              Back to the world <FiArrowRight />
            </button>
          </div>
        ) : (
          <div className="journal-layout">
            <nav aria-label="Discovered records">
              {archived.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRecord(r.id)}
                  aria-pressed={entry.id === r.id}
                >
                  <small>{r.type}</small>
                  {r.title}
                </button>
              ))}
            </nav>
            <article>
              <span className="arcade-eyebrow">{entry.type}</span>
              <h3>{entry.title}</h3>
              <p className="journal-subtitle">{entry.subtitle}</p>
              <p>{entry.description}</p>
              {entry.detail && <p className="journal-detail">{entry.detail}</p>}
              <div className="journal-tags">
                {entry.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              {entry.href && (
                <a
                  className="arc-primary"
                  href={entry.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open project on GitHub <FiArrowRight />
                </a>
              )}
            </article>
          </div>
        )}
        <footer>
          <button onClick={closeJournal}>Back to game</button>
          <Link to="/project">All projects ↗</Link>
          <Link to="/resume">Original résumé ↗</Link>
        </footer>
      </dialog>
    </div>
  );
}
