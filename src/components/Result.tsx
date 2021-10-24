import React, {useState} from "react";

export interface Props {
    anagrams: string[]
}
export const Result: React.FC<Props> = (props) => {
    const [filterPermutations, setFilterPermutations] = useState(true);
    const [minMaxWordLength, setMinMaxWordLength] = useState(5);
    const [contains, setContains] = useState("");
    const [startWith, setStartWith] = useState("");

    let diplayedAnagrams = props.anagrams;
    if (filterPermutations) {
        const uniques = new Set(props.anagrams.map(sentence => sentence.split(" ").sort().join(" ")));
        diplayedAnagrams = [...uniques];
    }
    diplayedAnagrams = diplayedAnagrams
        .filter(sentence => sentence.split(" ").find(word => word.length >= minMaxWordLength))
    diplayedAnagrams = diplayedAnagrams
        .filter(sentence => sentence.includes(contains));
    diplayedAnagrams = diplayedAnagrams
        .filter(sentence => sentence.split(" ").find(word => word.startsWith(startWith)));

    return (<>
        <h4>{diplayedAnagrams.length} résultat(s)</h4>
        <div>
            <div>
                <label htmlFor="minMaxWordLength">Taille minimale du mot le plus long</label>
                <input type="number" id="minMaxWordLength" value={minMaxWordLength} onChange={(e) => setMinMaxWordLength(parseInt(e.target.value))}/>
            </div>
            <div>
                <label htmlFor="contains">Contient</label>
                <input type="text" id="contains" value={contains} onChange={(e) => setContains(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="startWith">A un mot qui commence par</label>
                <input type="text" id="startWith" value={startWith} onChange={(e) => setStartWith(e.target.value)}/>
            </div>
            {filterPermutations ?
                <button onClick={() => setFilterPermutations(false)}>Ne pas filtrer les permutations</button> :
                <button onClick={() => setFilterPermutations(true)}>Filtrer les permutations</button>
            }
        </div>
        <ul>
            {diplayedAnagrams.map((a, i) => <li key={i}>{a}</li>)}
        </ul>
    </>)
};
