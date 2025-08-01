import { config } from "@workspace/eslint-config/react-internal";
import pluginQuery from "@tanstack/eslint-plugin-query";

export default [...pluginQuery.configs["flat/recommended"], ...config];
