import type { Metadata } from "next";
import ClientAiAgentsPage from "./ClientPage";

export const metadata: Metadata = {
  title: "The AI Workforce | Audcomp",
  description: "Meet your new AI-managed agents. Powered by Audcomp.",
};

export default function AiAgentsPage() {
  return <ClientAiAgentsPage />;
}
