import type { Skill } from "../types/charaeno.ts";

export function buildCharaenoApiEndpointUrl(charaenoUrl: string): string {
  const url = new URL(charaenoUrl);
  const path = url.pathname.split("/").slice(-2).join("/") + "/summary";
  const apiEndpoint = new URL(path, "https://charaeno.com/api/v1/");

  return apiEndpoint.toString();
}

export async function fetchSkills(url: string): Promise<Skill[]> {
  const response = await fetch(url);
  const investigator = await response.json();

  return investigator.skills;
}
