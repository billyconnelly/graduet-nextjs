import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        {/* <Logo /> */}
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          Graduet
        </Typography>
        {!session ? (
          <Button onClick={() => signIn()} color="inherit">
            Sign in
          </Button>
        ) : (
          <Button onClick={() => signOut()} color="inherit">
            Sign out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
