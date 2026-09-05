import type { RoyalMember } from "../types";

const BASE = "/api/royal-members";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${await res.text()}`);
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const royalApi = {
  getAll: () => request<RoyalMember[]>(BASE),
  getOne: (id: string) => request<RoyalMember>(`${BASE}/${id}`),
  create: (data: Omit<RoyalMember, "createdAt" | "updatedAt">) =>
    request<RoyalMember>(BASE, { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: Partial<RoyalMember>) =>
    request<RoyalMember>(`${BASE}/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  remove: (id: string) => request<void>(`${BASE}/${id}`, { method: "DELETE" }),
};
