// Log the GitHub token to verify if it is being loaded correctly
console.log('GitHub Token:', import.meta.env.VITE_GITHUB_TOKEN);

// Function to check GitHub API rate limits
const checkRateLimit = async () => {
  try {
    const response = await fetch('https://api.github.com/rate_limit', {
      headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`, // Use your GitHub token
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Error fetching rate limits');
    }

    console.log('Rate limit status:', data); // Logs your rate limit status
  } catch (err) {
    console.error('An error occurred while checking rate limits:', err);
  }
};

// Function to fetch random GitHub users
const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;

    // Log the URL and headers being used in the API request
    console.log(`Fetching GitHub users with token: ${import.meta.env.VITE_GITHUB_TOKEN}`);
    console.log(`Request URL: https://api.github.com/users?since=${start}`);

    // Fetch the users from the GitHub API
    const response = await fetch(`https://api.github.com/users?since=${start}`, {
      headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`, // Correct token format
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid API response, check the network tab');
    }

    return data;
  } catch (err) {
    console.error('An error occurred while fetching GitHub users:', err);
    return [];
  }
};

// Function to search a specific GitHub user by username
const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`, // Correct token format
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid API response, check the network tab');
    }

    return data;
  } catch (err) {
    console.error(`An error occurred while fetching GitHub user ${username}:`, err);
    return {};
  }
};

// Export the functions
export { searchGithub, searchGithubUser, checkRateLimit };
