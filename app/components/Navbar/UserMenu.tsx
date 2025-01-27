"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItems";
import { ElementRef, useCallback, useEffect, useRef, useState } from "react";

import useRegisterModel from "@/app/hooks/useRegisterModel";
import useLoginModel from "@/app/hooks/useLoginModel";
import useRentModel from "@/app/hooks/useRentModel";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const rentModel = useRentModel();
  const registerModel = useRegisterModel();
  const loginModel = useLoginModel();
  // dropDown menu functionality
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModel.onOpen();
    }
    rentModel.onOpen();
  }, [currentUser, loginModel, rentModel]);

  const closeRef = useRef<ElementRef<"div">>(null);

  const onClickOutside = (event: MouseEvent) => {
    if (closeRef.current && !closeRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", onClickOutside);

    return () => document.removeEventListener("mousedown", onClickOutside);
  });

  return (
    <div ref={closeRef} className="relative">
      {/* listing creation clickable div */}
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="
        hidden
        md:block
        text-sm
        font-semibold
        py-3
        px-4
        rounded-full
        hover:bg-neutral-100
        transition
        cursor-pointer
        "
        >
          Airbnb Your Home
        </div>
        <div
          onClick={toggleOpen}
          className="
        p-4
        md:py-1
        md:px-2
        border-[1px]
        border-neutral-200
        flex
        flex-row
        items-center
        gap-3
        rounded-full
        cursor-pointer
        hover:shadow-md
        transition
        "
        >
          {/* profile avatar (or picture) and dropdown functionality pic */}
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {/* checking state of OPEN before dropDown */}
      {isOpen && (
        <div
          className="
        absolute
        rounded-xl
        shadow-md
        w-[50vw]
        md:w-4/5
        bg-white
        overflow-hidden
        right-0
        top-12
        text-sm

        "
        >
          {/* Login and SignUp components */}
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => {
                    router.push("/trips");
                    toggleOpen();
                  }}
                  label="My Trips"
                />

                <MenuItem
                  onClick={() => {
                    router.push("/favorites");
                    toggleOpen();
                  }}
                  label="My Favorites"
                />

                <MenuItem
                  onClick={() => {
                    router.push("/reservations");
                    toggleOpen();
                  }}
                  label="My Reservations"
                />

                <MenuItem
                  onClick={() => {
                    router.push("/properties");
                    toggleOpen();
                  }}
                  label="My Properties"
                />

                <MenuItem onClick={rentModel.onOpen} label="Airbnb My Home" />

                <hr />

                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModel.onOpen} label="Login" />

                <MenuItem onClick={registerModel.onOpen} label="SignUp" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
