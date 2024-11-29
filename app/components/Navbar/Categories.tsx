"use client";

import { useRouter } from "next/navigation";
import Container from "../Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBoatFishing,
  GiIsland,
  GiWindmill,
  GiCastle,
  GiForestCamp,
  GiCaveEntrance,
  GiCactus,
  GiBarn,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This Property is Close to the Beach",
  },
  {
    label: "WindMills",
    icon: GiWindmill,
    description: "This Property has Windmill",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This Property is Modern",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This Property is in the Countryside",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This Property has a pool",
  },
  {
    label: "Island",
    icon: GiIsland,
    description: "This Property is on an island",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This Property is close to a Lake",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This Property has skiing facility",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This Property is a castle or in a castle",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This Property is suitable for Camping",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This Property is an arctic home",
  },
  {
    label: "Caves",
    icon: GiCaveEntrance,
    description: "This Property is a cave home",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This Property is in the Desert",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This Property has a barn",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This is a luxury property",
  },
];

const Categories = () => {
  const router = useRouter();
  const params = useSearchParams();
  const category = params?.get("category");
  const pathName = usePathname();

  const isMainPage = pathName === "/";

  if (!isMainPage) {
    return null;
  }
  return (
    <Container>
      <div
        className="
    pt-4
    flex
    flex-row
    items-center
    justify-between
    overflow-x-auto
    "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
