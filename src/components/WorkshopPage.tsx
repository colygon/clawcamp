"use client";

import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import type { Workshop } from "@/data/workshops";

const icons: Record<string, React.ReactNode> = {
  shield: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  cloud: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
    </svg>
  ),
  lifecycle: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M21.015 4.356v4.992" />
    </svg>
  ),
  robot: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1m0 0L3.07 12.9a1.5 1.5 0 001.06 2.56h1.5m-1.5-2.56l6.36-6.36m5.1 5.1l5.1-5.1m0 0L17.93 7.1a1.5 1.5 0 00-1.06 2.56h-1.5m1.5-2.56l-6.36 6.36M12 21a9 9 0 110-18 9 9 0 010 18z" />
    </svg>
  ),
  lekiwi: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 16h14v-5a2 2 0 00-2-2H7a2 2 0 00-2 2v5zM12 9V5m-2 0h4" />
    </svg>
  ),
  opendroid: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 20v-4m-3 4h6M12 16l-5-5V7a1 1 0 011-1h8a1 1 0 011 1v4l-5 5zM9 6V3m6 3V3" />
    </svg>
  ),
  booster: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 10h12M6 10l-2 7m2-7V7h12v3M18 10l2 7M4 17h2m12 0h2M8 10v7m8-7v7M10 7V5h4v2" />
    </svg>
  ),
  unitree: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="4" r="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v5m-4-1h8M8 10l-2 6m2-6v7M16 10l2 6m-2-6v7" />
    </svg>
  ),
};

export default function WorkshopPage({ workshop }: { workshop: Workshop }) {
  return (
    <div className="min-h-screen bg-nebius-dark">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 hero-gradient">
        <div className="mx-auto max-w-7xl px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-nebius-text-muted hover:text-white transition-colors mb-8"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to all workshops
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${workshop.badgeColor}`}>
              {workshop.badge}
            </span>
            <span className={`text-sm font-medium ${workshop.levelColor}`}>{workshop.level}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            {workshop.title}
          </h1>
          <p className="text-xl md:text-2xl text-nebius-text-muted max-w-3xl mb-8">
            {workshop.subtitle}
          </p>
          <p className="text-lg text-nebius-text-muted max-w-3xl mb-10">{workshop.description}</p>

          <a
            href="#guide"
            className="inline-flex items-center gap-2 px-8 py-4 bg-nebius-lime hover:bg-nebius-lime-hover text-nebius-navy font-semibold rounded-xl transition-colors text-lg"
          >
            Jump to Step-by-Step Guide
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-16 border-b border-nebius-border">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-nebius-border bg-nebius-card">
            <h3 className="text-sm font-medium text-nebius-text-muted mb-2">Who This Is For</h3>
            <p className="text-white">{workshop.audience}</p>
          </div>
          <div className="p-6 rounded-2xl border border-nebius-border bg-nebius-card">
            <h3 className="text-sm font-medium text-nebius-text-muted mb-2">Key Value</h3>
            <p className="text-white">{workshop.keyValue}</p>
          </div>
          <div className="p-6 rounded-2xl border border-nebius-border bg-nebius-card">
            <h3 className="text-sm font-medium text-nebius-text-muted mb-2">You&apos;ll Say</h3>
            <p className="text-white italic">{workshop.wowFactor}</p>
          </div>
        </div>
      </section>

      {/* What You'll Build */}
      <section className="py-20 border-b border-nebius-border">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-white mb-10">What You&apos;ll Build</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workshop.whatYouBuild.map((item, i) => (
              <div key={i} className="p-6 rounded-2xl border border-nebius-border bg-nebius-card">
                <div className="w-10 h-10 rounded-lg bg-nebius-lime/20 text-nebius-lime flex items-center justify-center mb-4 font-bold">
                  {i + 1}
                </div>
                <p className="text-nebius-text">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We'll Cover */}
      <section className="py-20 border-b border-nebius-border">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-white mb-10">What We&apos;ll Cover</h2>
          <ul className="space-y-4 max-w-3xl">
            {workshop.whatWeCover.map((item, i) => (
              <li key={i} className="flex gap-4">
                <svg className="w-5 h-5 text-nebius-lime mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-nebius-text">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-20 border-b border-nebius-border" id="schedule">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-white mb-10">Schedule</h2>
          <div className="space-y-6">
            {workshop.schedule.map((slot, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-nebius-border bg-nebius-card hover:bg-nebius-card-hover transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="shrink-0 text-sm font-mono text-nebius-lime font-medium w-40">
                    {slot.time}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{slot.title}</h3>
                    <p className="text-nebius-text-muted mb-3">{slot.description}</p>
                    <ul className="space-y-1">
                      {slot.details.map((detail, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-nebius-text-dim">
                          <span className="text-nebius-lime mt-1">&#8226;</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prerequisites */}
      <section className="py-20 border-b border-nebius-border">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-white mb-10">Prerequisites</h2>
          <div className="p-6 rounded-2xl border border-nebius-border bg-nebius-card max-w-3xl">
            <ul className="space-y-4">
              {workshop.prerequisites.map((item, i) => (
                <li key={i} className="flex gap-4">
                  <svg className="w-5 h-5 text-nebius-cyan mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                  </svg>
                  <span className="text-nebius-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* You'll Leave With */}
      <section className="py-20 border-b border-nebius-border">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-white mb-10">You&apos;ll Leave With</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            {workshop.youLeaveWith.map((item, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl border border-nebius-border bg-nebius-card">
                <svg className="w-5 h-5 text-nebius-green mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-nebius-text">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section className="py-20" id="guide">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Step-by-Step Guide
            </h2>
            <p className="text-lg text-nebius-text-muted max-w-2xl">
              Follow these steps during the workshop. Each step includes commands you can copy,
              tips from our mentors, and a checkpoint to verify before moving on.
            </p>
          </div>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-nebius-lime via-nebius-lime-dim to-transparent hidden md:block" />

            <div className="space-y-12">
              {workshop.guideSteps.map((step, i) => (
                <div key={i} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-4 w-5 h-5 rounded-full bg-nebius-lime border-4 border-nebius-dark hidden md:block" />

                  <div className="md:ml-16 p-8 rounded-2xl border border-nebius-border bg-nebius-card hover:bg-nebius-card-hover transition-colors">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="px-3 py-1 text-xs font-mono font-bold text-nebius-lime bg-nebius-lime/10 rounded-full">
                        Step {step.stepNumber}
                      </span>
                      <span className="text-xs text-nebius-text-dim font-mono">
                        ~{step.duration}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-nebius-text-muted mb-6">{step.overview}</p>

                    {/* Instructions */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-nebius-text-muted uppercase tracking-wider mb-3">
                        Instructions
                      </h4>
                      <ol className="space-y-2">
                        {step.instructions.map((inst, j) => (
                          <li key={j} className="flex gap-3 text-sm text-nebius-text">
                            <span className="text-nebius-lime font-mono shrink-0">{j + 1}.</span>
                            {inst}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Commands */}
                    {step.commands && step.commands.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-nebius-text-muted uppercase tracking-wider mb-3">
                          Commands
                        </h4>
                        <div className="bg-nebius-darker rounded-xl border border-nebius-border p-4 overflow-x-auto">
                          <pre className="text-sm font-mono text-nebius-text">
                            {step.commands.map((cmd, j) => (
                              <div key={j} className={cmd.startsWith("#") ? "text-nebius-text-dim" : ""}>
                                {cmd}
                              </div>
                            ))}
                          </pre>
                        </div>
                      </div>
                    )}

                    {/* Tips */}
                    {step.tips && step.tips.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-nebius-text-muted uppercase tracking-wider mb-3">
                          Tips
                        </h4>
                        <div className="space-y-2">
                          {step.tips.map((tip, j) => (
                            <div key={j} className="flex gap-3 text-sm text-nebius-text-muted">
                              <span className="text-nebius-cyan shrink-0">&#9733;</span>
                              {tip}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Checkpoint */}
                    <div className="p-4 rounded-xl bg-nebius-green/5 border border-nebius-green/20">
                      <div className="flex gap-3">
                        <svg className="w-5 h-5 text-nebius-green shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <h4 className="text-sm font-semibold text-nebius-green mb-1">Checkpoint</h4>
                          <p className="text-sm text-nebius-text-muted">{step.checkpoint}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 hero-gradient" id="register">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Build?</h2>
          <p className="text-lg text-nebius-text-muted mb-8 max-w-xl mx-auto">
            RSVP required. Spots are limited since we provide hands-on support for every attendee.
          </p>
          <a
            href="https://cerebralvalley.ai/e/nebius-build-sf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-nebius-lime hover:bg-nebius-lime-hover text-nebius-navy font-semibold rounded-xl transition-colors text-lg"
          >
            Register Now
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
