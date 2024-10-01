// auth.ts

import supabase from "./supabaseClient";

export const signUpWithEmail = async (email: string, password: string, username: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username, // Save the username in user metadata
        },
      },
    });

    if (error) throw error;
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
