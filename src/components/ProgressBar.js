import React from "react";
import { LinearProgress, Box, Typography } from "@mui/material";

const ProgressBar = ({ progress }) => {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          progress
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

export default ProgressBar;
