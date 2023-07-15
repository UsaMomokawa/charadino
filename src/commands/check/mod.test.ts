import { assertEquals } from "../../../deps.ts";
import type { Differential } from "../../types/check.ts";
import { parseConditions, validateSkills } from "./mod.ts";

Deno.test("条件を満たす場合、空配列を返すこと", () => {
  const skills = [
    { "name": "回避", "value": 50, "edited": true },
    { "name": "応急手当", "value": 30, "edited": true },
  ];
  const conditions = [
    { "name": "回避", "operator": ">=", "value": 30 },
    { "name": "応急手当", "operator": ">=", "value": 30 },
  ];
  const expected: [string[], Differential[]]= [
    ["回避", "応急手当"],
    [],
  ];
  const actual = validateSkills(skills, conditions);
  assertEquals(actual, expected);
});

Deno.test("条件を満たさない場合、Result の配列を返すこと", () => {
  const conditions = [
    { "name": "回避", "operator": ">=", "value": 30 },
    { "name": "応急手当", "operator": ">=", "value": 30 },
  ];
  const skills = [
    { "name": "回避", "value": 10, "edited": true },
    { "name": "応急手当", "value": 30, "edited": true },
  ];
  const expected = [
    ["回避", "応急手当"],
    [
      {
        "expected": { "name": "回避", "operator": ">=", "value": 30 },
        "actual": { "name": "回避", "value": 10, "edited": true },
      },
    ],
  ];
  const actual = validateSkills(skills, conditions);
  assertEquals(actual, expected);
});

Deno.test("条件を取得できること", () => {
  const expected = [
    { "name": "回避", "operator": ">=", "value": 50 },
    { "name": "応急手当", "operator": ">=", "value": 30 },
  ];
  const actual = parseConditions("回避>=50,応急手当>=30");
  assertEquals(actual, expected);
});
