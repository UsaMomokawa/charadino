import type { Skill } from "./charaeno.ts";

export interface Condition {
  name: string;
  operator: string;
  value: number;
}

export interface Result {
  expected: Condition;
  actual: Skill;
}
