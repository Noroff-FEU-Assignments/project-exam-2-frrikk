import { useState } from "react";

type StatusMessage = "success" | "error";

export function useMutation() {
  const [loading, setLoading] = useState<boolean | null>(false);
  const [error, setError] = useState<string | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusMessage | null>(null);

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
        localStorage.setItem("token", jwtData.accessToken);
        setJwt(jwtData.accessToken);
        setStatus("success");
      } else {
        console.log(response.status);
        console.log(response);
        setError("Failed to fetch data");
        setStatus("error");
      }
    } catch (error) {
      setError("An error occurred");
      console.error("An error occurred", error);
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, jwt, postFetch, status };
}
