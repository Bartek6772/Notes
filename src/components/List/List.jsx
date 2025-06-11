import { File } from 'lucide-react'
import MarkdownLoader from './../MarkdownLoader/MarkdownLoader'
import "./List.scss"

const List = ({notes, selectNote}) => {
    return (
        <div>
            <div className="list">
                <div className="header">
                    Nazwa pliku
                </div>

                {notes.map(({title, file}) => (
                    <div className='item' key={file} onClick={() => selectNote(file)}>
                        <File size={24}/>
                        <span>{title}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default List