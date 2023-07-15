import type { Skill } from "./charaeno.ts";

export interface Condition {
  name: string;
  operator: string;
  value: number;
}

export interface Differential {
  expected: Condition;
  actual: Skill;
}

export interface Result {
  differentials: Differential[];
  targetSkills: string[];
  conditionsText: string;
  url: string;
}
