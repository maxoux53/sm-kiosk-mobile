import AsyncStorage from "@react-native-async-storage/async-storage";

export async function connect<T>(path: string, method: string, body?: unknown): Promise<T> {
  const api_url = "http://localhost:3001/v1";
  const token = await AsyncStorage.getItem("token");

  const options: RequestInit = {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  const res = await fetch(`${api_url}${path}`, options);

  const raw = await res.text();
  if (!res.ok) throw new Error(`Erreur HTTP ${res.status}: ${raw || res.statusText}`);

  if (res.status === 204 || raw.length === 0) return undefined as unknown as T;

  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) return JSON.parse(raw) as T;

  return raw as unknown as T;
}