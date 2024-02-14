import Image from "next/image";
import React from "react";
import MenuItem from "./MenuItem";

// type Props = {}

export default function HomeMenu() {
	return (
		<section>
			<div className="w-full absolute left-0 flex justify-between">
				<div className="flex -z-10">
					<Image
						width={170}
						height={100}
						src={"/sallad1.png"}
						objectFit="contain"
						alt={"sallad"}></Image>
				</div>
				<div className="flex -z-10 absolute right-0 -top-[280px]">
					<Image
						width={300}
						height={220}
						src={"/sallad2.png"}
						objectFit="contain"
						alt={"sallad"}></Image>
				</div>
			</div>
			<div className="text-center">
				<h3 className="uppercase text-gray-500 font-semibold leading-4">
					Check out
				</h3>
				<h2 className="pb-3 text-primary font-bold text-4xl">Menu</h2>
			</div>
      <div className="grid grid-cols-3 gap-4">
        <MenuItem/>        <MenuItem/>
        <MenuItem/>
        <MenuItem/>        <MenuItem/>
        <MenuItem/>
        <MenuItem/>
      </div>
		</section>
	);
}
