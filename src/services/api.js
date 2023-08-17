import axios from "axios";

const baseURL = "https://rickandmortyapi.com/api/character/";
const pagesURL = `${baseURL}?page=`;

const translationBaseURL = "https://api.mymemory.translated.net/get?q=";

export async function getPageInfo(page) {
  try {
    const { data } = await axios.get(`${pagesURL}${page}`);
    return data;
  } catch (error) {
    alert("Houve erro!");
    console.error(error);
  }
}

export async function getSingleCharInfo(id) {
  try {
    const { data } = await axios.get(`${baseURL}${id}`);
    return data;
  } catch (error) {
    alert("Houve erro!");
    console.error(error);
  }
}

export async function translate(text) {
  try {
    const { data } = await axios.get(
      `${translationBaseURL}${text}&langpair=en|pt-BR"`
    );
    return data.responseData.translatedText;
  } catch (error) {
    alert("Houve erro na tradução!");
    console.log(error);
  }
}
