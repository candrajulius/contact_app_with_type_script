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
    <Button htmlType="submit" size="large" type="default" className={`mt-2 h-11 w-full !rounded-full !border-black !border font-semibold !text-black ${color} hover:!text-black active:!text-black focus-visible:!text-black`}>{title}</Button>
 );
}

export default ButtonText;