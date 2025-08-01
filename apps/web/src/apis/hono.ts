import type { AppType } from "@workspace/server/index.ts";
import { hc } from "hono/client";

const baseUrl =
  import.meta.env.VITE_ARBOR_SERVER_URL || "http://localhost:8787";

export const client = hc<AppType>(baseUrl);
