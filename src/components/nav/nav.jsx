import { Search, List, Info, Menu, X } from "lucide-react"
import "./nav.scss"
import { useState } from "react";

const navItems = [
    { key: "search", label: "Wyszukiwanie", Icon: Search },
    { key: "list", label: "Lista notatek", Icon: List },
    { key: "info", label: "Informacje", Icon: Info },
];


const Nav = ({ navigateTo }) => {

    const [active, setActive] = useState(window.innerWidth > 800)

    function switchState(){
        setActive(!active)
    }

    function onLinkClicked(key){
        if(window.innerWidth <= 800){
            switchState()
        }
        navigateTo(key)
    }

    return (
        <nav className={active ? "" : "hidden"}>
            <div className="header">
                <h2>Notes</h2>
                <X className="close" size={28} onClick={switchState}/>
            </div>
            <div className="links">
                {navItems.map(({ key, label, Icon }) => (
                    <button key={key} onClick={() => onLinkClicked(key)}>
                        <Icon size={24} />
                        {label}
                    </button>
                ))}
            </div>
            <div className="expand">
                <Menu size={28} onClick={switchState}/>
            </div>
        </nav>
    )
}

export default Nav