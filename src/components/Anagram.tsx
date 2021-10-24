import React, {useEffect, useState} from "react";
import {Node} from "../algorithm/Node";
import {Result} from "./Result";

const node = Node.newRoot();
export const Anagram: React.FC = () => {
    const [anagrams, setAnagrams] = useState<string[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [sentence, setSentence] = useState("bon courage");

    useEffect(() => {
        setIsLoading(true);
        fetch(process.env.PUBLIC_URL + "/data/dictionary_fr.txt")
            .then(r => r.text())
            .then(body => body.split("\n"))
            .then(entries => {
                entries.forEach(entry => {
                    node.add(entry.replaceAll("\r", ""))
                });
                setIsLoading(false);
            });
    }, []);

    const searchAnagrams = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        const results = Array.from(node.anagram(sentence, 1));
        setAnagrams(results);
        e.preventDefault();
    };

    return (<>
        <h1>Anagrammes</h1>
        {isLoading ? <p>Chargement du dictionnaire...</p> : null}
        <form onSubmit={searchAnagrams}>
            <div>
                <label htmlFor="sentence">Phrase</label>
                <input type="text" name="sentence" autoFocus={true} value={sentence} onChange={(e) => setSentence(e.target.value)}/>
            </div>
            <button disabled={isLoading} onClick={searchAnagrams}>Rechercher les anagrammes</button>
        </form>
        { anagrams ? <Result anagrams={anagrams} /> : null}
    </>);
}
