import Image from "next/image";
import React from "react";
import MenuItem from "./MenuItem";
import SectionHeaders from "./SectionHeaders";

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
			<SectionHeaders title='Check Out' subTitle="Menu" />
      <div className="grid grid-cols-3 gap-4">
        <MenuItem/>        <MenuItem/>
        <MenuItem/>
        <MenuItem/>        <MenuItem/>
        <MenuItem/>
      </div>
		</section>
	);
}
