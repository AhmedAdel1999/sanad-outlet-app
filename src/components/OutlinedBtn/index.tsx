import { Button } from "../ui/button";

type Props = {
  text: string;
  type?: any;
  disabled?: boolean;
  className?: string;
  handleClick?: () => void;
};

const OutlinedBtn = ({
  text,
  type,
  disabled = false,
  className = "",
  handleClick,
}: Props) => {
  return (
    <Button
      type={type ? type : "button"}
      disabled={disabled}
      className={`cursor-pointer bg-transparent! border-2 border-grey-100 p-[8px_16px] h-11 rounded-[12px] typo-regular2 text-white ${className}`}
      onClick={handleClick}
    >
      {text}
    </Button>
  );
};

export default OutlinedBtn;
