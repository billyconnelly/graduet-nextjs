import { Typography } from "@mui/material";
import { fetchData } from "next-auth/client/_utils";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const IndexPage = () => {
  const { data: session, status } = useSession();
  console.log("SESSION_V2: ", session);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR("/api/is-graduate", fetcher);
  if (error) return <div>An error occured.</div>;
  if (!data) return <div>Loading ...</div>;
  console.log(data);

  return (
    <>
      HELLO {data[0].isGraduate.toString()}
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
