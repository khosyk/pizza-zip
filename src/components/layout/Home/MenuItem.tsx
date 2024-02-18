import Image from "next/image";
import React from "react";

type Props = {};

export default function MenuItem({}: Props) {
	return (
		<div className="bg-gray-100 shadow-sm shadow-gray-300 p-4 rounded-lg relative flex flex-col hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
			<div className="relative w-full h-[100px] sm:h-[200px] ">
				<Image
					src={"/pizza.png"}
					sizes="(max-height: 300px)"
					fill
					objectFit="contain"
					alt="pizzas"
				/>
			</div>
			<h4 className="leading-5 pt-2">페퍼로니 피자</h4>
			<p className="leading-5 py-3 text-gray-500 text-sm">
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
			</p>
			<button className="bg-primary text-white rounded-full px-6 py-2">
				주문 담기
			</button>
		</div>
	);
}
