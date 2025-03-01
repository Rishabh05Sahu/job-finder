import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Box className="flex flex-col items-center justify-center py-12">
      <Typography variant="h3" className="font-bold mb-4 text-gray-700">
        404 - Page Not Found
      </Typography>
      <Typography variant="h6" className="mb-6 text-gray-500">
        The page youre looking for doesnt exist or has been moved.
      </Typography>
      <Link href="/">
        <Button variant="contained" className="bg-blue-600 hover:bg-blue-700">
          Go back home
        </Button>
      </Link>
    </Box>
  );
}