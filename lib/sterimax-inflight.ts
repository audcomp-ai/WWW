// Which task each agent is mid-way through, and how far along, at a given moment.
// Pure and deterministic: every agent walks a fixed cycle of tasks, offset from the others
// so the roster looks like a working team rather than a line of synchronised bars.

export type CycleTask = { label: string; durationSeconds: number };

export type AgentCycle = {
  agentId: string;
  name: string;
  /** Seconds this agent is ahead of the others, so they finish at different moments. */
  startOffset: number;
  tasks: CycleTask[];
};

export type InFlightState = {
  taskLabel: string;
  progressPct: number;
  /** Tasks this agent has finished since the demo started. */
  completed: number;
};

export function cycleDuration(tasks: CycleTask[]): number {
  return tasks.reduce((total, task) => total + task.durationSeconds, 0);
}

export function inFlightFor(cycle: AgentCycle, elapsedSeconds: number): InFlightState {
  const total = cycleDuration(cycle.tasks);
  if (total <= 0 || cycle.tasks.length === 0) {
    return { taskLabel: "", progressPct: 0, completed: 0 };
  }

  const t = elapsedSeconds + cycle.startOffset;
  const laps = Math.floor(t / total);
  const remainder = t % total;

  let accumulated = 0;
  for (let i = 0; i < cycle.tasks.length; i += 1) {
    const task = cycle.tasks[i];
    if (remainder < accumulated + task.durationSeconds) {
      const into = remainder - accumulated;
      return {
        taskLabel: task.label,
        progressPct: (into / task.durationSeconds) * 100,
        completed: laps * cycle.tasks.length + i,
      };
    }
    accumulated += task.durationSeconds;
  }

  // Unreachable while remainder < total, but returning the last task beats throwing on stage.
  const last = cycle.tasks[cycle.tasks.length - 1];
  return {
    taskLabel: last.label,
    progressPct: 100,
    completed: (laps + 1) * cycle.tasks.length,
  };
}

/** Total tasks completed across every agent — the "tasks completed this session" figure. */
export function totalCompleted(cycles: AgentCycle[], elapsedSeconds: number): number {
  return cycles.reduce((sum, cycle) => sum + inFlightFor(cycle, elapsedSeconds).completed, 0);
}
