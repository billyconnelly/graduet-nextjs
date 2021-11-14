import { Typography } from "@mui/material";
import { useSession } from "next-auth/react";

const IndexPage = () => {
  const { data: session, status } = useSession();
  console.log("SESSION_V2: ", session);

  return (
    <>
      {session ? (
        <Typography textAlign="center" variant="h3">
          Welcome,{" "}
          {session.user.isGraduate ? session.user.name : session.user.image}
        </Typography>
      ) : (
        <Typography textAlign="center" variant="h3">
          Graduet; the easiest place for grads to get jobs.
        </Typography>
      )}
    </>
  );
};

export default IndexPage;
