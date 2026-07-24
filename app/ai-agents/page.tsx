import type { Metadata } from "next";
import ClientAiAgentsPage from "./ClientPage";

export const metadata: Metadata = {
  title: "AI Agents & Automation | Audcomp — Built by 100% Canadian Engineers",
  description: "Put practical AI agents to work automating real business tasks — designed, deployed, and supported by Audcomp's 100% Canadian engineers and Canadian data centres.",
};

export default function AiAgentsPage() {
  return <ClientAiAgentsPage />;
}
