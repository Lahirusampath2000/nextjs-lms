import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getTokenPayload } from "@/lib/auth";

export function useRequireAuth(requiredRole?: "student" | "teacher") {
  const router = useRouter();

  useEffect(() => {
    const payload = getTokenPayload();

    if (!payload) {
      router.replace("/auth/login");
      return;
    }

    if (requiredRole && payload.role !== requiredRole) {
      // Wrong role — redirect to their own dashboard
      router.replace(payload.role === "teacher" ? "/teacher/dashboard" : "/student/dashboard");
    }
  }, []);
}