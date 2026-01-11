import DetectLocation from "./DetectLocation";
import SearchBox from "./Searchbox";
import NavbarLogo from "./NavbarLogo";
import DesktopActions from "./DesktopActions";
import MobileActions from "./MobileActions";
import LoginButton from "./LoginButton";
import UserBtn from "./UserBtn";

const Navbar = () => {
  return (
    <nav className="p-6 rounded-[64px] bg-white">
      <div className="flex items-center justify-between gap-4">
        {/* Left Section: Logo, Location, Search */}
        <div className="flex items-center gap-6">
          <NavbarLogo />
          <DetectLocation />
          <SearchBox />
        </div>

        {/* Right Section: Desktop Actions & Login */}
        <div className="flex items-center gap-4">
          <DesktopActions />
          <MobileActions />
          {/* <LoginButton /> */}
          <UserBtn />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
