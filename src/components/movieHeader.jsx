import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import {useMyMoviesContext} from "../hooks/useMyMoviesContext.jsx"
import logo_image from "../assets/logo.png";
import search_btn_image from "../assets/search_button.png";
import login_image from "../assets/login.svg";

export default function MovieHeader() {
    const [input_query,setInputQuery]=useState("");
    const [show_login, setShowLogin]=useState(false);
    const my_movies=useMyMoviesContext();
    const navigate=useNavigate();
    const handlerInputQuery=(e)=>{ 
        e.preventDefault();
        setInputQuery(e.target.value);
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        if (input_query==="") return;
        console.log("submit:", input_query);
        navigate(`/search?query=${input_query}`);
    }
    const handlerLogo=(e)=>{
        e.preventDefault();
        navigate(`/`);
    }
    const handlerShowLogin=(e)=>{
        e.preventDefault();
        setShowLogin(!show_login);
    }
    const handlerLoginout=(e)=>{
        e.preventDefault();
        if (my_movies.id==="") {
            navigate(`/login`);
        } else {
            my_movies.setId("");
            navigate(`/`);
        }
    }
    const handlerSignup=(e)=>{
        e.preventDefault();
        if (my_movies.id==="") {
            navigate(`/signup`);
        } else {
            navigate(`/mypage`);
        }
    }
    return (
        <header className="w-full h-[60px] relative !border-b-[2px] !border-gray-500">
            <button
                className="w-[123px] h-[20px] absolute left-[20px] top-[20px]"
                onClick={(e)=>handlerLogo(e)}
            >
                <img
                    className="w-full h-full"
                    src={logo_image}
                />
            </button>
            <form className="w-[320px] max-[750px]:w-[44px] max-[750px]:focus-within:w-[calc(100%-50px)] h-[44px] absolute right-[40px] top-[8px] bg-white rounded-[8px] flex justify-between items-center group"
                onSubmit={(e) => handleSubmit(e)}
            >
                <input 
                    type="text" 
                    value={input_query} 
                    className="text-black m-[10px] w-[240px] max-[750px]:hidden max-[750px]:group-focus-within:block"
                    placeholder="검색" 
                    onChange={(e) => handlerInputQuery(e)}/>
                <button className="w-[24px] h-[24px] m-[10px]">
                    <img
                        className="w-full h-full bg-white"
                        src={search_btn_image}
                    />
                </button>
            </form>
            <button 
                className="w-[37px] h-[37px] absolute right-0 top-[12px]"
                onClick={(e)=>handlerShowLogin(e)}
            >
                <img 
                    className="w-full h-full rounded-[50%] object-cover" 
                    src={login_image}
                />
            </button>
            <div
                className={`${(show_login)?`block`:`hidden`} absolute top-[60px] right-[0px] bg-white text-black flex flex-col`}
            >
                <button
                    onClick={e=>handlerLoginout(e)}
                >{(my_movies.id==="")?`로그인`:`로그아웃`}</button>
                <button
                    onClick={e=>handlerSignup(e)}
                >{(my_movies.id==="")?`회원 가입`:`마이페이지`}</button>
            </div>
        </header>
    )
}
