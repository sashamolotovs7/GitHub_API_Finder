import { useState, useEffect } from "react";
import { Candidate } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const candidates = JSON.parse(
      localStorage.getItem("savedCandidates") || "[]"
    );
    setSavedCandidates(candidates);
  }, []);

  return (
    <div>
      <h1>Saved Candidates</h1>
      {savedCandidates.length > 0 ? (
        savedCandidates.map((candidate) => (
          <div key={candidate.login}>
            <img src={candidate.avatar_url} alt={candidate.name} width="150" />
            <h1>{candidate.name}</h1>
            <p>Username: {candidate.login}</p>
            <p>Location: {candidate.location}</p>
            <p>Email: {candidate.email}</p>
            <p>Company: {candidate.company}</p>
            <a href={candidate.html_url}>GitHub Profile</a>
          </div>
        ))
      ) : (
        <p>No candidates saved</p>
      )}
    </div>
  );
};

export default SavedCandidates;
