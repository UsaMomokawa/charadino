import type { Condition, Result } from "../../types/check.ts";
import type { Skill } from "../../types/charaeno.ts";

export function parseConditions(text: string): Condition[] {
  const conditions: Condition[] = [];
  const pairs = text.split(",");

  for (const pair of pairs) {
    const match = pair.match(
      /([\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]+)([<>]=?)(\d+)/u,
    );
    if (match) {
      const name = match[1];
      const operator = match[2];
      const value = parseInt(match[3], 10);
      conditions.push({ "name": name, "operator": operator, "value": value });
    }
  }

  return conditions;
}

export function validateSkills(
  skills: Skill[],
  conditions: Condition[],
): Result[] {
  const results: Result[] = [];

  conditions.forEach((condition) => {
    const skill = skills.find((skill) => skill.name === condition.name);
    if (!skill) {
      return;
    }

    switch (condition.operator) {
      case ">=":
        if (skill.value >= condition.value) {
          return;
        }
        break;
      case ">":
        if (skill.value > condition.value) {
          return;
        }
        break;
      case "<=":
        if (skill.value <= condition.value) {
          return;
        }
        break;
      case "<":
        if (skill.value < condition.value) {
          return;
        }
        break;
      default:
        break;
    }
    results.push({ "expected": condition, "actual": skill });
  });

  return results;
}
