// src/components/ShowList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchShows } from '../services/api';
import '../ShowList.css'; // Import CSS file

const stripHtmlTags = (html) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};

const ShowList = () => {
  const [shows, setShows] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchShows();
        setShows(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>; // Apply CSS class for loading
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (shows.length === 0) {
    return <div>No shows available</div>;
  }

  return (
    <div className="show-list-container"> {/* Apply CSS class for container */}
      <h1>Show List</h1>
      <div className="row">
        {shows.map(show => (
          <div key={show.show.id} className="col-md-4 mb-4"> {/* Apply Bootstrap grid classes */}
            <div className="card h-100">
              <img src={show.show.image ? show.show.image.medium : ''} className="card-img-top" alt={show.show.name} />
              <div className="card-body">
                <h5 className="card-title">{show.show.name}</h5>
                <p className="card-text">{stripHtmlTags(show.show.summary)}</p> {/* Strip HTML tags from summary */}
                <Link to={`/show/${show.show.id}`} className="btn btn-primary">View Details</Link> {/* Apply Bootstrap button classes */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowList;
