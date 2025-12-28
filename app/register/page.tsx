"use client";
import {Form, Input, message } from "antd"
import AuthHeader from "../components/AuthHeader"
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons"
import AuthFooterText from "../components/AuthFooterText";
import ButtonText from "../components/ButtonText";
import { register } from "../lib/api";
import { useRouter } from "next/navigation";
type RegisterFormValues = {
    name: string;
    email: string;
    password: string;
};

function RegisterPage(){

    const router = useRouter();

    const onFinish = async (values: RegisterFormValues) => {
        const result = await register(values);

        if (result.error){
            message.error(result.message || "Register gagal");
            return;
        }

        message.success("Registrasi berhasil, silahkan login");
        router.push("/login");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-md">
                {/** HEADER */}
                <AuthHeader subtitle="Register New Account" />

                <Form layout="vertical" className="mt-4" onFinish={onFinish}>
                    <Form.Item name="name" rules={[
                        {required: true, message: "Full Name wajib diisi"}
                    ]} >
                        <Input size="large" placeholder="Nama" prefix={<UserOutlined className="text-gray-400"/>} className="rounded-full" />
                    </Form.Item>
                    <Form.Item name="email" rules={[
                        {required: true, message: "Email wajib diisi"},
                        {type: "email", message: "Format email tidak valid"}
                    ]}>
                        <Input size="large" placeholder="Email" prefix={<MailOutlined className="text-gray-400" />} className="rounded-full" />
                    </Form.Item>
                    <Form.Item name="password" rules={[
                        {required: true, message: "Password wajib diisi"},
                        {min: 8, message: "Password minimal harus 8 karakter"}
                    ]}>
                        <Input.Password size="large" placeholder="Password" prefix={<LockOutlined className="text-gray-400" />} className="rounded-full"/>
                    </Form.Item>

                    <ButtonText title="Register" color="hover:!bg-blue-500 active:!bg-blue-600 focus-visible:!bg-blue-500"/>
                </Form>
                <AuthFooterText content_one="Sudah punya akun ?" path="/login" content_two="Silahkan login" color="hover:!text-blue-600 active:!text-blue-600 focus-visible:!text-blue-600"/>
            </div>
        </div>
    );
}
export default RegisterPage;