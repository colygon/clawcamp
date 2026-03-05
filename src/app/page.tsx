import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScheduleTabs from "@/components/ScheduleTabs";
import { workshops } from "@/data/workshops";

const REGISTER_URL = "https://cerebralvalley.ai/e/nebius-build-sf";

const levelOrder: Record<string, number> = {
  Beginner: 0,
  Intermediate: 1,
  Advanced: 2,
};
const sortedWorkshops = [...workshops].sort(
  (a, b) => (levelOrder[a.level] ?? 99) - (levelOrder[b.level] ?? 99)
);

const badgeIcons: Record<string, React.ReactNode> = {
  shield: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  cloud: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
    </svg>
  ),
  lifecycle: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M21.015 4.356v4.992" />
    </svg>
  ),
  robot: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1m0 0L3.07 12.9a1.5 1.5 0 001.06 2.56h1.5m-1.5-2.56l6.36-6.36m5.1 5.1l5.1-5.1m0 0L17.93 7.1a1.5 1.5 0 00-1.06 2.56h-1.5m1.5-2.56l-6.36 6.36M12 21a9 9 0 110-18 9 9 0 010 18z" />
    </svg>
  ),
  lekiwi: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 16h14v-5a2 2 0 00-2-2H7a2 2 0 00-2 2v5zM12 9V5m-2 0h4" />
    </svg>
  ),
  opendroid: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 20v-4m-3 4h6M12 16l-5-5V7a1 1 0 011-1h8a1 1 0 011 1v4l-5 5zM9 6V3m6 3V3" />
    </svg>
  ),
  booster: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 10h12M6 10l-2 7m2-7V7h12v3M18 10l2 7M4 17h2m12 0h2M8 10v7m8-7v7M10 7V5h4v2" />
    </svg>
  ),
  unitree: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="4" r="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v5m-4-1h8M8 10l-2 6m2-6v7M16 10l2 6m-2-6v7" />
    </svg>
  ),
};

export default function Home() {
  return (
    <div className="min-h-screen bg-nebius-dark">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 hero-gradient overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 text-xs font-medium text-nebius-lime bg-nebius-lime/10 border border-nebius-lime/20 rounded-full">
                OpenClaw + Nebius AI Cloud
              </span>
              <span className="px-3 py-1 text-xs font-medium text-nebius-green bg-nebius-green/10 border border-nebius-green/20 rounded-full">
                Hands-On Workshops
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6">
              Build Real AI Agents.
              <br />
              <span className="gradient-text">Ship Them Today.</span>
            </h1>

            <p className="text-xl text-nebius-text-muted max-w-2xl mb-10 leading-relaxed">
              Eight hands-on workshops for builders who want agents that actually run.
              Deploy on Nebius Serverless, connect to Token Factory for inference,
              and go from software agents to physical robots — LeKiwi, OpenDroid, Booster, and Unitree G1.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#workshops"
                className="px-8 py-4 bg-nebius-lime hover:bg-nebius-lime-hover text-nebius-navy font-semibold rounded-xl transition-colors text-lg"
              >
                Explore Workshops
              </a>
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-nebius-border hover:border-nebius-text-dim text-white font-semibold rounded-xl transition-colors text-lg"
              >
                Coming Soon
              </a>
            </div>
          </div>
        </div>

        {/* Decorative grid */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(186,255,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(186,255,0,0.3) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-nebius-border bg-nebius-darker py-8">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">8</div>
            <div className="text-sm text-nebius-text-muted mt-1">Workshops</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">4,000+</div>
            <div className="text-sm text-nebius-text-muted mt-1">Past Attendees</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">85K+</div>
            <div className="text-sm text-nebius-text-muted mt-1">Dev Community</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">5</div>
            <div className="text-sm text-nebius-text-muted mt-1">Mentors Online</div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 border-b border-nebius-border">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What to Expect</h2>
          <p className="text-lg text-nebius-text-muted max-w-2xl mb-12">
            You will show off what you build. You&apos;ll leave each session with something working — not just ideas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Guided Setup",
                desc: "Step-by-step installation and configuration with live mentor support.",
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1M6.32 10.07L3.07 12.9a1.5 1.5 0 001.06 2.56h1.5m-1.5-2.56l6.36-6.36" />
                  </svg>
                ),
              },
              {
                title: "Real Workflows",
                desc: "Email triage, document extraction, lead scoring, private data pipelines — choose your use case.",
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                ),
              },
              {
                title: "Small Group Breakouts",
                desc: "Brainstorm with others in your industry. Get direct support while building.",
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-nebius-border bg-nebius-card hover:bg-nebius-card-hover transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-nebius-lime/10 text-nebius-lime flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-nebius-text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Cards */}
      <section className="py-20 border-b border-nebius-border" id="workshops">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Workshops</h2>
          <p className="text-lg text-nebius-text-muted max-w-2xl mb-12">
            Eight tracks from first deploy to production-grade private agents and five different robot platforms.
            All running on Nebius Serverless + Token Factory.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workshops.map((w) => (
              <Link
                key={w.slug}
                href={`/workshops/${w.slug}`}
                className="group p-8 rounded-2xl border border-nebius-border bg-nebius-card hover:bg-nebius-card-hover card-glow transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 text-xs font-medium text-white rounded-full ${w.badgeColor}`}>
                    {w.badge}
                  </span>
                  <span className={`text-sm font-medium ${w.levelColor}`}>{w.level}</span>
                </div>

                <div className="w-12 h-12 rounded-xl bg-nebius-lime/10 text-nebius-lime flex items-center justify-center mb-4">
                  {badgeIcons[w.icon]}
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-nebius-lime transition-colors">
                  {w.title}
                </h3>
                <p className="text-nebius-text-muted mb-4">{w.subtitle}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {w.whatYouBuild.slice(0, 2).map((item, i) => (
                    <span key={i} className="px-3 py-1 text-xs text-nebius-text-dim bg-nebius-darker rounded-full border border-nebius-border">
                      {item.length > 60 ? item.substring(0, 57) + "..." : item}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm text-nebius-lime font-medium">
                  View workshop & guide
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 border-b border-nebius-border" id="schedule">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Choose Your Track</h2>
          <p className="text-lg text-nebius-text-muted max-w-2xl mb-12">
            Pick the workshop that matches your experience level and goals.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-nebius-border">
                  <th className="py-4 px-4 text-sm font-semibold text-nebius-text-muted"></th>
                  {sortedWorkshops.map((w) => (
                    <th key={w.slug} className="py-4 px-4 text-sm font-semibold text-white">
                      <Link href={`/workshops/${w.slug}`} className="hover:text-nebius-lime transition-colors">
                        {w.title.split("—")[0].trim()}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Audience", key: "audience" as const },
                  { label: "Level", key: "level" as const },
                  { label: "Key Value", key: "keyValue" as const },
                  { label: "You'll Say", key: "wowFactor" as const },
                ].map((row) => (
                  <tr key={row.label} className="border-b border-nebius-border">
                    <td className="py-4 px-4 text-sm font-medium text-nebius-text-muted">{row.label}</td>
                    {sortedWorkshops.map((w) => (
                      <td key={w.slug} className="py-4 px-4 text-sm text-nebius-text">
                        {row.key === "level" ? (
                          <span className={w.levelColor}>{w[row.key]}</span>
                        ) : row.key === "wowFactor" ? (
                          <em className="text-nebius-text-muted">{w[row.key]}</em>
                        ) : (
                          w[row.key]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-20 border-b border-nebius-border">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Schedule</h2>
          <p className="text-lg text-nebius-text-muted max-w-2xl mb-12">
            Choose one track and go deep. All workshops include live mentor support.
          </p>

          <ScheduleTabs />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 hero-gradient" id="register">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Build?
          </h2>
          <p className="text-xl text-nebius-text-muted max-w-xl mx-auto mb-10">
            RSVP required. Spots are limited since we provide hands-on support for every attendee.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-nebius-lime hover:bg-nebius-lime-hover text-nebius-navy font-semibold rounded-xl transition-colors text-lg"
            >
              Coming Soon
            </a>
            <a
              href="#workshops"
              className="px-10 py-4 border border-nebius-border hover:border-nebius-text-dim text-white font-semibold rounded-xl transition-colors text-lg"
            >
              View Workshop Details
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
