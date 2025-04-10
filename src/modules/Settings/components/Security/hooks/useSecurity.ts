import { useUser } from "../../../../../hooks/useUser";

export const useSecurity = () => {
  const { user } = useUser();

  console.log(user);
};
