import Link from "next/link";
import React from "react";
import Menu from "./Menu";
import Image from "next/image";

const Header = () => {
  return (
    <header>
      <nav>
        <div className="navbar justify-between bg-sky-100">
          <Image
            src="/assets/HomeDecoLogo.jpeg"  
            alt="DecoPalets Logo"
            width={50}
            height={50}
            style={{ objectFit: "contain", borderRadius: "50%" }}
          />
          <Link href="/" className="btn btn-ghost text-lg">
            DecoPalets
          </Link>
          <Menu />
        </div>
      </nav>
    </header>
  );
};

export default Header;