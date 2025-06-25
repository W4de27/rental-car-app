import '../../css/fonts.css'
import logo from '../pages/images/logo-removebg-preview.png'
import { usePage, Link } from '@inertiajs/react';
import type { SharedData } from '@/types'; // Assuming this includes `auth`


export default function AppLogo() {
    const { auth } = usePage<SharedData>().props;

    let dashboardLink = '/dashboard'; // default fallback
    if (auth.user.role === 'admin') dashboardLink = '/admin';
    else if (auth.user.role === 'manager') dashboardLink = '/manager';
    else if (auth.user.role === 'user') dashboardLink = '/user';

    return (
        <Link href={dashboardLink} className="hover:no-underline">
            <div className="flex items-center p-1 rounded-xl bg-neutral-900/80 backdrop-blur-md dark:bg-transparent">

                {/* Logo Container */}
                <div className="flex items-center space-x-3">
                    <div className="relative inline-block transition-all duration-300 transform hover:scale-105 group pb-1">
                        <img
                            src={logo}
                            alt="Logo"
                            className="h-11 w-30 object-contain rounded-lg hover:shadow-lg"
                        />
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-transparent group-hover:bg-yellow-500 transition-all duration-300 mt-1"></span>
                    </div>
                </div>

                {/* Text Container */}
                <div className="flex flex-col">
                    <span className="text-md font-bold tracking-tight text-yellow-200" style={{ fontFamily: "title" }}>
                        AZ-Masim
                    </span>
                    <span className="text-xs text-white dark:text-gray-400">
                        Nador Car Rental
                    </span>
                </div>
            </div>
        </Link>
    );

}

