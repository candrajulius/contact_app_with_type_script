import Link from "next/link";

type FooterTextProps = {
    content_one: string;
    path: string;
    content_two: string;
    color: string;
};

function AuthFooterText({
    content_one,
    path,
    content_two,
    color
}: FooterTextProps){
    return(
        <p className="mt-4 text-center text-sm text-gray-600">
            {content_one}{" "}
            <Link href={path} className={`font-semibold !text-gray-800 hover:!underline ${color}`}>
                {content_two}
            </Link>
        </p>
        
    );
}

export default AuthFooterText;