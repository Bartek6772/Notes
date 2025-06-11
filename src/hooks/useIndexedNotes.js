import { useEffect, useState, useRef } from 'react';
import { Document } from 'flexsearch';
import { notesMeta } from '../data/notesMeta';

export function useIndexedNotes() {
    const [notes, setNotes] = useState([]);
    const indexRef = useRef(
        new Document({
            tokenize: "forward",
            document: {
                id: "id",
                index: ["title", "content"],
                store: ["title", "file", "content"]
            }
        })
    );
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const loadNotes = async () => {
            let idx = 0
            notesMeta.map(async ({ title, file }) => {
                try {
                    // const res = await fetch(`/notes/${file}`);
                    const res = await fetch(`/Notes/notes/${file}`);
                    const content = await res.text();
                    const note = { id: idx, title, file, content };
                    indexRef.current.add(note);
                } catch (err) {
                    console.error("Failed to fetch:", filePath, err);
                    const note = { id: idx, title, file, content: "" };
                    indexRef.current.add(note);
                }
                
                idx++
                return note;
            })

            setNotes(notesMeta);
            setReady(true);
        };

        loadNotes();
    }, []);

    function getMatchLines(content, query) {
        const lines = content.split('\n');
        const lowerQuery = query.toLowerCase();

        const matchedLine = lines.find(line =>
            line.toLowerCase().includes(lowerQuery)
        );

        return matchedLine ? stripMarkdown(matchedLine) : '';
    }

    function stripMarkdown(md) {
        return md
            .replace(/!\[.*?\]\(.*?\)/g, '')
            .replace(/\[.*?\]\(.*?\)/g, '')
            .replace(/(`{1,3})(.*?)\1/g, '$2')
            .replace(/[*_~`#>|\[\]]+/g, '')
            .replace(/-{3,}/g, '')
            .replace(/\s{2,}/g, ' ')
            .trim();
    }

    const searchNotes = (query) => {
        if (!ready) return [];
        if (!query.trim()) return [];

        const result = indexRef.current.search(query, { enrich: true, boost: { title: 2, content: 1 } });

        return result[0]?.result.map(note => ({
            ...note,
            snippet: getMatchLines(note.doc.content, query)
        })) || [];
    };

    return { notes, searchNotes, ready };
}
