// Every ROI figure on the Overview tab is derived here from two inputs: each agent's
// hoursPerWeek and BLENDED_RATE. Nothing downstream types a number that can be computed,
// so the figures on screen can never drift out of agreement with one another.

export type AgentLoad = { hoursPerWeek: number };

/** CAD per hour, blended across regulatory affairs, QA, and supply chain. */
export const BLENDED_RATE = 85;
export const HOURS_PER_FTE_WEEK = 40;
export const WORKDAYS_PER_WEEK = 5;
export const WEEKS_PER_YEAR = 52;
export const MONTHS_PER_YEAR = 12;

export function totalHoursPerWeek(loads: AgentLoad[]): number {
  return loads.reduce((total, load) => total + load.hoursPerWeek, 0);
}

export function fteReplaced(loads: AgentLoad[]): number {
  return totalHoursPerWeek(loads) / HOURS_PER_FTE_WEEK;
}

export function annualHoursSaved(loads: AgentLoad[]): number {
  return totalHoursPerWeek(loads) * WEEKS_PER_YEAR;
}

export function annualCostSaved(loads: AgentLoad[]): number {
  return annualHoursSaved(loads) * BLENDED_RATE;
}

export function monthlyHumanCost(loads: AgentLoad[]): number {
  return annualCostSaved(loads) / MONTHS_PER_YEAR;
}

/**
 * How much cheaper the agents are than the equivalent human hours, as a percentage.
 * Clamped to 0–100 so an unexpected input can never render a negative or absurd claim.
 */
export function percentSavedVsHuman(loads: AgentLoad[], agentMonthlyCost: number): number {
  const humanCost = monthlyHumanCost(loads);
  if (humanCost <= 0) return 0;
  const saved = (1 - agentMonthlyCost / humanCost) * 100;
  return Math.min(100, Math.max(0, saved));
}

export function secondsSavedPerWorkday(loads: AgentLoad[]): number {
  return (totalHoursPerWeek(loads) / WORKDAYS_PER_WEEK) * 3600;
}

export function formatHoursMinutesSeconds(totalSeconds: number): string {
  const whole = Math.floor(totalSeconds);
  const hours = Math.floor(whole / 3600);
  const minutes = Math.floor((whole % 3600) / 60);
  const seconds = whole % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${hours}h ${pad(minutes)}m ${pad(seconds)}s`;
}
