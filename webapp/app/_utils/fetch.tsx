export async function postFetch(url: string, data?: any, apiKey?: string) {
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
      const jwt = await response.json();
      localStorage.setItem("token", jwt.accessToken);
    } else {
    }
  } catch (error) {
    throw new Error("An error occurred", error ?? "");
  }
}
