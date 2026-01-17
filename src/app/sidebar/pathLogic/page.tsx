'use client';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
const usePath = () => {
    const pathname = usePathname();
    const [showSideBar,setShowSideBar] = useState(false);
    const Active = (path: string) => pathname === path;
    return { Active,showSideBar,setShowSideBar};
}
export default usePath;