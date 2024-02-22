'use client'
import Image from "next/image";
import React, { InputHTMLAttributes, Reducer, ReducerState, useCallback, useReducer, useState } from "react";

interface State {
  email: string;
  password: string;
}

interface Action {
  type: string;
	payload:string;
}

export default function Register() {

	const [state, dispatch] = useReducer(
    (state:State, action:Action) => {
      switch (action.type) {
        case 'email':
          return { ...state, email: action.payload};
        case 'password':
          return { ...state, password: action.payload};
        default:
          return state;
      }
    },
    { email: '', password: '' }
  );
	
  const handleInput = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    dispatch({ type: e.currentTarget.name, payload: e.currentTarget.value });
  }, []);

	const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
		e.preventDefault();
		try{
			const res = await fetch('/api/register',{
			method:'POST',
			body:JSON.stringify({
				email:state.email,
				password:state.password
			}),
			headers:{"Content-Type": 'application/json'}
		})
		if(!res.ok){
			console.log(res.statusText);
			if(res.statusText.includes('EMAIL')) throw Error("email");
			if(res.statusText.includes('PASSWORD')) throw Error("password");
		}
		console.log("SUCCEDD::", await res.json());
	}catch(err){
			console.log("ISEROR:",err);
		}
	}

	return (
		<section className="register mt-8">
			<h1 className="text-center text-primary text-4xl">Register</h1>
			<form onSubmit={handleSubmit} className="block max-w-xs mx-auto mt-5" action="">
				<input type="text" name='email' placeholder="email" onChange={handleInput}  value={state.email}/>
				<input type="password" name='password' placeholder="password" onChange={handleInput} value={state.password} />
			<button type="submit">등록</button>
				<div className="my-4 text-center text-gray-500">
					또는 아래 방법으로 로그인
				</div>
				<button className="flex justify-center gap-4">
          <Image src={"/google.png"} alt="googleLogo" width={24} height={24} />
					구글 로그인
				</button>
			</form>
		</section>
	);
}
