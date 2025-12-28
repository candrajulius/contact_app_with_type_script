"use client";
import { Form, Input, message} from "antd";
import {LockOutlined, MailOutlined} from "@ant-design/icons";
import AuthHeader from "../components/AuthHeader";
import AuthFooterText from "../components/AuthFooterText";
import ButtonText from "../components/ButtonText";
import { login, putAccessToken } from "../lib/api";
import { useRouter } from "next/navigation";


type LoginFormValues = {
    email: string;
    password: string;
};

function LoginPage(){

    const router = useRouter()

    const onFinish = async (values: LoginFormValues) => {
        const result = await login(values);
        
        if (result.error) {
            message.error(result.message || "Login gagal");
            return;
        }

        if (result.data?.accessToken){
            putAccessToken(result.data.accessToken);
            document.cookie = `accessToken=${result.data.accessToken}; path=/`;
        }

        message.success("Login berhasil");
        router.push("/home");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-md">
            {/* HEADER */}
            <AuthHeader subtitle="Login Your Account" />

            <Form layout="vertical" className="mt-4" onFinish={onFinish}>
                <Form.Item name="email" rules={[
                    {required: true, message: "Email wajib diisi"},
                    {type: "email", message: "Format email tidak valid"}
                ]}>
                    <Input size="large" placeholder="Email" prefix={<MailOutlined className="text-gray-400" />} className="rounded-full" />
                </Form.Item>

                <Form.Item name="password" rules={[{ required: true, message: "Password wajib diisi" }, {min: 8, message: "Password minimal 8 karakter"}]}>
                    <Input.Password size="large" placeholder="Password" prefix={<LockOutlined className="text-gray-400" />} className="rounded-full"/>
                </Form.Item>

                <ButtonText title="Login" color="hover:!bg-green-600 active:!bg-green-600 focus-visible:!bg-green-600"/>
                <AuthFooterText content_one="Belum punya akun?"  path="/register" content_two="Silahkan daftar" color="hover:!text-green-500 active:!text-green-500 focus-visible:!text-green-500"/>
            </Form>
        </div>
        </div>
    );
}

export default LoginPage;