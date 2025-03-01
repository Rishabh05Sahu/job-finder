'use client';

import { useState } from 'react';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import { useJobContext } from '@/context/JobContext';

export default function Header() {
  const { handleSearch } = useJobContext();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <AppBar position="static" className="bg-blue-600 ">
      <Toolbar className="flex justify-between mx-3">
        <Link href="/" className="no-underline text-white">
          <Typography variant="h6" className="font-bold">
            Job Finder
          </Typography>
        </Link>

        <Box component="form" onSubmit={handleSubmit} className=" flex items-center bg-white bg-opacity-20 px-2 py-1 rounded-md">
          <SearchIcon sx={{ color: "black" }} className="text-white mr-2 " />
          <InputBase
            placeholder="Search by Title or Company"
            className="text-white w-[40vw]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Box>


      </Toolbar>
    </AppBar>
  );
}