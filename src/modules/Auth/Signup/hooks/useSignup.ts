import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { supabase } from "../../../../services/supabase";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../../utils/paths";

export interface SignupPayload {
  email: string;
  password: string;
  full_name: string;
}

export const useSignup = () => {
  const navigate = useNavigate();

  const { mutateAsync: signupMutation, isPending } = useMutation({
    mutationFn: async ({ email, password, full_name }: FieldValues) => {
      const { error, data } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: { name: full_name },
        },
      });

      if (error) return toast.error(error.message);
      toast.success("Welcome to Sync", { position: "top-center", hideProgressBar: true });

      if (data?.user) {
        const { error: profileError } = await supabase.from("profiles").update({ full_name }).eq("id", data.user.id);
        if (profileError) toast.error("Failed to update profile: " + profileError.message);
      }

      if (data.user && data.session) return navigate(PATHS.Dashboard);
    },
  });

  return { signupMutation, isPending };
};
