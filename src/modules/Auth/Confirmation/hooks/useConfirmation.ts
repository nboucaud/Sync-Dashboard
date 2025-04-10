import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../../services/supabase";
import { useUser } from "../../../../hooks/useUser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../../utils/paths";
import { queryKeys } from "../../../../queryKeys";

export const useConfirmation = () => {
  const queryClient = useQueryClient();
  const { user, profile } = useUser();
  const navigate = useNavigate();
  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      if (profile?.is_verified) return navigate(PATHS.Dashboard);
      const { error } = await supabase
        .from("profiles")
        .update({ is_verified: true, timer_expiration: new Date(Date.now() + 168 * 60 * 60 * 1000).toISOString() })
        .eq("id", user?.id);

      if (error) throw new Error(error.message);
    },

    onError: (err) => {
      navigate(PATHS.Onboarding);
      toast.error(err.message);
    },

    onSuccess: () => {
      queryClient.setQueryData(queryKeys.UserQueryKey, {
        ...profile,
        is_verified: true,
        timer_expiration: new Date(Date.now() + 168 * 60 * 60 * 1000).toISOString(),
      });
      navigate(PATHS.Waitlist);
    },
  });

  return { mutateAsync };
};
