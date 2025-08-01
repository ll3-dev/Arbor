import { getTrees } from "@/src/apis/supabase/tree.ts";
import { useSuspenseQuery } from "@tanstack/react-query";

export const treeQueryKey = "trees";

export const useTreeQuery = () =>
  useSuspenseQuery({ queryFn: getTrees, queryKey: [treeQueryKey] });
