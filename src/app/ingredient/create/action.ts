"use server"

import { ingredientCreateSchema } from "@/models/ingredient";

export async function createAction(formData: FormData) {
  const value = Object.fromEntries(formData);
  const action = ingredientCreateSchema.parse(value);
  console.log('Hello from server action', value, action);

  return 42;
}
