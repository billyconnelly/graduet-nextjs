import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { createTheme } from "@mui/material/styles";
import { Box, ThemeProvider } from "@mui/system";
import { AppProps } from "next/app";
import Navbar from "../components/Navbar";

const theme = createTheme({
  typography: {
    fontFamily: "Fredoka One",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Box
          border="10px solid white"
          margin="10px auto"
          padding="20px"
          maxWidth="lg"
          sx={{ backgroundColor: "lightgray", borderRadius: "20px" }}
        >
          <Component {...pageProps} />
          {/* { useSession() ? <Component {...pageProps} /> : <h1>Hello</h1>} */}
        </Box>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
