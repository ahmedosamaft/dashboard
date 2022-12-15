import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import { Button, IconButton } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { useCookies } from "react-cookie";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

export default function Pop() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const [cookies, , removerCookies] = useCookies();

  const logoutHandler = (e) => {
    removerCookies("user");
    removerCookies("_id");
  };

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        sx={{
          bgcolor: "#101827",
          "&:hover": {
            bgcolor: "#283857",
          },
        }}
        onClick={handleClick}
        endIcon={<Logout />}
      >
        Logout
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box
          sx={{
            border: 1,
            p: 1,
            backgroundColor: "rgba(0,0,0,0.8)",
            borderRadius: "5px",
            position: "absolute",
            right: "0",
            width: "250px",
            textAlign: "center",
            marginTop: "20px",
            color: "#fff",
          }}
        >
          <h4>Are you Sure to logout?</h4>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              gap: "5px",
              alignItems: "center",
            }}
          >
            <Button
              aria-label="logout"
              color="success"
              variant="contained"
              onClick={handleClick}
            >
              <ClearIcon />
            </Button>
            <Button
              aria-label="logout"
              color="error"
              variant="contained"
              onClick={logoutHandler}
            >
              <CheckIcon />
            </Button>
          </Box>
        </Box>
      </Popper>
    </div>
  );
}
