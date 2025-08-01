import supabase from "@/src/apis/supabase/index.ts";
import { Tables } from "@/src/utils/database.types.ts";

export type Tree = Tables<"tree">;

export const getTrees = async () => {
  const { data } = await supabase.auth.getSession();
  if (!data.session) {
    throw new Error("User is not authenticated");
  }
  return supabase
    .from("tree")
    .select("tree_title")
    .eq("user_id", data.session.user.id)
    .is("deleted_at", null)
    .throwOnError()
    .overrideTypes<Pick<Tree, "tree_title">[]>();
};

export const insertTree = async (treeTitle: string) => {
  const { data } = await supabase.auth.getSession();
  if (!data.session) {
    throw new Error("User is not authenticated");
  }
  return supabase
    .from("tree")
    .insert({ tree_title: treeTitle, user_id: data.session.user.id })
    .throwOnError()
    .overrideTypes<Pick<Tree, "tree_title">[]>();
};
