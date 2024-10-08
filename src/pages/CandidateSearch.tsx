import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser, checkRateLimit } from "../api/API";
import { Candidate } from "../interfaces/Candidate.interface";
import '../index.css'; // Import external CSS for styling

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [username, setUsername] = useState(""); // New state for search input
  const [searchError, setSearchError] = useState<string | null>(null); // State to track search errors

  // Fetch a random candidate using the existing API
  const fetchCandidate = async () => {
    await checkRateLimit(); // Check rate limits before making API requests

    const result = await searchGithub();
    if (result && result.length > 0) {
      const userDetails = await searchGithubUser(result[0].login); // Get detailed info for the first user in the list
      setCandidate(userDetails);
    }
  };

  // Load saved candidates from local storage when component mounts
  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    setSavedCandidates(storedCandidates);
    fetchCandidate(); // Call fetch candidate and rate limit checker
  }, []);

  // Save the current candidate and persist to local storage
  const handleSave = () => {
    if (candidate) {
      const updatedCandidates = [...savedCandidates, candidate];
      setSavedCandidates(updatedCandidates);
      localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates)); // Persist to local storage
      fetchCandidate(); // Fetch the next candidate
    }
  };

  // Skip the current candidate without saving
  const handleSkip = () => {
    fetchCandidate();
  };

  // Handle searching for a candidate by username
  const handleSearch = async () => {
    if (username.trim() === "") return; // Prevent empty searches

    setSearchError(null); // Reset any previous errors
    try {
      const userDetails = await searchGithubUser(username);
      if (userDetails && userDetails.login) {
        setCandidate(userDetails);
      } else {
        setSearchError("User not found");
        setCandidate(null); // Clear the candidate display if user not found
      }
    } catch (error) {
      setSearchError("An error occurred while searching");
    }
  };

  return (
    <div className="candidate-container">
      {/* Search section */}
      <div className="search-section">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Search GitHub user by username"
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      {searchError && <p className="error-text">{searchError}</p>} {/* Display search error if any */}

      {/* Candidate display */}
      {candidate ? (
        <>
          <div className="candidate-box">
            <img src={candidate.avatar_url} alt={candidate.name} className="candidate-avatar" />
            <h1>{candidate.name}</h1>
            <p>Username: {candidate.login}</p>
            <p>Location: {candidate.location || "N/A"}</p>
            <p>Email: {candidate.email || "N/A"}</p>
            <p>Company: {candidate.company || "N/A"}</p>
            <p>Bio: {candidate.bio || "No bio available"}</p> {/* Display the Bio */}
          </div>

          {/* GitHub Profile and Save/Skip Buttons outside the box */}
          <div className="action-section">
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
            <div className="icon-buttons-container">
              <button className="icon-button green-circle" onClick={handleSave}>+</button>
              <button className="icon-button red-circle" onClick={handleSkip}>-</button>
            </div>
          </div>
        </>
      ) : (
        <h2>No more candidates available</h2>
      )}
    </div>
  );
};

export default CandidateSearch;
