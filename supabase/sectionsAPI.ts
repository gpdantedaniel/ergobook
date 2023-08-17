import { Section } from "@/types";
import { supabase } from "./supabaseClient";

export const fetchSections = async (
  { notebook_id } : { notebook_id: number }
) => {
  const { data, error } = await supabase
  .from('sections')
  .select('*')
  .eq('notebook_id', notebook_id)

  if (error) throw error
  return data
}

export const createSection = async (
  { notebook_id, title, orderIndex } : { notebook_id: number, title: string, orderIndex: number }
) => {
  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
  .from('sections')
  .insert({
    user_id: user?.id,
    notebook_id: notebook_id,
    title: title,
    orderIndex: orderIndex
  })
  .select()

  if (error) throw error
  return data
}

export const updateSection = async (
  { id, title } : { id: number, title: string }
) => {
  const { data, error } = await supabase
  .from('sections')
  .update({ title: title })
  .eq('id', id)
  .select()

  if (error) throw error
  return data
}

export const deleteSection = async (
  { id } : { id: number }
) => {
  console.log('id to delete: ', id)
  const { error } = await supabase
  .from('sections')
  .delete()
  .eq('id', id)

  if (error) throw error
  return id
}

export const reorderSections = async (
  orderedSections : Section[]
) => {
  const updatedSections = orderedSections.map((section, index) => ({
    ...section,
    orderIndex: index
  }));

  const { data, error } = await supabase
  .from('sections')
  .upsert(updatedSections)
  .select()

  if (error) throw error
  return data
}