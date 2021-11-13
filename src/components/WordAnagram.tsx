import React, {useEffect, useState} from "react";
import {Result} from "./Result";
import {mapIsSubsetOf, wordToCharacterMap, wordToSortedCharacters} from "../algorithm/utils";

export interface Props {
    dictionary: string[]
}

export const WordAnagram: React.FC<Props> = (props) => {
    const [characters, setCharacters] = useState("SENTTERFUELNEEMANANNITTERIZFRDAVEIOELOESUQAEULVC");
    const [useAllCharacters, setUseAllCharacters] = useState(true);
    const [anagrams, setAnagrams] = useState<string[]>([]);
    const [dictionaryMap, setDictionaryMap] = useState<Map<string, string[]>>(new Map());
    const [charactersMaps, setCharactersMaps] = useState<{word: string, charactersMap: Map<string, number>}[]>([]);

    useEffect(() => {
        const map = new Map<string, string[]>();
        const charactersMaps: {word: string, charactersMap: Map<string, number>}[] = [];
        props.dictionary.forEach(word => {
            const key = wordToSortedCharacters(word);
            const anagrams = map.get(key) || [];
            map.set(key, [...anagrams, word]);
            charactersMaps.push({word: word, charactersMap: wordToCharacterMap(word)});
        });
        setDictionaryMap(map);
        setCharactersMaps(charactersMaps);
    }, [props.dictionary]);

    const searchAnagrams = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        const wordToSearch = characters.toLowerCase().replaceAll(/\s/g, '');
        if (useAllCharacters) {
            setAnagrams(dictionaryMap.get(wordToSortedCharacters(wordToSearch)) || []);
        } else {
            const characterMap = wordToCharacterMap(wordToSearch);
            const words = charactersMaps
                .filter(({word, charactersMap}) => mapIsSubsetOf(charactersMap, characterMap))
                .map(({word}) => word);
            setAnagrams(words);
        }
        e.preventDefault();
    }

    return (<>
        <h1>Anagrammes de mots</h1>
        <form onSubmit={searchAnagrams}>
            <div>
                <label htmlFor="characters">Charactères</label>
                <input type="text" name="characters" autoFocus={true} value={characters}
                       onChange={(e) => setCharacters(e.target.value.trim())}/>
            </div>
            <div>
                <label htmlFor="useAllCharacters">Utiliser tous les charactères</label>
                <input type="checkbox" name="useAllCharacters" checked={useAllCharacters}
                       onChange={(e) => setUseAllCharacters(!useAllCharacters)}/>
            </div>
            <button onClick={searchAnagrams}>Rechercher les anagrammes</button>
        </form>
        <Result anagrams={anagrams} isSentenceResults={false}/>
    </>)
};
