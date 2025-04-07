import { useMutation } from "@tanstack/react-query";
import { supabase } from "../../../../services/supabase";
import { toast } from "react-toastify";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../../utils/paths";

export const useLogin = () => {
  const navigate = useNavigate();
  const { mutateAsync: loginMutation, isPending } = useMutation({
    mutationFn: async ({ email, password }: FieldValues) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error(error.message);

      const { data: profile, error: profileError } = await supabase.from("profiles").select("*").eq("id", data.user.id).single();

      if (profileError) {
        throw new Error("Signed in, but failed to fetch profile.");
      }

      return { user: data.user, profile };
    },
    onSuccess(data) {
      navigate(PATHS.Dashboard);
      toast.success(`Welcome back ${data.profile.full_name || data.user.email}`);
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { loginMutation, isPending };
};
