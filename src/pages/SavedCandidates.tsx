import { useState, useEffect } from "react";
import { Candidate } from "../interfaces/Candidate.interface";
import '../index.css';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Remove duplicates based on the candidate's login (unique GitHub username)
  const removeDuplicates = (candidates: Candidate[]) => {
    const uniqueCandidates = candidates.reduce((acc: Candidate[], candidate) => {
      if (!acc.some(item => item.login === candidate.login)) {
        acc.push(candidate);
      }
      return acc;
    }, []);
    return uniqueCandidates;
  };

  // Load saved candidates from localStorage
  useEffect(() => {
    const candidates = JSON.parse(
      localStorage.getItem("savedCandidates") || "[]"
    );
    setSavedCandidates(removeDuplicates(candidates));
  }, []);

  // Function to handle candidate removal
  const handleRemove = (login: string) => {
    const updatedCandidates = savedCandidates.filter(
      candidate => candidate.login !== login
    );
    setSavedCandidates(updatedCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  };

  return (
    <div className="saved-candidates-container">
      <h1 className="page-title">Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <table className="candidates-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.login}>
                <td>
                  <img
                    src={candidate.avatar_url}
                    alt={candidate.name}
                    className="candidate-avatar-table"
                  />
                </td>
                <td>
                  <strong>{candidate.name}</strong> <br />
                  <em>({candidate.login})</em>
                </td>
                <td>{candidate.location || "N/A"}</td>
                <td>
                  <a href={`mailto:${candidate.email}`}>
                    {candidate.email || "N/A"}
                  </a>
                </td>
                <td>{candidate.company || "N/A"}</td>
                <td>{candidate.bio || "No bio available"}</td>
                <td>
                  <button 
                    className="table-icon-button red-circle"
                    onClick={() => handleRemove(candidate.login)}
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No candidates saved</p>
      )}
    </div>
  );
};

export default SavedCandidates;
