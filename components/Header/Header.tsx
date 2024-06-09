import Link from "next/link";
import React from "react";
import Menu from "./Menu";
import Image from "next/image";

const Header = () => {
  return (
    <header>
      <nav>
        <div className="navbar justify-between bg-sky-50">
          <Link href='/'>
          <Image
            src="/assets/HomeDecoLogo.jpeg"  
            alt="DecoPalets Logo"
            width={50}
            height={50}
            style={{ objectFit: "contain", borderRadius: "50%" }}
          />
          </Link>
          
          <Link href="/" className="btn btn-ghost text-3xl text-sky-800">
            DecoPallets
          </Link>
          <Menu />
        </div>
      </nav>
    </header>
  );
};

export default Header;