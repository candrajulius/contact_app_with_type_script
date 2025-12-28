"use client"

import { Modal, Form, Input, message, UploadFile} from "antd"
import { addContact, ContactPayload } from "../lib/api"
import { MailOutlined, PhoneOutlined, PictureOutlined, TagOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type AddContactModalProps = {
    open: boolean;
    onClose: () => void;
};


export default function AddContactModal({
    open, onClose
}: AddContactModalProps)
{
    const [form] = Form.useForm();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: addContact,
        onSuccess: (res) => {
            message.success(res.message);
            queryClient.invalidateQueries({queryKey: ["contacts"]});
            form.resetFields();
            onClose();
        },
        onError: (err) => {
            message.error(err.message);
        }
    });

    
    return(
        <Modal title="Add Contact"
        confirmLoading={mutation.isPending}
        open={open} onCancel={onClose} onOk={() => form.submit()} okText="Add">
            <Form form={form} layout="vertical" onFinish={(values) => mutation.mutate(values)}>
                <Form.Item name="name" label="Name" rules={[{required: true, message: "Name wajib diisi"}]}>
                    <Input placeholder="Contact name" prefix={<UserOutlined className="text-gray-400"/>} className="rounded-full"/>
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{required: true, message: "Email wajib diisi"}, {type: "email", message: "Format email tidak valid"}]}>
                    <Input placeholder="Email" prefix={<MailOutlined className="text-gray-400"/>} className="rounded-full" />
                </Form.Item>
                <Form.Item name="phoneNumber" label="Phone Number" rules={[
                    {required: true, message: "Phone Number wajib diisi"}, 
                    {pattern: /^[0-9]+$/, message: "Phone number hanya boleh angka"}, 
                    {max: 12, message: "Phone number maximal 12 karakter"}]}>
                    <Input prefix={<PhoneOutlined className="text-gray-400"/>} placeholder="Contoh: 081234567890" maxLength={12} />
                </Form.Item>
                <Form.Item
                    name="tag"
                    label="Tag"
                    rules={[{ required: true, message: "Tag wajib diisi" }]}
                    >
                    <Input prefix={<TagOutlined className="text-gray-400"/> } placeholder="Tag" />
                </Form.Item>
            </Form>
        </Modal>
    )
}