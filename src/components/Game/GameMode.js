import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiRefreshCw,
  FiDownload,
} from "react-icons/fi";
import {
  characters,
  stages,
  questNames,
  abilityNames,
  testimonials,
  encounters,
  readProgress,
  freshProgress,
  getXp,
  careerMonths,
} from "./gameData";
import { projects } from "../Projects/projectData";
import { skillGroups } from "../About/Techstack";
import { socials } from "../Footer";
import pdf from "../../Assets/EZHILAN-CHINNASAMY-Resume.pdf";
import "./game.css";
import { WorldScene, BossSprite, QuestIcon } from "./PixelArt";

export default function GameMode() {
  const [progress, setProgress] = useState(readProgress);
  const [notice, setNotice] = useState("");
  const [activeQuest, setActiveQuest] = useState(0);
  const [pipeline, setPipeline] = useState([]);
  const [bossMessage, setBossMessage] = useState("");
  const [bossCorrect, setBossCorrect] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [brief, setBrief] = useState({
    name: "",
    email: "",
    challenge: "",
    message: "",
  });
  const heading = useRef(null);
  const selectedLevel = useRef(null);
  const questDetail = useRef(null);
  const character = characters.find((item) => item.id === progress.character);
  const stage = progress.stage;
  useEffect(() => {
    try {
      localStorage.setItem("ez-adventure-v1", JSON.stringify(progress));
    } catch {}
  }, [progress]);
  useEffect(() => {
    document.title = `Level ${stage + 1} · ${stages[stage][0]} | EZ Adventure`;
    heading.current?.focus();
    selectedLevel.current?.scrollIntoView?.({ block: "nearest", inline: "center" });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [stage]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(''), 6500);
    return () => clearTimeout(timer);
  }, [notice]);
  const complete = (level) =>
    setProgress((value) => ({
      ...value,
      completed: [...new Set([...value.completed, level])],
    }));
  const go = (level) => {
    setProgress((value) => ({ ...value, stage: level }));
    setNotice("");
  };
  const selectCharacter = (id) => {
    setProgress((value) => ({ ...value, character: id }));
    setNotice("Character selected. Every chapter is yours to explore.");
  };
  const start = () => {
    complete(0);
    go(1);
  };
  const equip = (name) => {
    if (progress.equipped.includes(name)) {
      setProgress((p) => ({
        ...p,
        equipped: p.equipped.filter((item) => item !== name),
      }));
      return;
    }
    if (progress.equipped.length === 3) {
      setNotice("Three slots, adventurer. Unequip an ability to make room.");
      return;
    }
    setProgress((p) => ({
      ...p,
      equipped: [...p.equipped, name],
      completed: [...new Set([...p.completed, 3])],
    }));
    setNotice(`${name} equipped.`);
  };
  const openQuest = (index) => {
    setActiveQuest(index);
    if (window.matchMedia?.('(max-width: 600px)').matches) {
      questDetail.current?.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
    setProgress((p) => ({
      ...p,
      viewedQuests: [...new Set([...p.viewedQuests, index])],
      completed: [...new Set([...p.completed, 2])],
    }));
  };
  const pipelineStep = (step) => {
    const next = [...pipeline, step];
    if (step !== ["Bronze", "Silver", "Gold"][pipeline.length]) {
      setPipeline([]);
      setNotice(
        "Almost. Start with raw data, then clean it, then make it ready for analysis.",
      );
      return;
    }
    setPipeline(next);
    if (next.length === 3) {
      complete(1);
      setNotice("Pipeline restored. Bronze → Silver → Gold. +100 chapter XP.");
    } else setNotice(`${step} connected. Choose the next layer.`);
  };
  const answerBoss = (answer) => {
    if (bossCorrect || progress.bossRound >= 3) return;
    const encounter = encounters[progress.bossRound];
    if (answer === encounter.answer) {
      setBossCorrect(true);
      setBossMessage(encounter.explanation);
    } else
      setBossMessage(
        "That leaves the problem alive. Look for the ability that addresses the cause, then try again.",
      );
  };
  const nextBoss = () => {
    setProgress((p) => ({
      ...p,
      bossRound: p.bossRound + 1,
      completed:
        p.bossRound === 2 ? [...new Set([...p.completed, 5])] : p.completed,
    }));
    setBossCorrect(false);
    setBossMessage("");
  };
  const reset = () => {
    setProgress(freshProgress());
    setPipeline([]);
    setBossCorrect(false);
    setBossMessage("");
    setNotice("A new adventure begins.");
  };
  const compose = (event) => {
    event.preventDefault();
    const subject = `Let’s party up: ${brief.challenge}`;
    const body = `Hi Ezhilan,\n\n${brief.message}\n\nProject challenge: ${brief.challenge}\n\n${brief.name}\n${brief.email}`;
    window.location.href = `mailto:ezhilan03@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setNotice(
      "Your email app will open with this draft. Review it there and send when you’re ready.",
    );
  };
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("ezhilan03@gmail.com");
      setEmailCopied(true);
    } catch {
      setNotice("Email: ezhilan03@gmail.com");
    }
  };
  return (
    <div className="game-root">
      <header className="game-header">
        <Link to="/" className="game-brand" aria-label="Return to portfolio">
          ez<span> / THE DATA QUEST</span>
        </Link>
        <div className="game-hud">
          <span className="xp-label">✦ {getXp(progress)} XP</span>
          <span className="save-label">Progress saved</span>
          <Link to="/" className="exit-game">
            Exit game <FiX />
          </Link>
        </div>
      </header>
      <div className="game-layout">
        <nav className="level-nav" aria-label="Game levels">
          <div className="nav-eyebrow">YOUR ADVENTURE</div>
          {stages.map(([title, subtitle, icon], index) => (
            <button
              key={title}
              ref={stage === index ? selectedLevel : null}
              aria-current={stage === index ? "step" : undefined}
              onClick={() => go(index)}
            >
              <span className="level-number">
                {progress.completed.includes(index) ? (
                  <FiCheck />
                ) : (
                  String(index + 1).padStart(2, "0")
                )}
              </span>
              <span>
                <strong>{title}</strong>
                <small>{subtitle}</small>
              </span>
              <span className="level-arrow">›</span>
            </button>
          ))}
          <div className="journey-meter">
            <span>{progress.completed.length}/6 chapters cleared</span>
            <progress
              max="6"
              value={progress.completed.length}
              aria-label="Adventure progress"
            />
          </div>
          <button className="restart-game" onClick={reset}>
            <FiRefreshCw /> Restart adventure
          </button>
        </nav>
        <main className="game-main" id="adventure-content">
          <div className="level-eyebrow">
            <span>LEVEL {String(stage + 1).padStart(2, "0")}</span>
            <span>EZHILAN CHINNASAMY · DATA ENGINEER</span>
          </div>
          {stage === 0 && (
            <>
              <section className="character-hero">
                <WorldScene />
                <div className="world-shade" />
                <div className="character-hero-copy">
                  <span className="game-kicker">A CAREER, REIMAGINED.</span>
                  <h1 ref={heading} tabIndex={-1}>
                    Every adventure
                    <br />
                    starts with <em>a character.</em>
                  </h1>
                  <p>
                    Three chapters. One Ezhilan.
                    <br />
                    Choose a version of me. Discover the work behind the
                    abilities.
                  </p>
                  <button className="game-button gold" onClick={start}>
                    Choose {character.alias.replace("The ", "")}{" "}
                    <FiArrowRight />
                  </button>
                  <span className="hero-save-note">
                    No download. No sign-up. Just a little curiosity.
                  </span>
                </div>
                <div
                  className={`hero-character sprite sprite-${character.id}`}
                  role="img"
                  aria-label={`Pixel art ${character.alias}`}
                />
                <div className="world-coordinates">
                  DALLAS, TX · REAL WORLD / DATA REALM
                </div>
              </section>
              <div className="roster-heading">
                <h2>Choose your character</h2>
                <span>
                  ← Earlier chapter <span className="roster-line" /> Later
                  chapter →
                </span>
              </div>
              <div className="character-roster">
                {characters.map((item, index) => (
                  <button
                    key={item.id}
                    className={`character-option ${progress.character === item.id ? "selected" : ""}`}
                    aria-pressed={progress.character === item.id}
                    onClick={() => selectCharacter(item.id)}
                  >
                    <div
                      className={`roster-sprite sprite sprite-${item.id}`}
                      role="img"
                      aria-label={item.alias}
                    />
                    <div className="character-option-copy">
                      <span className="game-kicker">{item.chapter}</span>
                      <h3>{item.alias}</h3>
                      <p>{item.role}</p>
                      <span className="character-company">{item.company}</span>
                    </div>
                    <span className="selection-mark">
                      {progress.character === item.id ? "✓" : "+"}
                    </span>
                  </button>
                ))}
              </div>
              <section className="character-bio game-panel">
                <div>
                  <span className="game-kicker">CLASS / {character.role}</span>
                  <h2>{character.alias}</h2>
                  <p>{character.description}</p>
                  <span className="passive">
                    PASSIVE ABILITY <strong>{character.ability}</strong>
                  </span>
                </div>
                <div className="real-stats">
                  {character.stats.map(([label, value]) => (
                    <div key={label}>
                      <strong>{value}</strong>
                      <span>{label}</span>
                    </div>
                  ))}
                  <small>Real outcomes from my résumé</small>
                </div>
              </section>
            </>
          )}
          {stage === 1 && (
            <>
              <div className="game-page-title">
                <h1 ref={heading} tabIndex={-1}>
                  The character <em>sheet.</em>
                </h1>
                <p>Experience is earned. Here’s where mine came from.</p>
              </div>
              <div className="sheet-summary game-panel">
                <div
                  className={`sheet-sprite sprite sprite-${character.id}`}
                  role="img"
                  aria-label={character.alias}
                />
                <div>
                  <span className="game-kicker">{character.alias}</span>
                  <h2>Ezhilan Chinnasamy</h2>
                  <p>
                    Data Engineer — SQL & Data Modeling · Pipeline Automation ·
                    Multi-Agent Integration
                  </p>
                  <div className="sheet-stats">
                    <span>
                      <strong>{Math.floor(careerMonths() / 12)}+</strong> years
                      across documented roles
                    </span>
                    <span>
                      <strong>03</strong> career chapters
                    </span>
                    <span>
                      <strong>{getXp(progress)}</strong> adventure XP
                    </span>
                  </div>
                </div>
                <a href={pdf} download className="game-button outline">
                  Download CV <FiDownload />
                </a>
              </div>
              <div className="sheet-grid">
                <section className="game-panel">
                  <h2>Progression log</h2>
                  <ol className="career-timeline">
                    {characters.map((item) => (
                      <li key={item.id}>
                        <span className="game-kicker">{item.period}</span>
                        <h3>{item.role}</h3>
                        <p>{item.company}</p>
                        <p>{item.description}</p>
                      </li>
                    ))}
                  </ol>
                  <div className="education-log">
                    <span className="game-kicker">EDUCATION UNLOCKS</span>
                    <p>
                      MS in Business Analytics and Artificial Intelligence
                      <br />
                      <strong>The University of Texas at Dallas</strong> · Jan
                      2023 – Dec 2024
                    </p>
                    <p>
                      Bachelors in Computer Science and Engineering
                      <br />
                      <strong>Kumaraguru College of Technology</strong> · Jul
                      2017 – Jun 2021
                    </p>
                  </div>
                </section>
                <aside>
                  <section className="game-panel attributes">
                    <h2>Core attributes</h2>
                    {characters.map((item) => (
                      <details key={item.id}>
                        <summary>
                          {item.attribute} <span>+</span>
                        </summary>
                        <p>{item.evidence}</p>
                      </details>
                    ))}
                    <h3>Equipped tools</h3>
                    <div className="gear-tags">
                      {character.kit.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </section>
                  <section className="game-panel pipeline-puzzle">
                    <span className="game-kicker">SIDE QUEST / +100 XP</span>
                    <h2>Restore the pipeline</h2>
                    <p>
                      Connect the layers: raw data → cleaned data →
                      analytics-ready data.
                    </p>
                    <div
                      className="pipeline-slots"
                      aria-label="Selected pipeline order"
                    >
                      {[0, 1, 2].map((i) => (
                        <span key={i}>{pipeline[i] || "?"}</span>
                      ))}
                    </div>
                    <div className="pipeline-options">
                      {["Gold", "Bronze", "Silver"].map((layer) => (
                        <button
                          key={layer}
                          disabled={
                            pipeline.includes(layer) || pipeline.length === 3
                          }
                          onClick={() => pipelineStep(layer)}
                        >
                          {layer}
                        </button>
                      ))}
                    </div>
                    {pipeline.length === 3 && (
                      <p className="game-success">✓ Pipeline restored.</p>
                    )}
                  </section>
                </aside>
              </div>
            </>
          )}
          {stage === 2 && (
            <>
              <div className="game-page-title">
                <h1 ref={heading} tabIndex={-1}>
                  The quest <em>log.</em>
                </h1>
                <p>
                  Eight real projects. Eight different kinds of chaos,
                  conquered.
                </p>
              </div>
              <div className="quest-workspace">
                <div className="quest-list">
                  {projects.map((project, index) => (
                    <button
                      className={activeQuest === index ? "active" : ""}
                      key={project.title}
                      onClick={() => openQuest(index)}
                      aria-pressed={activeQuest === index}
                    >
                      <div className="quest-thumbnail">
                        <QuestIcon
                          type={index < 2 ? index : index < 4 ? 2 : 3}
                        />
                      </div>
                      <div>
                        <span className="game-kicker">
                          QUEST {String(index + 1).padStart(2, "0")}{" "}
                          {progress.viewedQuests.includes(index)
                            ? " / DISCOVERED"
                            : ""}
                        </span>
                        <h3>{questNames[index]}</h3>
                        <p>{project.title}</p>
                      </div>
                      <span>↗</span>
                    </button>
                  ))}
                </div>
                <article className="quest-detail game-panel" ref={questDetail}>
                  <div className="quest-detail-art">
                    <QuestIcon
                      type={
                        activeQuest < 2 ? activeQuest : activeQuest < 4 ? 2 : 3
                      }
                    />
                  </div>
                  <span className="game-kicker">
                    COMPLETED PROJECT / QUEST {activeQuest + 1}
                  </span>
                  <h2>{questNames[activeQuest]}</h2>
                  <h3>{projects[activeQuest].title}</h3>
                  <p>{projects[activeQuest].description}</p>
                  {projects[activeQuest].stack && (
                    <div className="gear-tags">
                      {projects[activeQuest].stack.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  )}
                  {projects[activeQuest].bullets && (
                    <div className="quest-milestones">
                      <h3>Journey milestones</h3>
                      {projects[activeQuest].bullets.map((bullet, index) => (
                        <div key={bullet}>
                          <span>0{index + 1}</span>
                          <p>{bullet}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <a
                    className="game-button gold"
                    href={projects[activeQuest].ghLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Inspect the project <FiArrowUpRight />
                  </a>
                  <button
                    className="quest-discover"
                    onClick={() => openQuest(activeQuest)}
                  >
                    {progress.viewedQuests.includes(activeQuest)
                      ? "✓ Added to your quest log"
                      : "Mark discovered · +25 XP"}
                  </button>
                </article>
              </div>
            </>
          )}
          {stage === 3 && (
            <>
              <div className="game-page-title">
                <h1 ref={heading} tabIndex={-1}>
                  Pack your <em>inventory.</em>
                </h1>
                <p>
                  My real skillset, in adventure form. Equip up to three
                  abilities for your party.
                </p>
              </div>
              <div className="loadout game-panel">
                <div>
                  <span className="game-kicker">YOUR LOADOUT</span>
                  <h2>{progress.equipped.length}/3 slots equipped</h2>
                </div>
                <div className="loadout-slots">
                  {[0, 1, 2].map((index) => (
                    <button
                      key={index}
                      disabled={!progress.equipped[index]}
                      onClick={() => equip(progress.equipped[index])}
                      aria-label={
                        progress.equipped[index]
                          ? `Unequip ${progress.equipped[index]}`
                          : `Empty slot ${index + 1}`
                      }
                    >
                      <span>◈</span>
                      {progress.equipped[index] || "Empty slot"}
                      {progress.equipped[index] && <FiX />}
                    </button>
                  ))}
                </div>
              </div>
              <div className="ability-groups">
                {skillGroups.map((group, index) => (
                  <section className="game-panel" key={group.title}>
                    <div className="ability-title">
                      <span className="ability-icon">
                        {["⚗", "▤", "☁", "✧", "◈"][index]}
                      </span>
                      <div>
                        <span className="game-kicker">{group.title}</span>
                        <h2>{abilityNames[index]}</h2>
                      </div>
                    </div>
                    <div className="ability-items">
                      {group.items.map((item) => (
                        <button
                          key={item}
                          aria-pressed={progress.equipped.includes(item)}
                          onClick={() => equip(item)}
                        >
                          <span>{item}</span>
                          <span>
                            {progress.equipped.includes(item) ? "✓" : "+"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </>
          )}
          {stage === 4 && (
            <>
              <div className="game-page-title">
                <h1 ref={heading} tabIndex={-1}>
                  Welcome to <em>the guild.</em>
                </h1>
                <p>Good work is a multiplayer game.</p>
              </div>
              <section className="guild-hall game-panel">
                <div className="guild-emblem" aria-hidden="true">
                  ♜
                </div>
                {testimonials.length ? (
                  testimonials.map((quote) => (
                    <blockquote key={quote.name}>
                      <p>{quote.text}</p>
                      <footer>
                        {quote.name} · {quote.role}
                      </footer>
                    </blockquote>
                  ))
                ) : (
                  <>
                    <span className="game-kicker">THE NPC GUILD</span>
                    <h2>The party is still gathering.</h2>
                    <p>
                      Recommendations will appear here when they’re ready.
                      <br />
                      For now, pull up a chair and explore my corner of the
                      internet.
                    </p>
                    <div className="guild-seats" aria-hidden="true">
                      <span>?</span>
                      <span>?</span>
                      <span>?</span>
                    </div>
                  </>
                )}
                <div className="guild-links">
                  {socials.map(([name, url]) => (
                    <a href={url} key={name} target="_blank" rel="noreferrer">
                      {name}
                      <FiArrowUpRight />
                    </a>
                  ))}
                </div>
                <button
                  className="game-button gold"
                  onClick={() => {
                    complete(4);
                    go(5);
                  }}
                >
                  Head to the final boss <FiArrowRight />
                </button>
              </section>
            </>
          )}
          {stage === 5 && (
            <>
              <div className="game-page-title">
                <h1 ref={heading} tabIndex={-1}>
                  {progress.bossRound === 3 ? (
                    <>
                      Chaos, <em>contained.</em>
                    </>
                  ) : (
                    <>
                      The final <em>boss.</em>
                    </>
                  )}
                </h1>
                <p>
                  {progress.bossRound === 3
                    ? "The realm is a little more orderly. Ready to solve a real problem together?"
                    : "Meet Data Chaos. Three problems. Choose the ability that breaks each one."}
                </p>
              </div>
              <section
                className={`boss-arena game-panel ${progress.bossRound === 3 ? "boss-defeated" : ""}`}
              >
                <div className="boss-portrait">
                  <div className="boss-art">
                    <BossSprite />
                  </div>
                  <span className="game-kicker">
                    {progress.bossRound === 3
                      ? "DEFEATED"
                      : "DATA CHAOS / BOSS"}
                  </span>
                  <div className="boss-health">
                    <span>HP {3 - progress.bossRound}/3</span>
                    <progress
                      max="3"
                      value={3 - progress.bossRound}
                      aria-label="Boss health"
                    />
                  </div>
                </div>
                <div className="boss-battle">
                  {progress.bossRound < 3 ? (
                    <>
                      <span className="game-kicker">
                        ENCOUNTER {progress.bossRound + 1} / 3
                      </span>
                      <h2>{encounters[progress.bossRound].title}</h2>
                      <p>{encounters[progress.bossRound].problem}</p>
                      <div className="boss-options">
                        {encounters[progress.bossRound].options.map(
                          (option) => (
                            <button
                              key={option}
                              disabled={bossCorrect}
                              onClick={() => answerBoss(option)}
                            >
                              {option}
                              <span>⚔</span>
                            </button>
                          ),
                        )}
                      </div>
                      <div
                        className={
                          bossCorrect
                            ? "battle-feedback success"
                            : "battle-feedback"
                        }
                        role="status"
                      >
                        {bossMessage}
                      </div>
                      {bossCorrect && (
                        <button className="game-button gold" onClick={nextBoss}>
                          {progress.bossRound === 2
                            ? "Defeat Data Chaos"
                            : "Next encounter"}{" "}
                          <FiArrowRight />
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="victory">
                      <span className="victory-star">✦</span>
                      <h2>Quest complete.</h2>
                      <p>
                        You brought curiosity.
                        <br />
                        I’ll bring the data engineering.
                      </p>
                      <span className="game-kicker">
                        {getXp(progress)} XP EARNED ·{" "}
                        {progress.viewedQuests.length}/8 PROJECTS DISCOVERED
                      </span>
                      <button
                        className="game-button outline"
                        onClick={() => {
                          setProgress((p) => ({ ...p, bossRound: 0 }));
                          setBossCorrect(false);
                          setBossMessage("");
                        }}
                      >
                        Play the encounter again
                      </button>
                    </div>
                  )}
                </div>
              </section>
              <section className="party-up game-panel">
                <div>
                  <span className="game-kicker">CO-OP MODE / REAL WORLD</span>
                  <h2>
                    Have a boss
                    <br />
                    of your own?
                  </h2>
                  <p>
                    Feel free to reach out to discuss project collaborations,
                    networking, or just to hear me passionately explain why Real
                    Madrid is the greatest football club in history.
                  </p>
                  <div className="gear-tags">
                    {progress.equipped.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                  <a className="game-email" href="mailto:ezhilan03@gmail.com">
                    ezhilan03@gmail.com
                  </a>
                  <button className="copy-email" onClick={copyEmail}>
                    {emailCopied ? "Copied ✓" : "Copy email"}
                  </button>
                </div>
                <form onSubmit={compose}>
                  <label>
                    Your name
                    <input
                      required
                      maxLength="100"
                      autoComplete="name"
                      value={brief.name}
                      onChange={(e) =>
                        setBrief({ ...brief, name: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    Email
                    <input
                      type="email"
                      required
                      maxLength="254"
                      autoComplete="email"
                      value={brief.email}
                      onChange={(e) =>
                        setBrief({ ...brief, email: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    Choose your challenge
                    <select
                      required
                      value={brief.challenge}
                      onChange={(e) =>
                        setBrief({ ...brief, challenge: e.target.value })
                      }
                    >
                      <option value="">Select a challenge</option>
                      <option>Data pipelines & automation</option>
                      <option>Analytics & data modeling</option>
                      <option>AI & agent integration</option>
                      <option>Project collaboration or networking</option>
                    </select>
                  </label>
                  <label>
                    The quest brief
                    <textarea
                      required
                      maxLength="2000"
                      rows="3"
                      value={brief.message}
                      onChange={(e) =>
                        setBrief({ ...brief, message: e.target.value })
                      }
                    />
                  </label>
                  <button className="game-button gold" type="submit">
                    Party up with Ezhilan <FiArrowUpRight />
                  </button>
                  <p className="email-note">
                    Opens a draft in your email app. Nothing is sent
                    automatically.
                  </p>
                </form>
              </section>
            </>
          )}
          <div className="game-notice" role="status" aria-live="polite">
            {notice}
          </div>
          <footer className="level-footer">
            <button disabled={stage === 0} onClick={() => go(stage - 1)}>
              <FiChevronLeft /> Previous level
            </button>
            <span>
              Adventure XP is game progress. Career outcomes come from my work.
            </span>
            {stage < 5 ? (
              <button onClick={() => go(stage + 1)}>
                Next level <FiChevronRight />
              </button>
            ) : (
              <Link to="/">
                Back to portfolio <FiArrowRight />
              </Link>
            )}
          </footer>
        </main>
      </div>
    </div>
  );
}
