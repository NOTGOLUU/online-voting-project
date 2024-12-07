// src/components/CandidateList.js
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './CandidateList.css'; // Create this CSS file for styling
import { REACT_BACKEND_URL } from '../config';
import { AuthContext } from '../context/AuthContext';

const CandidateList = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const data  = useContext(AuthContext);
    console.log("Context data ",data.auth.user.id)

    useEffect(() => {
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {
        try {
            const response = await axios.get(`${REACT_BACKEND_URL}/api/candidates`);
            setCandidates(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching candidates:', err);
            setError('Failed to load candidates.');
            setLoading(false);
        }
    };

    const vote = async (candidate_id) => {
        if (!window.confirm('Are you sure you want to vote for this candidate?')) return;

        try {
            const response = await axios.post(`${REACT_BACKEND_URL}/api/votes`, { candidate_id,user_id:data.auth.user.id });
            alert(response.data.message);
        } catch (err) {
            console.error('Error voting:', err);
            alert('Failed to record vote. Please try again.');
        }
    };

    if (loading) return <p>Loading candidates...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="candidate-list">
            <h2>Vote for Your Preferred Candidate</h2>
            <div className="candidates">
                {candidates.map(candidate => (
                    <div key={candidate.id} className="candidate-card">
                        <h3>{candidate.name}</h3>
                        <p>{candidate.description}</p>
                        <button onClick={() => vote(candidate.id)}>Vote</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CandidateList;
