import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Claw Camp | OpenClaw Workshops Powered by Nebius AI Cloud",
  description:
    "Hands-on workshops for deploying real AI agents with OpenClaw and Nebius infrastructure. From local-first setups to dedicated GPUs, Kubernetes, and robotics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {/* Tailwind safelist: dynamic classes used in workshop data */}
        <div className="hidden bg-nebius-lime bg-nebius-blue bg-nebius-cyan bg-nebius-pink bg-nebius-purple text-nebius-navy text-nebius-lime text-nebius-green text-nebius-blue text-nebius-orange text-nebius-pink text-nebius-cyan text-nebius-purple bg-nebius-lime/10 bg-nebius-lime/20 border-nebius-lime/20 bg-nebius-lime-hover bg-nebius-lime-dim from-nebius-lime from-nebius-lime-dim" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
