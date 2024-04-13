import React, { useEffect, useState } from "react";
// import DisplayData from './DisplayData';
import "./filter.scss"; // Import CSS file for styling

const Dashboard = ({data}) => {
  const [filters, setFilters] = useState({
    endYear: "",
    topics: "",
    sector: "",
    region: "",
    PEST: "",
    source: "",
    SWOT: "",
    country: "",
    city: "",
  });

  const [filterdata, setFilterdata] = useState([]);
  const fetchData = async () => {
    const fetchfilters = {

        sector: filters.sector,
        topic:  filters.topics ,
        region: filters.region,
        country:filters.country,
        source:filters.source,

  
    };
    console.log(fetchfilters.sector);
  
    try {
      
      const response = await fetch('http://localhost:4444/postFilterWiseData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fetchfilters)
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const data = await response.json();
      
      setFilterdata(data.data)
      console.log("aaks",data); // Handle the filtered data received from the backend
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };
  
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };
  const handleClick = (event) => {
    fetchData();
   
  //  console.log('han' ,data);

  //  console.log("filterrrrrsssssssss",filterdata);
  };

  // const handleClick = (event) => {
  //   const filteredData = data.filter((item) => {
  //     console.log("filterrrreesssssss",filteredData);
  //     for (let key in filters) {
  //       if (filters[key] !== "" && item[key] !== filters[key]) {
  //         return false;
  //       }
  //     }
  //     return true;
  //   });
  //   setFilterdata(filteredData);
   
  // };
  
useEffect(()=>{
  fetchData();
},[]);

  return (
    <div className="dashboard-container">
      {/* Filter inputs */}
      <div className="input-container">
        <span> Enter Year :-</span>
        <select
          name="end_year"
          value={filters.end_year}
          onChange={handleFilterChange}
          className="select"
        >
          <option value="">Select Endyear</option>
          <option value="2017">2017</option>
          <option value="2020">2020</option>
          <option value="2030">2030</option>
          <option value="2017">2017</option>
          <option value="2035">2035</option>
          {/* Add more options as needed */}
        </select>
      </div>

      <div className="input-container">
        <span>Topics :-</span>
        <select
          name="topics"
          value={filters.topics}
          onChange={handleFilterChange}
          className="select"
        >
          <option value="">Select Topic</option>
          <option value="growth">growth</option>
          <option value="consumption">consumption</option>
          <option value="production">production</option>
          <option value="oil">oil</option>
          <option value="gas">gas</option>
          {/* Add more options as needed */}
        </select>
      </div>
      {/* source */}
      <div className="input-container">
        <span>Source :- </span>
        <select
          name="source"
          value={filters.source}
          onChange={handleFilterChange}
          className="select"
        >
          <option value="">Select a Source</option>
          <option value="EIA">EIA</option>
          <option value="World Bank">World Bank</option>
          <option value="DOE EIA 2013 Energy Conference">DOE EIA 2013 Energy Conference</option>
          <option value="EY">EY</option>
          <option value="	NDTV">	NDTV</option>
          {/* Add more options as needed */}
        </select>




     
      </div>

      <div className="input-container">
        <span>Sector :-</span>
        <select
          name="sector"
          value={filters.sector}
          onChange={handleFilterChange}
          className="select"
        >
          <option value="">Select a Sector</option>
          <option value="Energy">Energy</option>
          <option value="Environment">Environment</option>
          <option value="Government">Government</option>
          <option value="topic3">Manufacturing</option>
          <option value="topic3">Others</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="input-container">
        <span>Country :-</span>
        <select
          name="country"
          value={filters.country}
          onChange={handleFilterChange}
          className="select"
        >
          <option value="">Select a Country</option>
          <option value="United States of America">United States of America</option>
          <option value="India">India</option>
          <option value="Russia">Russia</option>
          <option value="Egypt">Egypt</option>
          <option value="	China">	China</option>
          {/* Add more options as needed */}
        </select>
      </div>

      
    
      <div className="input-container">
      <button className="input-button" onClick={handleClick}>Apply filter</button>
      </div>
      

      {/* Display filtered data */}
      <DisplayData filters={filterdata} />

    </div>
  );
};

const DisplayData = ({ filters }) => {

    console.log("filterrrrrrrrrr",filters);
  return (
    <div className="data-container">
      <p className="data-title">Filtered Data:</p>
      <table className="data-table">
        <thead>
          <tr>
          
            <th>End Year</th>
            <th>Topics</th>
            <th>Sector</th>
            
            <th>Source</th>
            <th>Country</th>
            
            {/* <th>City</th> */}
          </tr>
        </thead>
        <tbody>
          {filters.map((item) => (
            <tr key={item.id}>
              <td>{item.end_year}</td>
              <td>{item.topic}</td>
              <td>{item.sector}</td>
            
              <td>{item.source}</td>
            
              <td>{item.country}</td>
              {/* <td>{item.city}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
