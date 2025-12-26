"use client";

import { Layout, Spin, Typography, Avatar, Dropdown, FloatButton, Empty } from "antd";
import { PlusOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ContactCard from "../components/ContactCard";
import AddContactModal from "../components/AddContactModal";
import { Contact, getContacts } from "../lib/api";
import { useRouter } from "next/navigation";
import ProfileModal from "../components/ProfileModal";

const { Header, Content } = Layout;

function HomePage() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);


  // REACT QUERY
  const { data: contacts, isLoading } = useQuery<Contact[]>({
    queryKey: ["contacts"],
    queryFn: async () => {
      const res = await getContacts();
      if (res.error) throw new Error(res.message);
      return res.data ?? [];
    },
  });

  // DROPDOWN ACTION
  const profileMenu = {
    items: [
      {
        key: "profile",
        label: "Profile",
        onClick: () => setProfileOpen(true),
      },
      {
        key: "logout",
        label: "Logout",
        icon: <LogoutOutlined />,
        danger: true,
        onClick: () => {
          // logout logic (contoh)
          document.cookie = "accessToken=; Max-Age=0; path=/";
          window.location.href = "/login";
        },
      },
    ],
  };

  if (isLoading) {
  return (
    <Layout className="min-h-screen">
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <Spin size="large"/>
      </div>
    </Layout>
  );
}

  return (
    <Layout className="min-h-screen">
      {/* FIXED HEADER */}
      <Header className="sticky top-0 z-50 flex items-center justify-between !bg-white px-6 shadow">
        <Typography.Title level={4} className="!mb-0">
          Your Contacts
        </Typography.Title>

        <Dropdown menu={profileMenu} placement="bottomRight">
          <Avatar
            icon={<UserOutlined />}
            className="cursor-pointer bg-gray-300"
          />
        </Dropdown>
      </Header>

      {/* CONTENT */}
      <Content className="bg-gray-100 p-6">
        <div className="mx-auto max-w-5xl rounded-lg bg-white p-6 shadow">
    {contacts && contacts.length === 0 ? (
      <div className="flex h-64 items-center justify-center">
            <Empty description="Nothing data to display" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {contacts?.map((c) => (
              <ContactCard
                key={c.id}
                id={c.id}
                name={c.name}
                email={c.email}
                phoneNumber={c.phoneNumber}
                tag={c.tag}
              />
            ))}
          </div>
        )}
      </div>
      </Content>

      {/* FLOATING ADD CONTACT */}
      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setOpen(true)}
        tooltip="Add Contact"
      />

      <AddContactModal open={open} onClose={() => setOpen(false)} />
      
      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
    </Layout>
  );
}

export default HomePage;
