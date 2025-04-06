import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { supabase } from "../services/supabase";
import { useEffect } from "react";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { data: session, isLoading: isLoadingSession } = useQuery({
    queryKey: queryKeys.authQueryKeys,
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      return session;
    },
  });

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      queryClient.setQueryData(queryKeys.authQueryKeys, session);
    });
    return () => subscription.unsubscribe();
  }, [queryClient]);

  return { session, isLoadingSession };
};
