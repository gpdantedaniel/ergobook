import { Notebook } from "@/types";
import { supabase } from "./supabaseClient";

export const fetchNotebooks = async () => {
  const { data, error } = await supabase.from("notebooks").select("*");

  if (error) throw error;
  return data;
};

export const createNotebook = async ({
  title,
  color,
  orderIndex,
}: {
  title: string;
  color: string;
  orderIndex: number;
}) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("notebooks")
    .insert({
      user_id: user?.id,
      title: title,
      color: color,
      orderIndex: orderIndex,
    })
    .select();

  if (error) throw error;
  return data;
};

export const updateNotebook = async ({
  id,
  title,
  color,
}: {
  id: number;
  title: string;
  color: string;
}) => {
  const { data, error } = await supabase
    .from("notebooks")
    .update({ title: title, color: color })
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};

export const deleteNotebook = async ({ id }: { id: number }) => {
  const { error } = await supabase.from("notebooks").delete().eq("id", id);

  if (error) throw error;
  return id;
};

export const reorderNotebooks = async (orderedNotebooks: Notebook[]) => {
  const updatedNotebooks = orderedNotebooks.map((notebook, index) => ({
    ...notebook,
    orderIndex: index,
  }));

  const { error } = await supabase.from("notebooks").upsert(updatedNotebooks);

  if (error) throw error;
  return updatedNotebooks;
};
