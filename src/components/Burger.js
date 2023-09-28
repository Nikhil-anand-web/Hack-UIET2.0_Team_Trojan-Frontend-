import React, {useState} from "react";
import './burger.css'
import { About } from "./About";
import { Link, Route, Routes } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faUsers } from "@fortawesome/free-solid-svg-icons";

const Burger = () => {

    // to change burger classes
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const [menu_class, setMenuClass] = useState("menu hidden ")
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    // toggle burger menu change
    const updateMenu = () => {
        if(!isMenuClicked) {
            setBurgerClass("burger-bar clicked")
            setMenuClass("menu visible")
        }
        else {
            setBurgerClass("burger-bar unclicked")
            setMenuClass("menu hidden")
        }
        setIsMenuClicked(!isMenuClicked)
    }


    return(
        <div >
            <nav>
                <div className="burger-menu" onClick={updateMenu}>
                    <div className={burger_class} ></div>
                    <div className={burger_class} ></div>
                    <div className={burger_class} ></div>
                </div>
            </nav>

            <div className={menu_class} id="menuBar">
                <ul className="flex flex-col justify-center items-center pt-2 ">
                    <Link to="/" className="ml-6" > 
                        <FontAwesomeIcon icon={faCircle} className="pr-6 w-3" />ChatBot
                    </Link>
                   <Link to="/about">
                        <FontAwesomeIcon icon={faUsers} className="pr-5 w-5" />About
                    </Link>
                </ul> 
            </div>
        </div>
    )
}

export default Burger