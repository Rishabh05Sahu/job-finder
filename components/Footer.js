import { Box, Typography, Container } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" className="py-6 bg-gray-100 mt-auto">
      <Container>
        <Typography variant="body2" color="textSecondary" align="center">
          Copyright © {new Date().getFullYear()} Job Finder
        </Typography>
      </Container>
    </Box>
  );
}