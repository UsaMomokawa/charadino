import type { Result } from "../../types/check.ts";

export function buildMessage(result: Result): string {
  if (result.differences.length === 0) {
    return buildSuccessMessage(result);
  } else {
    return buildFailureMessage(result);
  }
}

function buildSuccessMessage(result: Result): string {
  let text = `「${
    result.targetSkills.join(",")
  }」の技能値をチェックしました :mag_right:\n`;
  text += "修正が必要な技能値はありませんでした :robot:\n\n";
  text += `[ 条件 ] ${result.conditionsText}\n`;
  text += `[ url ] ${result.url}`;

  return text;
}

function buildFailureMessage(result: Result): string {
  let text = `「${
    result.targetSkills.join(",")
  }」の技能値をチェックしました :mag_right:\n`;
  text += "修正が必要な技能値があります :bulb:\n";
  text += `\`\`\`diff\n`;

  text += result.differences.map((diff) => {
    return `-${diff.actual.name}: ${diff.actual.value}\n+${diff.expected.name}${diff.expected.operator}${diff.expected.value}\n`;
  }).join("\n");

  text += "```\n";
  text += `[ 条件 ] ${result.conditionsText}\n`;
  text += `[ url ] ${result.url}`;

  return text;
}
