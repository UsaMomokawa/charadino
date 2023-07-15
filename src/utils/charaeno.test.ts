import { assertEquals, assertSpyCalls, stub } from "../../deps.ts";
import { buildCharaenoApiEndpointUrl, fetchSkills } from "./charaeno.ts";

Deno.test("Charaeno URL を受け取って API エンドポイントを返すこと", () => {
  const expected = "https://charaeno.com/api/v1/6th/dummy-id/summary";
  const actual = buildCharaenoApiEndpointUrl(
    "https://charaeno.com/6th/dummy-id",
  );
  assertEquals(actual, expected);
});

Deno.test("Charaeno API エンドポイントを叩いて Skill の配列を返すこと", () => {
  const expected = new Promise((resolve) => {
    resolve([
      { "name": "回避", "value": 50, "edited": true },
      { "name": "応急手当", "value": 30, "edited": true },
    ]);
  });

  const fetchStub = stub(window, "fetch", () =>
    Promise.resolve(
      new Response(JSON.stringify([
        { "name": "回避", "value": 50, "edited": true },
        { "name": "応急手当", "value": 30, "edited": true },
      ])),
    ));

  try {
    assertEquals(fetchSkills("dummyUrl"), expected);
    assertSpyCalls(fetchStub, 1);
  } finally {
    fetchStub.restore();
  }
});
