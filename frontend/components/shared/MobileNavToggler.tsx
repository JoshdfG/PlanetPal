"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
    Sheet,
    SheetContent,
    SheetClose,
    SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/utils/NavLinks";
import Logo from "./Logo";

export const MobileNavToggler = () => {
    const pathname = usePathname();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className=" border-color2 text-color2" size="icon">
                    <HamburgerMenuIcon />
                </Button>
            </SheetTrigger>
            <SheetContent >
                <main className="w-full flex flex-col gap-16">
                    <div className="w-full flex justify-between items-center">
                        <Logo />
                    </div>
                    <ul className="flex flex-col gap-6 pl-2">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <SheetClose asChild>
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "text-base font-medium text-color2  transition",
                                            {
                                                "text-color1 underline underline-offset-2": link.href == pathname,
                                                "hover:text-color1": link.href != pathname,
                                            }
                                        )}>
                                        {link.name}
                                    </Link>
                                </SheetClose>
                            </li>
                        ))}
                    </ul>
                </main>
            </SheetContent>
        </Sheet>
    );
};
