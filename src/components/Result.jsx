import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { REACT_BACKEND_URL } from '../config'
import "./Result.css"
const Result = () => {
    const [results,setResults] = useState(null);

    useEffect(() => {
        const data = async () => {
            const res = await axios.get(`${REACT_BACKEND_URL}/api/votes/admin/results`);
            console.log(res)
            setResults(res.data)
        }
        data()
    }, [])
    return (
        <div>
            Results
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Vote Count</th>
                    </tr>
                </thead>
                <tbody>
                    {results?.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.vote_count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Result
