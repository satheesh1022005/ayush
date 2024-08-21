import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CompanyCard from './CompanyCard';
import axios from 'axios';
import axiosInstance from '../../config';

function Home() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanyData();
  }, []);



  const fetchCompanyData = async () => {
    try {
      const response = await axiosInstance.get('http://localhost:5000/api/government/startups');
      console.log(response);
      console.log("Fetched data:", response.data); // Log the data instead of the response object
      setCompanies(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <div className="container py-5">
      {loading ? (
        <p className="text-center fs-4 fw-bold">Loading...</p>
      ) : (
        companies.length > 0 ? (
          <div className="row justify-content-center">
            {companies.map((company) => (
              <div key={company.id} className="col-md-4 col-sm-6 col-12 mb-4 p-2">
                <CompanyCard {...company} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center fs-4 fw-bold">No companies found</p>
        )
      )}
    </div>
  );
}

export default Home;