import React, { useEffect, useState } from 'react';

interface Rental {
  id: number;
  title: string;
  description: string;
  price: number;
}

const RentalList: React.FC = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await fetch('/api/rentals/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRentals(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Rental Listings</h1>
      <ul>
        {rentals.map((rental) => (
          <li key={rental.id}>
            <h2>{rental.title}</h2>
            <p>{rental.description}</p>
            <p>Price: ${rental.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RentalList;