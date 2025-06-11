import { SearchIcon, X } from "lucide-react"
import { useState } from "react";
import "./Search.scss"
import { Index, Document } from "flexsearch";

const Search = ({ onSearch, onSelect }) => {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        const q = e.target.value;
        setQuery(q);
        const res = await onSearch(q);
        setResults(res);
    };

    function clear(){
        setQuery("")
        setResults([])
    }

    return (
        <div className="search">
            <h1>Zbiór notatek z historii</h1>
            <div className="searchbar">

                <div className="bar">
                    <SearchIcon size={24} />
                    <input type="text" placeholder="Czego szukasz?"
                        value={query}
                        onChange={handleSearch} />
                    <X className="clear" size={24} onClick={clear}/>
                </div>

                <div className="results">
                    <ul>
                        {results.map(note => (
                            <li key={note.id} onClick={() => onSelect(note.doc.file)}>
                                <span>{note.doc.title}</span>
                                <span>{note.snippet}</span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Search