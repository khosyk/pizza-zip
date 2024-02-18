import Image from "next/image";
import React from "react";

type Props = {};

export default function Register({}: Props) {
	return (
		<section className="register mt-8">
			<h1 className="text-center text-primary text-4xl">Register</h1>
			<form className="block max-w-xs mx-auto mt-5" action="">
				<input type="text" placeholder="email" />
				<input type="password" placeholder="password" />
				<input type="password" placeholder="password" />
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
