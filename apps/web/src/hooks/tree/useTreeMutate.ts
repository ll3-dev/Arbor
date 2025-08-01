import { insertTree } from "@/src/apis/supabase/tree.ts";
import { treeQueryKey } from "@/src/hooks/tree/useTreeQuery.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useTreeMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: insertTree,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [treeQueryKey] });
    },
  });
};
