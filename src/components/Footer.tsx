import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box sx={{ py: 3, textAlign: "center" }}>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Simen Sandhaug
      </Typography>
    </Box>
  );
};

export default Footer;
