import { useMutation } from "@tanstack/react-query";
import { useUser } from "../../../../../hooks/useUser";
import { supabase } from "../../../../../services/supabase";
import { toast } from "react-toastify";

export const useEditProfile = () => {
  const { profile, user } = useUser();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: Record<string, string | undefined>) => {
      if (payload.email && payload.email !== user?.email) {
        supabase.auth.updateUser({ email: payload.email });
        toast.success(`Check ${user?.email} inbox in order to confirm mail change to (${payload.email})`);
      }

      delete payload.email;
      const { error: updateError } = await supabase.from("profiles").update(payload).eq("id", profile.id);
      if (updateError) throw new Error(updateError.message);
      toast.success("Profile updated successfully!");
    },
    onError: (error) => toast.error(error.message),
  });

  return { editProfileMutation: mutateAsync, isPending };
};
