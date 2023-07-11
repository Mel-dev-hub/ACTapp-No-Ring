import axios from 'axios';

export const getAllEntries = async () => {
    return await axios.get("http://localhost:3001/entries");
};

export const addEntry = async (entry) => {
    return await axios.post('http://localhost:3001/entries', entry);
};

export const getEntry = async (entryId) => {
    return await axios.get('http://localhost:3001/entries/'+entryId);
};