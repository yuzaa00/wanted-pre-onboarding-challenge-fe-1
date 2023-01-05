import { config } from "./config";

interface ApiArg {
  method: "GET" | "POST";
  token: string;
  url: string;
  parameter: any;
}

export async function apiAuth({ url }: Pick<ApiArg, "url">) {
  return await fetch(new URL(url, config.BASE_URL).toString(), {
    method: "POST",
  });
}

export async function api({ method, token, url, parameter }: ApiArg) {
  return await fetch(new URL(url, config.BASE_URL).toString(), {
    method,
    headers: {
      Authorization: token,
    },
    body: { ...parameter },
  });
}
