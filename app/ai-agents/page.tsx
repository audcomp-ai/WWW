import type { Metadata } from "next";
import ClientAiAgentsPage from "./ClientPage";

export const metadata: Metadata = {
  title: "AI Agents & Automation | Audcomp, Built by Technicians in Canada",
  description: "Put practical AI agents to work automating real business tasks, designed, deployed, and supported by Audcomp's Canadian technicians and Canadian data centres.",
};

export default function AiAgentsPage() {
  return <ClientAiAgentsPage />;
}
