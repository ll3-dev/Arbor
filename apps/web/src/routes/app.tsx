import { useTreeMutate } from "@/src/hooks/tree/useTreeMutate.ts";
import { useTreeQuery } from "@/src/hooks/tree/useTreeQuery.ts";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button.tsx";

export const Route = createFileRoute("/app")({
  component: AppPage,
  wrapInSuspense: true,
});

function AppPage() {
  const { data: tree } = useTreeQuery();
  const { mutate: insertTree } = useTreeMutate();

  return (
    <div>
      <div>{JSON.stringify(tree)}</div>
      <Button onClick={() => insertTree("New Tree")}>Add Tree</Button>
    </div>
  );
}
