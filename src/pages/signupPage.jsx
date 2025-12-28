import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useMyMoviesContext } from "../hooks/useMyMoviesContext";
import MovieHeader from "../components/movieHeader";

export default function SignupPage() {
    const navigate=useNavigate();
    const my_movies=useMyMoviesContext();
    const [id,setId]=useState("");
    const [pw,setPw]=useState("");
    const [name,setName]=useState("");
    const [genres,setGenres]=useState("");
    const handlerInputId=(e)=>{
        e.preventDefault();
        setId(e.target.value);
    }
    const handlerInputPw=(e)=>{
        e.preventDefault();
        setPw(e.target.value);
    }
    const handlerInputName=(e)=>{
        e.preventDefault();
        setName(e.target.value);
    }
    const handlerInputGenres=(e)=>{
        e.preventDefault();
        setGenres(e.target.value);
    }
    const handlerSignUp=(e)=>{
        e.preventDefault();
        my_movies.setId(id);
        my_movies.setName(name);
        my_movies.setGenres(genres);
        navigate(`/mypage`);
    }
    return (
    <>
        <MovieHeader/>
        <form
            onSubmit={e=>handlerSignUp(e)}
            className={`w-[1000px] max-[1000px]:w-[90%] !p-[10px] bg-zinc-800 rounded-[10px] [&_*]:!bg-zinc-800 [&_*]:m-[4px] [&_input]:!bg-white [&_input]:text-black [&_button]:!bg-zinc-700`}
        >
            <h1> 회원 가입 </h1>
            <label>아이디 </label>
            <input 
                type="text" 
                value={id}
                onChange={e=>handlerInputId(e)}
            /><br/>
            <label>비밀번호</label>
            <input 
                type="password" 
                value={pw}
                onChange={e=>handlerInputPw(e)}
            /><br/>
            <label>닉네임</label>
            <input 
                type="text"
                value={name}
                onChange={e=>handlerInputName(e)}
            /><br/>
            <label>원하는 장르</label>
            <input 
                type="text"
                value={genres}
                onChange={e=>handlerInputGenres(e)}
            /><br/>
            <button type="submit"> 회원 가입 </button>
        </form>
    </>
    )
}
