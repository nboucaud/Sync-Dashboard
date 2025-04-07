import { useQuery } from "@tanstack/react-query";
import { supabase } from "../services/supabase";
import { queryKeys } from "../queryKeys";

export const useUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.UserQueryKey,
    queryFn: async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) throw new Error(userError?.message || "User not found");

      const { data: profile, error: profileError } = await supabase.from("profiles").select("*").eq("id", user.id).single();

      if (profileError) throw new Error(profileError.message);

      return { user, profile };
    },
    retry: false,
  });

  return {
    user: data?.user || null,
    profile: data?.profile || null,
    isLoading,
  };
};
