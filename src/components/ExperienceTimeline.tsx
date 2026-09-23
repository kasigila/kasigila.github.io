"use client";

import { useState } from "react";
import { experience } from "@/data/site";

type Role = (typeof experience)[number];

export function ExperienceTimeline({ items = experience }: { items?: Role[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="timeline">
      {items.map((job, index) => {
        const expanded = open === index;
        return (
          <article
            className={`timeline-item${expanded ? " expanded" : ""}`}
            key={`${job.org}-${job.when}`}
          >
            <div className="timeline-node" aria-hidden />
            <div className="timeline-card">
              <button
                className="timeline-card-header"
                type="button"
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? -1 : index)}
              >
                <div className="timeline-card-head">
                  <h3>{job.title}</h3>
                  <div className="timeline-org">{job.org}</div>
                  <div className="timeline-duration">
                    {job.when} · {job.where}
                  </div>
                </div>
                <span className="timeline-expand-icon" aria-hidden>
                  +
                </span>
              </button>
              {expanded ? (
                <div className="timeline-card-body">
                  <ul className="impact-list">
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  {job.href ? (
                    <p>
                      <a className="work-link" href={job.href} target="_blank" rel="noopener noreferrer">
                        Open
                      </a>
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}
