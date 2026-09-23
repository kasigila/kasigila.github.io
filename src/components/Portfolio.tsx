"use client";

import { useEffect, useState } from "react";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Nav } from "@/components/Nav";
import { SiteEffects } from "@/components/SiteEffects";
import {
  builds,
  education,
  experience,
  leadership,
  metrics,
  profile,
  skills,
  ventures,
} from "@/data/site";

export function Portfolio() {
  const [mode, setMode] = useState<"creative" | "recruiter">("creative");

  useEffect(() => {
    document.body.classList.toggle("recruiter-mode", mode === "recruiter");
    window.scrollTo(0, 0);
    return () => document.body.classList.remove("recruiter-mode");
  }, [mode]);

  return (
    <>
      <a className="skip-link" href={mode === "creative" ? "#education" : "#recruiter"}>
        Skip to content
      </a>
      <SiteEffects />
      <Nav
        mode={mode}
        onToggle={() =>
          setMode((current) => (current === "creative" ? "recruiter" : "creative"))
        }
      />

      {mode === "recruiter" ? (
        <main className="recruiter" id="recruiter">
          <p className="hero-boot">{profile.location}</p>
          <h1>{profile.name}</h1>
          <p className="recruiter-kicker">{profile.lede}</p>

          <h2>Education</h2>
          {education.map((school) => (
            <article className="recruiter-role" key={school.school}>
              <h3>{school.credential}</h3>
              <p>
                {school.school} · {school.detail} · {school.when}
              </p>
            </article>
          ))}

          <h2>Skills</h2>
          <p>{skills.join(" · ")}</p>

          <h2>Impact at internships</h2>
          <ul>
            <li>25% improvement in malaria monitoring accuracy, Ifakara Health Institute</li>
            <li>25% more accurate climate-funding allocation, Sustainable Solutions for Africa</li>
            <li>20% faster credit-risk reporting, NMB Bank</li>
            <li>2nd place winner, J.P. Morgan Data for Good hackathon, Dallas</li>
          </ul>

          <h2>Leadership</h2>
          {leadership.map((job) => (
            <article className="recruiter-role" key={`${job.org}-${job.when}`}>
              <h3>{job.title}</h3>
              <p>
                {job.org} · {job.when} · {job.where}
              </p>
              <ul>
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}

          <h2>Experience</h2>
          {experience.map((job) => (
            <article className="recruiter-role" key={`${job.org}-${job.when}`}>
              <h3>{job.title}</h3>
              <p>
                {job.org} · {job.when} · {job.where}
              </p>
              <ul>
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}

          <h2>Contact</h2>
          <div className="contact-buttons">
            <a className="contact-btn" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a className="contact-btn" href={profile.phoneHref}>
              {profile.phone}
            </a>
            <a className="contact-btn" href={profile.linkedin}>
              LinkedIn
            </a>
            <a className="contact-btn" href={profile.github}>
              GitHub
            </a>
            <a className="contact-btn" href={profile.resume}>
              Resume
            </a>
          </div>
        </main>
      ) : (
        <main id="top">
          <section className="hero">
            <div className="hero-bg" aria-hidden />
            <div className="container hero-inner">
              <div>
                <p className="hero-boot">{profile.location}</p>
                <h1 className="hero-title">
                  <span>KAREN MARIE</span>
                  <span className="accent">KASIGILA</span>
                </h1>
                <p className="hero-subtitle">{profile.lede}</p>
                <div className="hero-buttons">
                  <a className="btn btn-primary" href={profile.resume}>
                    Download Resume
                  </a>
                  <a className="btn btn-secondary" href="#work">
                    View Work
                  </a>
                  <a className="btn btn-ghost" href="#contact">
                    Contact
                  </a>
                </div>
              </div>
              <div className="hero-visual" aria-hidden>
                <div className="hero-avatar">
                  <div className="avatar-ring" />
                  <div className="avatar-placeholder">KM</div>
                </div>
              </div>
            </div>
          </section>

          <section className="section section-alt" id="education">
            <div className="container">
              <h2 className="section-title">Education</h2>
              <div className="edu-grid">
                {education.map((school) => (
                  <article className="edu-card" key={school.school}>
                    <h3>{school.credential}</h3>
                    <p>{school.school}</p>
                    <p>{school.detail}</p>
                    <p>
                      {school.when} · {school.where}
                    </p>
                  </article>
                ))}
                <article className="skill-card">
                  <h3>Technical skills</h3>
                  <div className="tech-tags">
                    {skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="container">
              <h2 className="section-title">Impact at internships</h2>
              <div className="metrics-grid">
                {metrics.map((metric) => (
                  <article className="metric-card" key={metric.label}>
                    <span className="metric-label">{metric.label}</span>
                    <span
                      className={`metric-value${metric.value.length > 6 ? " long" : ""}`}
                    >
                      {metric.value}
                    </span>
                    <span className="metric-detail">{metric.detail}</span>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section section-alt" id="work">
            <div className="container">
              <h2 className="section-title">Work</h2>
              <div className="work-grid">
                {[...ventures, ...builds].map((item) => (
                  <article className="work-card" key={item.name}>
                    <p className="work-kicker">{item.place}</p>
                    <h3>{item.name}</h3>
                    <p className="work-role">{item.role}</p>
                    <p>{item.body}</p>
                    <a
                      className="work-link"
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.linkLabel}
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section" id="leadership">
            <div className="container">
              <h2 className="section-title">Leadership</h2>
              <ExperienceTimeline items={leadership} />
            </div>
          </section>

          <section className="section section-alt" id="experience">
            <div className="container">
              <h2 className="section-title">Experience</h2>
              <ExperienceTimeline />
            </div>
          </section>

          <section className="section" id="contact">
            <div className="container">
              <h2 className="section-title">Contact</h2>
              <p className="section-intro">
                London, Ontario. Master of Data Analytics at Western, finishing
                August 2027.
              </p>
              <div className="contact-buttons">
                <a className="contact-btn" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
                <a className="contact-btn" href={profile.phoneHref}>
                  {profile.phone}
                </a>
                <a className="contact-btn" href={profile.linkedin}>
                  LinkedIn
                </a>
                <a className="contact-btn" href={profile.github}>
                  GitHub
                </a>
                <a className="contact-btn" href={profile.resume}>
                  Resume
                </a>
              </div>
            </div>
          </section>

          <footer className="footer">
            <div className="container footer-inner">
              <p>{profile.name}</p>
              <p className="footer-right">{profile.location}</p>
            </div>
          </footer>
        </main>
      )}
    </>
  );
}
