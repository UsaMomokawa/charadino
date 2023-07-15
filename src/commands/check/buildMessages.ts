import type { Result } from "../../types/check.ts";

export function buildSuccessMessage(): string {
  return "修正が必要な技能値はありませんでした :robot:";
}

export function buildFailureMessage(results: Result[]): string {
  let text = "修正が必要な技能値があります :bulb:\n";
  text += `\`\`\`diff\n+条件\n`;

  results.forEach((result) => {
    text += "\n";
    text += `-${result.actual.name}: ${result.actual.value}\n`;
    text +=
      `+${result.expected.name}${result.expected.operator}${result.expected.value}\n`;
  });

  text += "```";
  return text;
}
