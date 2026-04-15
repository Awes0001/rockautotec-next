import { supabase } from "./supabase";

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("id");
  if (error) throw error;
  return data;
}

export async function getPartsByCategory(categoryId: number) {
  const { data, error } = await supabase
    .from("parts")
    .select("*")
    .eq("category_id", categoryId)
    .eq("in_stock", true);
  if (error) throw error;
  return data;
}

export async function getPartById(partId: number) {
  const { data, error } = await supabase
    .from("parts")
    .select("*")
    .eq("id", partId)
    .single();
  if (error) throw error;
  return data;
}