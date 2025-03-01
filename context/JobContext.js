'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    jobCategory: '',
    employmentType: '',
    remoteOnly: false
  });

  useEffect(() => {
    const controller = new AbortController();
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://jsonfakery.com/jobs', {
          signal: controller.signal
        });

        const jobsData = response.data || [];

        setJobs(jobsData);
        setFilteredJobs(jobsData);

        const uniqueCategories = [...new Set(jobsData.map(job => job.job_category))];
        setCategories(uniqueCategories);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error('Error fetching jobs:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    let result = jobs;

    const lowerSearchTerm = searchTerm.toLowerCase();
    const lowerLocation = filters.location.toLowerCase();
    const lowerJobCategory = filters.jobCategory.toLowerCase();
    const lowerEmploymentType = filters.employmentType.toLowerCase();

    if (searchTerm) {
      result = result.filter(
        job =>
          job.title.toLowerCase().includes(lowerSearchTerm) ||
          job.company.toLowerCase().includes(lowerSearchTerm)
      );
    }

    if (filters.location) {
      result = result.filter(job => job.location.toLowerCase().includes(lowerLocation));
    }

    if (filters.jobCategory) {
      result = result.filter(job => job.job_category.toLowerCase() === lowerJobCategory);
    }

    if (filters.employmentType) {
      result = result.filter(job => job.employment_type.toLowerCase() === lowerEmploymentType);
    }

    if (filters.remoteOnly) {
      result = result.filter(job => job.is_remote_work === 1);
    }

    setFilteredJobs(result);
  }, [jobs, searchTerm, filters]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const updateFilters = (newFilters) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        filteredJobs,
        loading,
        searchTerm,
        filters,
        categories,
        handleSearch,
        updateFilters
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => useContext(JobContext);
