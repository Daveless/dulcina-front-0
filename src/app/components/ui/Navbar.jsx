"use client";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { Searchbar } from ".";

const Navbar = () => {
  const [isShown, setIsShown] = useState(false);
  const toggleMenu = () => {
    setIsShown(!isShown);
  };
  return (
    <div className="grid grid-cols-2 md:grid-cols-[31%_69%] md:h-[70px] justify-center content-center md:px-[130px] p-2 z-40 bg-[#ffffff]">
      <Link className="flex items-center" href="/">
        <h1 className="text-bold text-xl">Dulcina</h1>
      </Link>
      <div className="flex flex-row justify-around md:hidden">
        <button>
          <i className="bx bx-search text-2xl"></i>
        </button>
        <button>
          <i className="bx bx-cart text-2xl"></i>
        </button>
        <button onClick={toggleMenu}>
          <i className="bx bx-menu text-2xl"></i>
        </button>
      </div>
      <div
        className={`absolute md:relative md:flex top-[50px] md:top-0 md:justify-between items-center  md:bg-inherit w-full left-0 text-center text-black  z-30 md:z-60 ${
          isShown ? "flex flex-col md:flex" : "hidden md:flex"
        }`}
      >
        <Link className="my-3 md:my-0" href="/products">
          Catalogo
        </Link>
        <Link className="my-3 md:my-0" href="/products">
          Contacto
        </Link>
        <Link className="my-3 md:my-0" href="/products">
          Nosotros
        </Link>
        <Searchbar />
        <div className="flex">
          <AiOutlineHeart size="28px" className="ml-[10px] cursor-pointer" />
          <BsCart2 size="28px" className="ml-[10px] cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
