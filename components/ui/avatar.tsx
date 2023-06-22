import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import { useCallback } from "react";
import Image from "next/image";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const router = useRouter();

  const { data: fetchedUser } = useUser(userId);

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();

      const url = `/users/${userId}`;

      router.push(url);
    },
    [router, userId]
  );
  return (
    <div
      className={`
    ${hasBorder ? "border-2 border-black" : ""}
    ${isLarge ? "h-36" : "h-10"}
    ${isLarge ? "w-36" : "w-10"}
    rounded-full 
    hover:opacity-90 
    transition 
    cursor-pointer
    relative
    bg-white
  `}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="Avatar"
        onClick={onClick}
        src={fetchedUser?.profileImage || `/images/default_profile.png`}
      />
    </div>
  );
};

export default Avatar;
