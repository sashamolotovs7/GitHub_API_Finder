// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
    name: string;
    login: string;
    location?: string;
    avatar_url: string;
    email?: string;
    html_url: string;
    company?: string;
}