"use client";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const Auth = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const publicPaths = ["/", "/signin", "/signup"];
        const token = localStorage.getItem("access_token");

        if (!token && !publicPaths.includes(pathname)) {
            router.replace("/signin");
        } else {
            setLoading(false);
        }
    }, [pathname, router]);

    if (loading) return null;

    return children;
};

export default Auth;
