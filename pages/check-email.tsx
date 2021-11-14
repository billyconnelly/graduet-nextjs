import { Typography } from "@mui/material";
import { fetchData } from "next-auth/client/_utils";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";

const CheckEmail = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      Router.replace(window.location);
    }, 3000);

    return () => clearInterval(interval); //Prevents memory leaks.
  }, []);

  return (
    <div>
      <Typography textAlign="center" variant="h3">
        Check your email inbox!
      </Typography>
      <Typography textAlign="center">
        A sign in button will have magically appeared.
      </Typography>
      <Typography textAlign="center">
        We&apos;ll keep refreshing this page until you click the sign in button.
      </Typography>
    </div>
  );
};

export default CheckEmail;

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
