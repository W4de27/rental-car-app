import AppLogoIcon from '@/components/app-logo-icon';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { Car, MapPin, Shield, Star } from 'lucide-react';
import logo from "../../pages/images/logo-removebg-preview.png";
import bgLogin from "../../pages/images/login2.jpg"
import "../../../css/fonts.css"


export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const { quote } = usePage<SharedData>().props;

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2">
            {/* Left Side - Premium Branding */}
            <div className="relative hidden h-full flex-col justify-between p-12 text-white lg:flex bg-gradient-to-br from-gray-900 to-gray-800">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 opacity-90">
                    <img
                        src={bgLogin}
                        alt="Nador Highway at Night"
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Top Logo */}
                <div className="flex items-center space-x-3">
                    <a href={route('home')} className="relative inline-block transition-all duration-300 transform hover:scale-105 group pb-2">
                        <img
                            src={logo}
                            alt="Logo"
                            className="h-24 w-60 object-contain rounded-lg shadow-md hover:shadow-lg"
                        />
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-transparent group-hover:bg-yellow-500 transition-all duration-300 mt-1"></span>
                    </a>
                </div>


                {/* Main Content */}
                <div className="relative z-20 space-y-8">
                    <h2 className="text-4xl font-bold leading-tight" style={{ fontFamily: "title" }}>
                        <span className="text-yellow-400">Drive</span> Through<br />
                        Nador's Beauty
                    </h2>

                    <div className="flex items-center gap-3 text-yellow-400">
                        <div className="h-px w-12 bg-yellow-400"></div>
                        <span>PREMIUM SERVICE</span>
                    </div>

                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-center gap-3">
                            <Car className="h-5 w-5 text-yellow-400" />
                            <span>60+ Well-Maintained Vehicles</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-yellow-400" />
                            <span>Convenient Nador Locations</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Shield className="h-5 w-5 text-yellow-400" />
                            <span>Full Insurance Coverage</span>
                        </li>
                    </ul>
                </div>

                {/* Testimonial/Bottom Content */}
                <div className="relative z-20">
                    {quote ? (
                        <blockquote className="space-y-2 rounded-lg bg-black/30 p-6 backdrop-blur-sm">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-current" />
                                ))}
                            </div>
                            <p className="text-lg">&ldquo;{quote.message}&rdquo;</p>
                            <footer className="text-sm text-neutral-300">— {quote.author}</footer>
                        </blockquote>
                    ) : (
                        <div className="rounded-lg bg-black/30 p-6 backdrop-blur-sm">
                            <p className="text-lg text-yellow-400">24/7 Customer Support</p>
                            <p className="text-sm text-gray-300">Available in English, Arabic & French</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full p-6 sm:p-8 lg:p-12">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
                    {/* Mobile Logo */}
                    <Link href={route('home')} className="flex items-center justify-center lg:hidden">
                        <AppLogoIcon className="size-12 fill-current text-yellow-500" />
                    </Link>

                    {/* Form Header */}
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
                        <p className="text-muted-foreground mt-2 text-sm">{description}</p>
                    </div>

                    {/* Form Content */}
                    <div className="rounded-lg border bg-card p-6 shadow-sm">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}