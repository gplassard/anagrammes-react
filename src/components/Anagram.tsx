import React, {useState} from "react";
import {Node} from "../algorithm/Node";

const node = Node.newRoot();
export const Anagram: React.FC = () => {
    const [anagrams, setAnagrams] = useState<string[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const startLoading = () => {
        setIsLoading(true);
        fetch("data/dictionary_fr.txt")
            .then(r => r.text())
            .then(body => body.split("\n"))
            .then(entries => {
                entries.forEach(entry => {
                    node.add(entry.replaceAll("\r", ""))
                });
                setIsLoading(false);
            });
    };

    const searchAnagrams = () => {
        const results = Array.from(node.anagram('bon courage', 3));
        setAnagrams(results);
    };

    return (<>
        {anagrams == null ?  <h1>Anagrammes</h1> : <h1>Anagrammes ({anagrams.length} résultat(s))</h1>}
        <p>Loading : {JSON.stringify(isLoading)}</p>
        <button onClick={startLoading}>Charger le dictionnaire</button>
        <button onClick={searchAnagrams}>Rechercher les anagrammes</button>
        <ul>
            {(anagrams || []).map((a, i) => (<li key={i}>{a}</li>))}
        </ul>
    </>);
}
