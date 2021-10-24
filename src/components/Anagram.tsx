import React, {useEffect, useState} from "react";
import {Node} from "../algorithm/Node";
import {Result} from "./Result";

const node = Node.newRoot();

export interface IterationState {
    generator: Generator<string>
    elements: string[]
    isDone: boolean
}

export const Anagram: React.FC = () => {
    const MAX_RESULTS = 5_000;
    const [anagrams, setAnagrams] = useState<IterationState | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [sentence, setSentence] = useState("bon courage");
    const [minWordLength, setMinWordLength] = useState(3);

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
        let iterable = node.anagram(sentence, minWordLength);
        let current = iterable.next();
        let results = [];
        let count = 0;
        while (!current.done && count < MAX_RESULTS) {
            results.push(current.value);
            current = iterable.next();
            count = count + 1;
        }
        setAnagrams({
            elements: results,
            generator: iterable,
            isDone: !!current.done
        })
        e.preventDefault();
    };

    const searchNextAnagrams = (anagrams: IterationState) => {
        let current = anagrams.generator.next();
        let results = [];
        let count = 0;
        while (!current.done && count < MAX_RESULTS) {
            results.push(current.value);
            current = anagrams.generator.next();
            count = count + 1;
        }
        setAnagrams({
            elements: results,
            generator: anagrams.generator,
            isDone: !!current.done
        })
    }

    return (<>
        <h1>Anagrammes</h1>
        {isLoading ? <p>Chargement du dictionnaire...</p> : null}
        <form onSubmit={searchAnagrams}>
            <div>
                <label htmlFor="sentence">Phrase</label>
                <input type="text" name="sentence" autoFocus={true} value={sentence} onChange={(e) => setSentence(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="minWordLength">Taille minimale des mots</label>
                <input type="number" id="minWordLength" value={minWordLength} onChange={(e) => setMinWordLength(parseInt(e.target.value))}/>
            </div>
            <button disabled={isLoading} onClick={searchAnagrams}>Rechercher les anagrammes</button>
        </form>
        { anagrams && !anagrams.isDone ? (<>
            Il y a plus de {MAX_RESULTS} résultats
            <button onClick={() => searchNextAnagrams(anagrams)}>charger les résultats suivants</button></>
        ) : null}
        { anagrams ? <Result anagrams={anagrams.elements} /> : null}
    </>);
}
