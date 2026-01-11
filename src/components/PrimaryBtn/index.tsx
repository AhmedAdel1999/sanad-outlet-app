import { Button } from "../ui/button";

type Props = {
  text: string;
  type?: any;
  icon?: any;
  disabled?: boolean;
  className?: string;
  handleClick?: () => void;
};

const PrimaryBtn = ({
  text,
  type,
  icon,
  disabled = false,
  className = "",
  handleClick,
}: Props) => {
  return (
    <Button
      type={type ? type : "button"}
      disabled={disabled}
      className={`cursor-pointer p-[8px_16px] flex items-center gap-2 h-11 rounded-[12px] typo-regular2 text-white ${className}`}
      style={{
        background:
          "linear-gradient(85deg, var(--color-primary-500, #21BF73) -6.74%, var(--colors-secondary-500, #2EC1AC) 123.06%)",
      }}
      onClick={handleClick}
    >
      {text}
      {icon}
    </Button>
  );
};

export default PrimaryBtn;
