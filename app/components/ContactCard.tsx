import { DeleteOutlined, ExclamationCircleFilled, MailOutlined, PhoneOutlined, TagOutlined, UserOutlined} from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Avatar, Card, message, Modal } from "antd";
import { deleteContact } from "../lib/api";
import InfoRow from "./InfoRow";

type ContactCardProps = {
    id: string;
    name: string;
    phoneNumber: string
    email: string;
    tag: string;
    imageUrl?: string;
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

    const showDeleteConfirm = () => {
        Modal.confirm({
            title: "Delete Contact Confirmation",
            content: `Are you sure you want to delete this contact with id: ${id} ?`,
            okText: "Yes",
            icon: <ExclamationCircleFilled />,
            cancelText: "No",
            okButtonProps: { danger: true },
            onOk: async () => {
                await mutation.mutateAsync(id);
            },
        });
      };

  return (
    <Card hoverable size="small" className="w-full">

      <DeleteOutlined onClick={showDeleteConfirm} className="absolute right-3 top-3 !text-red-500 hover:!text-red-600" />

      <div className="space-y-2 text-sm">

        {/* Name */}
        <InfoRow icon={<UserOutlined />} label="Name" value={name} />

        {/* Email */}
        <InfoRow icon={<MailOutlined />} label="Email" value={email} />

        {/* Phone Number */}
        <InfoRow icon={<PhoneOutlined />} label="Phone Number" value={phoneNumber} />

        {/* Tag */}
        <InfoRow icon={<TagOutlined />} label="Tag" value={tag} />
      </div>
    </Card>
  );
}