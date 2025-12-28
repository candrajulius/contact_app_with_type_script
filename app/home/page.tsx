"use client";

import { Layout, Spin, Typography, Avatar, Dropdown, FloatButton, Empty, Input } from "antd";
import { PlusOutlined, UserOutlined, LogoutOutlined, SearchOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ContactCard from "../components/ContactCard";
import AddContactModal from "../components/AddContactModal";
import { Contact, getContacts } from "../lib/api";
import ProfileModal from "../components/ProfileModal";

const { Header, Content } = Layout;

function HomePage() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [search, setSearch] = useState("");


  // REACT QUERY
  const { data: contacts = [], isLoading } = useQuery<Contact[]>({
    queryKey: ["contacts"],
    queryFn: async () => {
      const res = await getContacts();
      if (res.error) throw new Error(res.message);
      return res.data ?? [];
    },
  });

  const filteredContacts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if(!q) return contacts;
    return contacts?.filter((c) => {
      const haystack = [
        c.name,
        c.email,
        c.phoneNumber,
        c.tag,
        c.id, // optional kalau mau bisa search by id juga
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
    
  }, [contacts, search]);

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
    <Layout className="min-h-screen !bg-white">
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <Spin size="large"/>
      </div>
    </Layout>
  );
}

  return (
    <Layout className="min-h-screen !bg-white">
      {/* FIXED HEADER */}
       <Header className="sticky top-0 z-50 !h-auto !bg-white px-6 py-10 shadow sm:px-8">
        <div className="flex items-center justify-between">
          <Typography.Title level={4} className="!mb-0 truncate">
            Your Contacts
          </Typography.Title>

          <Dropdown menu={profileMenu} placement="bottomRight">
            <Avatar
              size={36}
              icon={<UserOutlined />}
              style={{marginTop: "10px", cursor: "pointer"}}
            />
          </Dropdown>
        </div>

         <div className="mt-3 sm:mt-0 sm:hidden">
          <Input
            allowClear
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, phone, tag..."
            prefix={<SearchOutlined className="text-gray-400" />}
            className="w-full rounded-full"
          />
        </div>

      {/* Desktop search (muncul di sm ke atas) */}
      <div className="hidden sm:block">
        <Input
          allowClear
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, email, phone, tag..."
          prefix={<SearchOutlined className="text-gray-400" />}
          className="w-[360px] rounded-full"
        />
      </div>
      </Header>

      {/* CONTENT */}
      <Content className="flex-1 p-6 !bg-white">
        {isLoading ? (
          <div className="flex min-h-[50vh] items-center justify-center">
            <Spin size="large" />
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="flex min-h-[50vh] items-center justify-center">
            <Empty
              description={
                search.trim()
                  ? `Keyword "${search.trim()}" not found`
                  : "No contacts yet"
              }
            />
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredContacts.map((c) => (
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
