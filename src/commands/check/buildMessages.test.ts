import { assertEquals } from "../../../deps.ts";
import { buildMessage } from "./buildMessages.ts";

Deno.test("条件を満たす場合、メッセージを返すこと", () => {
  const expected = "修正が必要な技能値はありませんでした :robot:";
  const actual = buildMessage([]);
  assertEquals(actual, expected);
});

Deno.test("条件を満たさない場合、メッセージを返すこと", () => {
  const expected =
    "修正が必要な技能値があります :bulb:\n\`\`\`diff\n+条件\n\n-回避: 10\n+回避>=30\n\`\`\`";
  const actual = buildMessage([{
    "expected": { "name": "回避", "operator": ">=", "value": 30 },
    "actual": { "name": "回避", "value": 10, "edited": true },
  }]);
  assertEquals(actual, expected);
});
