"use client";

import Image from "next/image";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";
import { navItems } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import FileUploader from "./FileUploader";
import { Button } from "./ui/button";
import { signOut } from "@/lib/actions/user.actions";

interface MobileNavigationProps {
  $id: string;
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}

const MobileNavigation = ({
  $id: ownerId,
  accountId,
  fullName,
  avatar,
  email,
}: MobileNavigationProps) => {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  return (
    <header className="mobile-header">
      <Image
        src="/icons/logo-full-brand.svg"
        alt="Logo"
        width={120}
        height={52}
        className="h-auto"
      />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image src="/icons/menu.svg" alt="Menu" width={30} height={30} />
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          <SheetTitle>
            <div className="header-user">
              <Image
                src={avatar}
                alt="avatar"
                width={44}
                height={44}
                className="header-user-avatar"
              />

              <div className="sm:hidden lg:block">
                <p className="subtitle-2 capitalize">{fullName}</p>
                <p className="caption">{email}</p>
              </div>
            </div>

            <Separator className="mb-4 bg-light-200/20" />
          </SheetTitle>

          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navItems.map(({ url, name, icon }) => (
                <Link key={name} href={url} className="lg:w-full">
                  <li
                    className={cn(
                      "mobile-nav-item",
                      pathname === url && "shad-active"
                    )}
                  >
                    <Image
                      src={icon}
                      alt={name}
                      width={24}
                      height={24}
                      className={cn(
                        "nav-icon",
                        pathname === url && "nav-icon-active"
                      )}
                    />
                    <p>{name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>

          <Separator className="my-5 bg-light-200/20" />

          <div className="flex flex-col justify-between gap-5 pb-5">
            <FileUploader ownerId={ownerId} accountId={accountId} />
            <Button
              className="mobile-sign-out-button"
              onClick={async () => await signOut()}
            >
              <Image
                src="/icons/logout.svg"
                alt="Logout"
                width={24}
                height={24}
              />
              <p>Logout</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};
export default MobileNavigation;
