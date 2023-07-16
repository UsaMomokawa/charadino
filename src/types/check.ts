import type { Skill } from "./charaeno.ts";

export interface Condition {
  name: string;
  operator: string;
  value: number;
}

export interface Difference {
  expected: Condition;
  actual: Skill;
}

export interface Result {
  differences: Difference[];
  targetSkills: string[];
  conditionsText: string;
  url: string;
}
