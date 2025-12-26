"use client";

import { Modal, Descriptions, Avatar, Spin } from "antd";
import {
  UserOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { getUserLogged } from "../lib/api";

type ProfileModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ProfileModal({ open, onClose }: ProfileModalProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await getUserLogged();
      if (res.error) throw new Error(res.message);
      return res.data;
    },
    enabled: open, // 🔥 fetch hanya saat modal dibuka
  });

  return (
    <Modal
      title="My Profile"
      open={open}
      onCancel={onClose}
      footer={null}
      centered
    >
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spin />
        </div>
      ) : (
        <>
          {/* Avatar */}
          <div className="mb-6 flex justify-center">
            <Avatar size={64} icon={<UserOutlined />} />
          </div>

          {/* Profile Info */}
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item
              label={
                <span className="flex items-center gap-2">
                  <UserOutlined /> Name
                </span>
              }
            >
              {data?.name ?? "-"}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <span className="flex items-center gap-2">
                  <MailOutlined /> Email
                </span>
              }
            >
              {data?.email ?? "-"}
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Modal>
  );
}
