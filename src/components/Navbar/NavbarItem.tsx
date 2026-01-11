"use client";
interface NavItemProps {
  icon: React.ReactNode;
  label?: string;
  showLabelOnMd?: boolean;
}
const NavItem = ({ icon, label, showLabelOnMd = false }: NavItemProps) => (
  <div className="h-13 p-[8px_16px] flex items-center gap-2 cursor-pointer">
    {label && (
      <span
        className={`typo-regular2 ${
          showLabelOnMd ? "block" : "hidden lg:block"
        }`}
      >
        {label}
      </span>
    )}
    <div className="shrink-0">{icon}</div>
  </div>
);

export default NavItem;
