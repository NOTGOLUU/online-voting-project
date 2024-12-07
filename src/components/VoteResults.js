// src/components/VoteResults.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VoteResults.css'; 

const VoteResults = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchResults();
        // Optionally, set up polling to refresh results periodically
        // const interval = setInterval(fetchResults, 5000);
        // return () => clearInterval(interval);
    }, []);

    const fetchResults = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/votes/counts');
            console.log('API Response:', response.data);
            setResults(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching results:', err);
            setError('Failed to load results.');
            setLoading(false);
        }
    };

    if (loading) return <p>Loading results...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="vote-results">
            <h2>Current Vote Counts</h2>
            <table>
                <thead>
                    <tr>
                        <th>Candidate</th>
                        <th>Votes</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map(result => (
                        <tr key={result.id}>
                            <td>{result.name}</td>
                            <td>{result.vote_count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VoteResults;
