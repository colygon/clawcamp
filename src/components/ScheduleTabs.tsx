"use client";

import { useState } from "react";

const acceleratedSchedule = [
  { time: "12:00 PM – 12:10 PM", title: "Introduction & Architecture Overview", desc: "Quick overview of core concepts and what we're building." },
  { time: "12:10 PM – 12:35 PM", title: "Hands-On Setup", desc: "Guided installation and configuration. Live chat support from mentors." },
  { time: "12:35 PM – 12:55 PM", title: "Build Your Workflow / Use Case", desc: "Choose a real business problem and build the solution live." },
  { time: "12:55 PM – 1:00 PM", title: "Wrap-Up & Next Steps", desc: "Key takeaways, resources, and where to go from here." },
];

const advancedSchedule = [
  { time: "12:00 PM – 12:30 PM", title: "Introduction & Architecture Overview", desc: "Why this approach matters, core concepts, and what we're building today." },
  { time: "12:30 PM – 1:15 PM", title: "Hands-On Setup", desc: "Guided installation and configuration. Live chat support from mentors." },
  { time: "1:15 PM – 2:00 PM", title: "Build Your Workflow / Use Case", desc: "Choose a real business problem and build the solution live." },
  { time: "2:00 PM – 2:30 PM", title: "Optimization, Q&A & Breakout Groups", desc: "Cost analysis, advanced patterns, and industry-specific discussion." },
];

const tabs = [
  { id: "accelerated", label: "Accelerated", duration: "1 hour. Fast-paced, hands-on, minimal downtime.", schedule: acceleratedSchedule },
  { id: "advanced", label: "Advanced", duration: "2.5 hours. Deep dives, Q&A, and breakout groups.", schedule: advancedSchedule },
];

export default function ScheduleTabs() {
  const [activeTab, setActiveTab] = useState("accelerated");
  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-nebius-lime text-nebius-navy"
                : "border border-nebius-border text-nebius-text-muted hover:text-white hover:border-nebius-text-muted"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <p className="text-sm text-nebius-text-muted mb-6">
        {active.duration} Follow along from anywhere. Live chat support from mentors.
      </p>

      <div className="max-w-3xl space-y-4">
        {active.schedule.map((slot, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row md:items-center gap-4 p-6 rounded-2xl border border-nebius-border bg-nebius-card"
          >
            <span className="text-sm font-mono text-nebius-lime font-medium shrink-0 w-44">
              {slot.time}
            </span>
            <div>
              <h3 className="text-white font-semibold">{slot.title}</h3>
              <p className="text-sm text-nebius-text-muted">{slot.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
