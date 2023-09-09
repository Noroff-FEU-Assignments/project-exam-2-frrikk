"use client";

import { useState } from "react";
import { useUserContext } from "@/app/_context/user-context";

type StatusMessage = "success" | "error";

export function useMutation() {
  const [loading, setLoading] = useState<boolean | null>(false);
  const [error, setError] = useState<string | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusMessage | null>(null);
  const { setUser } = useUserContext();

  async function postFetch(url: string, data: any, apiKey?: string) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://api.noroff.dev/api/v1/social/" + url,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}` ?? "",
          },
          body: JSON.stringify(data),
        },
      );

      if (response.ok) {
        const jwtData = await response.json();
        setJwt(jwtData.accessToken);
        setUser({
          name: jwtData.name,
          jwt: jwtData.accessToken,
          isLoggedIn: true,
        });
        setStatus("success");
      } else {
        setError("Failed to fetch data");
        setStatus("error");
      }
    } catch (error) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, jwt, postFetch, status };
}
