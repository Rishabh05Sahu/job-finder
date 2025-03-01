
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import Link from 'next/link';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function JobCard({ job }) {

  const formatSalary = () => {
    if (job.salary_from !== undefined && job.salary_to !== undefined) {
      return `₹${job.salary_from} - ₹${job.salary_to}`;
    }
    return "Salary not specified";
  };

  return (
    <Link href={`/jobs/${job.id}`} className="no-underline">
      <Card className="h-full hover:shadow-lg transition-shadow duration-300 hover:border-blue-500 border-2 border-transparent">
        <CardContent>
          <Typography variant="h6" component="div" className="font-bold text-blue-600 mb-2">
            {job.title}
          </Typography>
          
          <Typography variant="subtitle1" color="textSecondary" className="mb-2">
            {job.company}
          </Typography>
          
          <Box className="flex items-center mb-2">
            <LocationOnIcon fontSize="small" className="text-gray-500 mr-1" />
            <Typography variant="body2" color="textSecondary">
              {job.location || "Location not specified"}
            </Typography>
          </Box>
          
          <Box className="flex items-center mb-2">
            <AttachMoneyIcon fontSize="small" className="text-gray-500 mr-1" />
            <Typography variant="body2" color="textSecondary">
              {formatSalary()}
              
            </Typography>
          </Box>
          
          <Box className="flex items-center mb-3">
            <WorkIcon fontSize="small" className="text-gray-500 mr-1" />
            <Typography variant="body2" color="textSecondary">
              {job.employment_type || "Type not specified"}
            </Typography>
          </Box>
          
          <Box className="flex flex-wrap gap-1 mt-2">
            {job.is_remote_work && (
              <Chip 
                label="Remote" 
                size="small" 
                className="bg-green-100 text-green-800"
              />
            )}
            {job.category && (
              <Chip 
                label={job.category} 
                size="small" 
                className="bg-blue-100 text-blue-800"
              />
            )}
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}