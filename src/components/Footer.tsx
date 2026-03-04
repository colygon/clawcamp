import Link from "next/link";

function LobsterLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="36" rx="10" ry="14" fill="#BAFF00" />
      <circle cx="32" cy="20" r="8" fill="#BAFF00" />
      <circle cx="28.5" cy="18" r="1.5" fill="#0A1628" />
      <circle cx="35.5" cy="18" r="1.5" fill="#0A1628" />
      <path d="M22 30 L12 24 L8 28 L14 30 L12 34 L8 30 L4 34 L14 36 L22 34Z" fill="#BAFF00" stroke="#0A1628" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M42 30 L52 24 L56 28 L50 30 L52 34 L56 30 L60 34 L50 36 L42 34Z" fill="#BAFF00" stroke="#0A1628" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M28 13 Q24 4 18 2" stroke="#BAFF00" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M36 13 Q40 4 46 2" stroke="#BAFF00" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M26 48 L32 54 L38 48" stroke="#BAFF00" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M24 52 L32 60 L40 52" stroke="#BAFF00" strokeWidth="2" strokeLinecap="round" fill="none" />
      <line x1="26" y1="38" x2="20" y2="44" stroke="#BAFF00" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="26" y1="42" x2="20" y2="48" stroke="#BAFF00" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="38" y1="38" x2="44" y2="44" stroke="#BAFF00" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="38" y1="42" x2="44" y2="48" stroke="#BAFF00" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-nebius-border bg-nebius-darker">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <LobsterLogo className="w-8 h-8" />
              <span className="text-lg font-semibold text-white">
                Claw<span className="text-nebius-lime"> Camp</span>
              </span>
            </div>
            <p className="text-sm text-nebius-text-muted leading-relaxed">
              Deploy real AI agents with one click. Powered by Nebius AI Cloud infrastructure.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Workshops</h4>
            <ul className="space-y-3">
              <li><Link href="/workshops/clawd-vm" className="text-sm text-nebius-text-muted hover:text-white transition-colors">Cloud VM</Link></li>
              <li><Link href="/workshops/local-first" className="text-sm text-nebius-text-muted hover:text-white transition-colors">Local-First + Token Factory</Link></li>
              <li><Link href="/workshops/h200-gpu" className="text-sm text-nebius-text-muted hover:text-white transition-colors">Dedicated H200 GPU</Link></li>
              <li><Link href="/workshops/kubernetes" className="text-sm text-nebius-text-muted hover:text-white transition-colors">Kubernetes</Link></li>
              <li><Link href="/workshops/robotics" className="text-sm text-nebius-text-muted hover:text-white transition-colors">Robotics + SO-ARM100</Link></li>
              <li><Link href="/workshops/personal-assistant" className="text-sm text-nebius-text-muted hover:text-white transition-colors">Personal AI Assistant</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><a href="https://nebius.com" target="_blank" rel="noopener noreferrer" className="text-sm text-nebius-text-muted hover:text-white transition-colors">Nebius AI Cloud</a></li>
              <li><a href="https://nebius.com/token-factory" target="_blank" rel="noopener noreferrer" className="text-sm text-nebius-text-muted hover:text-white transition-colors">Token Factory</a></li>
              <li><a href="#" className="text-sm text-nebius-text-muted hover:text-white transition-colors">OpenClaw Docs</a></li>
              <li><a href="https://docs.tokenfactory.nebius.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-nebius-text-muted hover:text-white transition-colors">Token Factory Docs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Community</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-nebius-text-muted hover:text-white transition-colors">Discord</a></li>
              <li><a href="#" className="text-sm text-nebius-text-muted hover:text-white transition-colors">GitHub</a></li>
              <li><a href="#" className="text-sm text-nebius-text-muted hover:text-white transition-colors">Twitter / X</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-nebius-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-nebius-text-dim">&copy; 2026 Claw Camp &mdash; Powered by Nebius AI Cloud. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-nebius-text-dim hover:text-nebius-text-muted transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-nebius-text-dim hover:text-nebius-text-muted transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
