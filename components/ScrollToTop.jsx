'use client';

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ScrollToTop = () => {
    const pathname = usePathname();

    useEffect(() => {
        window.scroll(0, 0);
    }, [pathname])

    return null;
}

export default ScrollToTop;