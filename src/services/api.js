import axios from 'axios';

const baseURL = "https://rickandmortyapi.com/api/character/";
const pagesURL = `${baseURL}?page=`;

export async function getChars(page) {
    try {
        const { data } = await axios.get(
            `${pagesURL}${page}`
        );
        return data;
    } catch (error) {
        alert("Houve erro!");
        console.log(error);
    }
}

export async function getSingleChar(id) {
    try {
        const { data } = await axios.get(
            `${baseURL}${id}`
        );
        return data;
    } catch (error) {
        alert("Houve erro!");
        console.log(error);
    }
}