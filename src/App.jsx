import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./styles/main.scss"
import "./styles/text.scss"

import Nav from './components/nav/nav'
import { useEffect, useState, useRef } from 'react'
import Search from './components/Search/Search'
import List from './components/List/List'
import MarkdownLoader from './components/MarkdownLoader/MarkdownLoader'
import Info from './components/Info/Info'
import { useIndexedNotes } from './hooks/useIndexedNotes';



function App() {

    const [page, setPage] = useState("search")
    const [scrolled, setScrolled] = useState(false)
    const [note, setNote] = useState("")

    const scrollRef = useRef()

    function navLinkClicked(key){
        setScrolled(false)
        setPage(key)
    }

    function selectNote(key){
        setScrolled(true)
        setNote(key)

        scrollRef.current.scrollTop = 0
    }

    function getTitle(key){
        const n = notes.find(n => n.file === key)
        const title = n ? n.title : "Untitled"
        return title
    }

    const { notes, searchNotes } = useIndexedNotes();

    return (
        <div className='page-container'>
            <Nav navigateTo={navLinkClicked}/>
            <main>
                <div className={"pages" + (scrolled ? " active" : "")}>
                    <div className="page">
                        <div className="container">
                            {page === "search" && <Search onSearch={searchNotes} onSelect={selectNote} /> }
                            {page === "list" && <List notes={notes} selectNote={selectNote} />}
                            {page === "info" && <Info/> }
                        </div>
                    </div>
                    <div className="page" ref={scrollRef}>
                        <div className="container">
                            <h2>{getTitle(note)}</h2>
                            <hr></hr>
                            {/* {note != "" && <MarkdownLoader file={"/notes/" + note}/>} */}
                            {note != "" && <MarkdownLoader file={"/Notes/notes/" + note}/>}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default App