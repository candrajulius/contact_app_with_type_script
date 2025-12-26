import { DeleteOutlined, MailOutlined, PhoneOutlined, TagOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, message, Popconfirm } from "antd";
import { deleteContact } from "../lib/api";

type ContactCardProps = {
    id: string;
    name: string;
    phoneNumber: string
    email: string;
    tag: string;
};

export default function ContactCard({
  id,
  name,
  phoneNumber,
  email,
  tag,
}: ContactCardProps) {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteContact,
        onSuccess: (res) => {
            message.success(res.message);
            queryClient.invalidateQueries({queryKey: ["contacts"]});
        },
    });

  return (
    <Card hoverable size="small" className="w-full">
         <Popconfirm
        title="Delete contact ?"
        description={`Are you sure delete contact ${id} ?`}
        okText="Delete"
        cancelText="Cancel"
        onConfirm={() => mutation.mutate(id)}
      >
        <DeleteOutlined className="absolute right-3 top-3 cursor-pointer !text-red-500 hover:!text-red-600" />
      </Popconfirm>

      <div className="space-y-2 text-sm">
        {/* Name */}
        <div className="flex items-center gap-2">
          <UserOutlined className="text-blue-500" />
          <span className="font-medium">Name:</span>
          <span>{name?? "-"}</span>
        </div>

        {/* Email */}
        <div className="flex items-center gap-2">
          <MailOutlined className="text-green-500" />
          <span className="font-medium">Email:</span>
          <span>{email ?? "-"}</span>
        </div>

        {/* Phone Number */}
        <div className="flex items-center gap-2">
          <PhoneOutlined className="text-purple-500" />
          <span className="font-medium">Phone Number:</span>
          <span>{phoneNumber ?? "-"}</span>
        </div>

        {/* Tag */}
        <div className="flex items-center gap-2">
          <TagOutlined className="text-orange-500" />
          <span className="font-medium">Tag:</span>
          <span>{tag ?? "-"}</span>
        </div>
      </div>
    </Card>
  );
}