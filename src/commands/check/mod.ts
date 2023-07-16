import type { Condition, Difference, Result } from "../../types/check.ts";
import type { Skill } from "../../types/charaeno.ts";
import type { InteractionDataOption } from "../../../deps.ts";
import {
  buildCharaenoApiEndpointUrl,
  fetchSkills,
} from "../../utils/charaeno.ts";

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
): [string[], Difference[]] {
  const differences: Difference[] = [];
  const targetSkills: string[] = [];

  conditions.forEach((condition) => {
    const skill = skills.find((skill) => skill.name === condition.name);
    if (!skill) {
      return;
    }
    targetSkills.push(skill.name);

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

    differences.push({ "expected": condition, "actual": skill });
  });

  return [targetSkills, differences];
}

export function getOptionValues(options: InteractionDataOption[]): string[] {
  return options.map((option) => option.value as string);
}

export async function check(options: InteractionDataOption[]): Promise<Result> {
  const [conditionsText, url] = getOptionValues(options);
  const endpoint = buildCharaenoApiEndpointUrl(url);
  const skills = await fetchSkills(endpoint);
  const conditions = parseConditions(conditionsText);
  const [targetSkills, differences] = validateSkills(skills, conditions);
  const result = {
    "differences": differences,
    "targetSkills": targetSkills,
    "conditionsText": conditionsText,
    "url": url,
  };

  return result;
}
