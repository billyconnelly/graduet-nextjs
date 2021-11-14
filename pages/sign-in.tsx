// pages/signin.jsx
import {
  Button,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  getProviders,
  getCsrfToken,
  signIn,
  getSession,
} from "next-auth/react";
import { useState } from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import { useRouter } from "next/router";

const SignIn = ({ getProviders, getCsrfToken }) => {
  const initialFormData = {
    emailAddress: "",
    password: "",
  };

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form method="post" action="/api/auth/signin/email">
      <Grid container spacing={2}>
        <TextField
          sx={{ display: "none" }}
          name="csrfToken"
          defaultValue={getCsrfToken}
        />
        <Grid item xs={12}>
          <Typography textAlign="center" variant="h2">
            Sign in
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={1} sm={4} />
        {Object.values(getProviders).map((provider) => {
          if (provider.name === "Email") {
            return;
          }
          return (
            <Grid key={provider.name} item xs={10} sm={4}>
              <Button
                size="large"
                variant="contained"
                fullWidth
                startIcon={<LinkedInIcon />}
                onClick={() => signIn(provider.id)}
              >
                Sign in with {provider.name}
              </Button>
            </Grid>
          );
        })}
        <Grid item xs={1} sm={4} />
        <Grid item xs={12}>
          <Divider>
            <Chip label="OR" />
          </Divider>
        </Grid>
        {/* <Grid item xs={12}>
          <Typography textAlign="center" variant="h4">
            Sign in with your email address
          </Typography>
        </Grid> */}
        <Grid item xs={1} sm={4} />
        <Grid item xs={10} sm={4}>
          <TextField
            type="text"
            required
            fullWidth
            label="Email address"
            onChange={handleChange}
            id="email"
            name="email"
          />
        </Grid>
        <Grid item xs={1} sm={4} />
        <Grid item xs={1} sm={4} />
        <Grid item xs={10} sm={4}>
          <Button
            size="large"
            startIcon={<EmailIcon />}
            type="submit"
            fullWidth
            variant="contained"
          >
            Sign in with email
          </Button>
        </Grid>
        <Grid item xs={1} sm={4} />
      </Grid>
    </form>
  );
};

export default SignIn;

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
    props: {
      getProviders: await getProviders(),
      getCsrfToken: await getCsrfToken(context),
    },
  };
};
