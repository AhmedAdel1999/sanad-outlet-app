"use client";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import LogoImg from "@/assets/navbar-logo.png";
import MiniLogo from "@/assets/mini-logo.png";
const NavbarLogo = () => (
  <Link href="/" className="shrink-0">
    <Image
      alt="logo"
      src={LogoImg.src}
      width={190}
      height={52}
      className="hidden md:block"
    />
    <Image
      alt="logo"
      src={MiniLogo.src}
      width={61}
      height={52}
      className="block md:hidden"
    />
  </Link>
);
export default NavbarLogo;
