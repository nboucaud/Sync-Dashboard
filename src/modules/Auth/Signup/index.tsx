import { Navbar } from "../../../components";
import { useAuth } from "../../../hooks/useAuth";

const Signup = () => {
  const { session, isLoadingSession } = useAuth();

  console.log(session, isLoadingSession);
  return (
    <>
      <Navbar />
    </>
  );
};

export default Signup;
