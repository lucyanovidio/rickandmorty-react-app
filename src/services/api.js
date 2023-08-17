import axios from 'axios';

const baseURL = "https://rickandmortyapi.com/api/character/";
const pagesURL = `${baseURL}?page=`;

export async function getPageInfo(page) {
    try {
        const { data } = await axios.get(
            `${pagesURL}${page}`
        );

        return data;
    } catch (error) {
        alert("Houve erro!");
        console.error(error);
    }
}

export async function getSingleCharInfo(id) {
    try {
        const { data } = await axios.get(
            `${baseURL}${id}`
        );

        return data;
    } catch (error) {
        alert("Houve erro!");
        console.error(error);
    }
}