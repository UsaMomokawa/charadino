import { assertEquals } from "../../../deps.ts";
import { buildMessage } from "./buildMessages.ts";

Deno.test("条件を満たす場合、メッセージを返すこと", () => {
  const expected =
    "「回避,応急手当」の技能値をチェックしました :mag_right:\n修正が必要な技能値はありませんでした :robot:\n\n[ 条件 ] 回避>=30,応急手当>=10\n[ url ] dummy-url";
  const actual = buildMessage(
    {
      "differences": [],
      "targetSkills": ["回避", "応急手当"],
      "conditionsText": "回避>=30,応急手当>=10",
      "url": "dummy-url",
    },
  );
  assertEquals(actual, expected);
});

Deno.test("条件を満たさない場合、メッセージを返すこと", () => {
  const expected =
    "「回避,応急手当」の技能値をチェックしました :mag_right:\n修正が必要な技能値があります :bulb:\n\`\`\`diff\n-回避: 10\n+回避>=30\n\`\`\`\n[ 条件 ] 回避>=30,応急手当>=10\n[ url ] dummy-url";
  const actual = buildMessage({
    "differences": [{
      "expected": { "name": "回避", "operator": ">=", "value": 30 },
      "actual": { "name": "回避", "value": 10, "edited": true },
    }],
    "targetSkills": ["回避", "応急手当"],
    "conditionsText": "回避>=30,応急手当>=10",
    "url": "dummy-url",
  });
  assertEquals(actual, expected);
});
