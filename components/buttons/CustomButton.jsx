import { Link } from "../link/Link";

export const CustomButton = (props) => {
  const { text, href } = props || null;

  return (
    <Link href={href}
      className="border-[1.5px] border-rm-blue-100 rounded-[20px] w-full 
      text-center placeholder:text-center font-semibold cursor-pointer">
      {text}
    </Link>
  );
};
