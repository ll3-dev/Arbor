import type { AppType } from "@workspace/server/index";
import { hc } from "hono/client";

export const client = hc<AppType>("http://localhost:8787/");
