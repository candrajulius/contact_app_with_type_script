"use client";

import { UserOutlined } from "@ant-design/icons";
import { Typography } from "antd";

type AuthHeaderProps = {
    title?: string;
    subtitle: string;
};

function AuthHeader({
    title = "Contact App",
    subtitle,
}: AuthHeaderProps){
    return (
        <>
            <div className="mb-6 flex flex-col items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500">
                    <UserOutlined className="text-white text-lg" />
                </div>
                <Typography.Title level={4} className="!mb-0">
                    {title}
                </Typography.Title>
            </div>
            <Typography.Title level={5} className="text-center">
                {subtitle}
            </Typography.Title>
        </>
    );
}

export default  AuthHeader;
