import { Button } from "antd";

type ButtonProps = {
    title: string,
    color: string,
};

function ButtonText({
    title,
    color,
}: ButtonProps)
{
 return (
    <Button htmlType="submit" size="large" className={`mt-2 h-11 w-full !rounded-full border-none font-semibold text-white ${color} hover:!text-black`}>{title}</Button>
 );
}

export default ButtonText;