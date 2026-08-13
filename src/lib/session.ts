const SESSION_KEY = "eeep_session_id";

export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function getSessionId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(SESSION_KEY);
}
