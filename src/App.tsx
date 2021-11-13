import React, {useEffect, useState} from 'react';
import './App.css';
import {SentenceAnagram} from "./components/SentenceAnagram";
import {Link, Route, Switch, HashRouter} from "react-router-dom";
import {WordAnagram} from "./components/WordAnagram";

const baseName = document.querySelector('base')?.getAttribute('href') || undefined;
function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [dictionary, setDictionary] = useState<string[]>([]);

    useEffect(() => {
        setIsLoading(true);
        fetch(process.env.PUBLIC_URL + "/data/dictionary_fr.txt")
            .then(r => r.text())
            .then(body => body.split("\n"))
            .then(entries => {
                const dictionary = entries.map(entry => entry.replaceAll("\r", ""));
                setDictionary(dictionary);
                setIsLoading(false);
            });
    }, []);
    return (
        <HashRouter basename={baseName}>
            <nav className="container">
                <div>
                    <Link to="/">Anagrammes de phrase</Link>
                    <Link to="/words">Anagrammes de mots</Link>
                </div>
            </nav>
            {isLoading ? <p>Chargement du dictionnaire...</p> : <div className="App">
                <Switch>
                    <Route path="/words">
                        <WordAnagram dictionary={dictionary} />
                    </Route>
                    <Route path="/">
                        <SentenceAnagram dictionary={dictionary}/>
                    </Route>
                </Switch>
            </div>}
        </HashRouter>
    );
}

export default App;
