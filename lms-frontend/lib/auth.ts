//save after login
export function saveAuth(token: string, user: { id: number; name: string; role: string; grade?: string }) {
  localStorage.setItem("token", token);
  localStorage.setItem("role", user.role);
  localStorage.setItem("user", JSON.stringify(user));
}
//get user from localstorage
export function getUser() {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function getTokenPayload() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    // Check token expiry
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return null;
    }
    return payload as { id: number; role: "student" | "teacher" };
  } catch {
    return null;
  }
}

