import React,{useState} from "react";
import {useMyMoviesContext} from "../hooks/useMyMoviesContext";
import {useNavigate} from "react-router-dom";
import MovieHeader from "../components/movieHeader";

export default function LoginPage() {
    const my_movies=useMyMoviesContext();
    const navigate=useNavigate();
    const [id,setId]=useState("");
    const [pw,setPw]=useState("");
    const handlerInputId=(e)=>{
        e.preventDefault();
        setId(e.target.value);
    }
    const handlerInputPw=(e)=>{
        e.preventDefault();
        setPw(e.target.value);
    }
    const handlerLogin=(e)=>{
        e.preventDefault();
        my_movies.setId(id);
        navigate(`/mypage`);
    }
    const handlerSignUp=(e)=>{
        navigate(`/signup`);
    }
    return (
    <>
        <MovieHeader/>
        <form
            onSubmit={e=>handlerLogin(e)}
            className={`w-[1000px] max-[1000px]:w-[90%] !p-[10px] bg-zinc-800 rounded-[10px] [&_*]:!bg-zinc-800 [&_*]:m-[4px] [&_input]:!bg-white [&_input]:text-black [&_button]:!bg-zinc-700`}
        >
            <h1> 로그인 </h1>
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
            <button type="submit"> 로그인 </button>
            <button 
                type="button"
                onClick={e=>handlerSignUp(e)}
            > 회원 가입 </button>
        </form>
    </>
    )
}
