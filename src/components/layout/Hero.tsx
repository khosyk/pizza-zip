import Image from "next/image";
import React from "react";
import Right from "../icons/Right";

// type Props = {}

export default function Hero() {
	return (
		<section className="hero">
			<div className="py-12">
				<h1 className="text-4xl font-semibold">
					<span className="text-primary">피자</span>가<br />
					맛있어 지는 순간은
					<br />
					바로 지금
				</h1>
				<p className="my-6 text-gray-500">
					시대를 초월한 클래식 페퍼로니, 이탈리안 소시지와 모험적인 토핑까지
					창의적인 조합으로 최고의 피자 모험을 경험해 보세요!
				</p>
				<div className="flex gap-4 text-sm">
					<button className="bg-primary text-white uppercase flex text-center px-4 py-2 rounded-full gap-2">
						Order now
						<Right />
					</button>
					<button className="font-semibold flex gap-2 py-2 text-gray-600">
						Learn more
						<Right />
					</button>
				</div>
			</div>
			<div className=" relative">
				<Image
					src={"/pizza.png"}
					layout="fill"
					objectFit="contain"
					alt={"pizza"}></Image>
			</div>
		</section>
	);
}
