// src/components/ShowDetails.js
import React from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get show ID

const ShowDetails = ({ shows }) => {
  const { id } = useParams(); // Get show ID from URL params
  const show = shows.find(item => item.show.id === parseInt(id)); // Find show by ID

  if (!show) {
    return <div>Show not found</div>;
  }

  return (
    <div>
      <h1>{show.show.name}</h1>
      <img src={show.show.image ? show.show.image.original : ''} alt={show.show.name} />
      <p>{show.show.summary}</p>
      {/* Additional details about the show */}
    </div>
  );
};

export default ShowDetails;
