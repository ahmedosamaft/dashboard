import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2"; // Grid version 2
import {
  Avatar,
  Box,
  Card,
  CardContent,
  
  
  LinearProgress,
  Typography,
} from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
export default function DashboardBody() {
  return (
    <Grid2 container spacing={2}>
      <Grid2 md={3} sm={6}>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  fontSize={12}
                  fontWeight="bold"
                  fontFamily='Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"'
                  color={"rgb(209, 67, 67)"}
                >
                  BUDGET
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight="800"
                  gutterBottom
                  fontFamily='Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"'
                >
                  $24k
                </Typography>
              </Box>
              <Avatar
                sx={{
                  bgcolor: "rgb(209, 67, 67)",
                  width: "56px",
                  height: "56px",
                }}
              >
                <LocalAtmIcon />
              </Avatar>
            </Box>

            <Box
              display="flex"
              gap={2}
              justifyContent="flex-start"
              alignItems="center"
            >
              <Typography
                color="error"
                sx={{ display: "flex", alignItems: "center", fontSize: "12px" }}
              >
                <ArrowDownwardIcon color="error" />
                12%
              </Typography>
              <Typography
                variant="subtitle2"
                color="rgb(101, 116, 139);"
                alignItems="center"
                fontFamily='Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"'
                fontSize={12}
              >
                Since last month
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid2>
      <Grid2 md={3} sm={6}>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  fontSize={12}
                  textTransform="uppercase"
                  fontWeight="bold"
                  fontFamily='Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"'
                  color={"rgb(20, 184, 166)"}
                >
                  TOTAL customers
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight="800"
                  gutterBottom
                  fontFamily='Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"'
                >
                  1,6k
                </Typography>
              </Box>
              <Avatar
                sx={{
                  bgcolor: "rgb(20, 184, 166)",
                  width: "56px",
                  height: "56px",
                }}
              >
                <LocalAtmIcon />
              </Avatar>
            </Box>

            <Box
              display="flex"
              gap={2}
              justifyContent="flex-start"
              alignItems="center"
            >
              <Typography
                sx={{ display: "flex", alignItems: "center", fontSize: "12px" }}
              >
                <ArrowUpwardIcon sx={{ color: "rgb(20, 184, 166)" }} />
                16%
              </Typography>
              <Typography
                variant="subtitle2"
                color="rgb(101, 116, 139);"
                alignItems="center"
                fontSize={12}
              >
                Since last month
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid2>
      <Grid2 md={3} sm={6}>
        <Card sx={{ height: "141px" }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  fontSize={12}
                  fontWeight="bold"
                  fontFamily='Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"'
                  color={"rgb(255, 176, 32)"}
                >
                  TASKS PROGRESS
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight="800"
                  gutterBottom
                  fontFamily='Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"'
                >
                  75.5%
                </Typography>
              </Box>
              <Avatar
                sx={{
                  bgcolor: "rgb(255, 176, 32)",
                  width: "56px",
                  height: "56px",
                }}
              >
                <LocalAtmIcon />
              </Avatar>
            </Box>

            <Box marginTop={2}>
              <LinearProgress variant="determinate" value={75} color="warning" />
            </Box>
          </CardContent>
        </Card>
      </Grid2>
      <Grid2 md={3} sm={6}>
        <Card sx={{ height: "141px" }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  fontSize={12}
                  fontWeight="bold"
                  textTransform="uppercase"
                  fontFamily='Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"'
                  color={"rgb(80, 72, 229)"}
                >
                  Total profit
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight="800"
                  gutterBottom
                  fontFamily='Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"'
                >
                  $32K
                </Typography>
              </Box>
              <Avatar
                sx={{
                  bgcolor: "rgb(80, 72, 229)",
                  width: "56px",
                  height: "56px",
                }}
              >
                <AttachMoneyIcon />
              </Avatar>
            </Box>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
}
