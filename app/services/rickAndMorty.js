import axios from 'axios';

export const getRickAndMortyList = async () =>
    await axios.get('https://rickandmortyapi.com/api/character');

export const getRickAndMortyCharacter = async (name) =>
    await axios.get('https://rickandmortyapi.com/api/character/?name='+ name);

export const getRickAndMortyListPageToMove = async (urlToMove) =>
    await axios.get(urlToMove);