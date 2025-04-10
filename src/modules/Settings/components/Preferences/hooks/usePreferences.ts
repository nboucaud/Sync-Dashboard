import { useMutation } from "@tanstack/react-query";
import { supabase } from "../../../../../services/supabase";
import { useUser } from "../../../../../hooks/useUser";
import { toast } from "react-toastify";
import { PreferenceType } from "..";

export const usePreferences = () => {
  const { profile } = useUser();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: PreferenceType) => {
      const { error } = await supabase.from("profiles").update(payload).eq("id", profile?.id);

      if (error) throw new Error(error.message);

      toast.success("Preferences saved!");
    },

    onError: (err) => toast.error(err.message),
  });

  return { mutateAsync, isPending };
};
