// import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import './../../css/fonts.css';
import Footer from './Footer'


import video from "./images/vid2.mp4"
import logo from "./images/logo-removebg-preview.png";
// import carBody from './images/car3-removebg-preview.png';
import car1 from "./images/ser1.jpg";
import car2 from "./images/ser2.jpeg";
import car3 from "./images/ser3.jpg";
import car4 from "./images/ser4.webp";
import AboutImg from "./images/about-bdyImg.png";


export default function Welcome() {
    const { auth } = usePage<{ auth: { user: { role: string } | null } }>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-0 dark:bg-[#0a0a0a]">
                <header className="fixed top-0 left-0 z-50 w-full py-2 px-6 flex items-center justify-between border-b border-yellow-500  backdrop-blur-md">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-3">
                        <a href="#" className="relative inline-block transition-all duration-300 transform hover:scale-105 group pb-2">
                            <img
                                src={logo}
                                alt="Logo"
                                className="h-16 w-40 object-contain rounded-lg shadow-md hover:shadow-lg"
                            />
                            <span className="absolute bottom-0 left-0 w-full h-1 bg-transparent group-hover:bg-yellow-500 transition-all duration-300 mt-1"></span>
                        </a>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex justify-center items-center gap-10 lg:gap-20">
                        <a href="#services" className="text-white relative group transition-all duration-300" style={{ fontFamily: "text" }}>
                            <span className="hover:text-yellow-400 transition-colors duration-300">Services</span>
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
                        </a>

                        <a href="#about" className="text-white relative group transition-all duration-300" style={{ fontFamily: "text" }} >
                            <span className="hover:text-yellow-400 transition-colors duration-300">About</span>
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
                        </a>

                        <a href="#contact" className="text-white relative group transition-all duration-300" style={{ fontFamily: "text" }}>
                            <span className="hover:text-yellow-400 transition-colors duration-300">Contact</span>
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
                        </a>
                    </div>

                    {/* Auth Buttons */}
                    <nav className="flex items-center gap-4">
                        {auth.user ? (
                            <Link
                                href={
                                    auth.user.role === 'admin'
                                        ? '/admin'  // Redirect to admin dashboard
                                        : auth.user.role === 'manager'
                                            ? '/manager' // Redirect to manager dashboard
                                            : auth.user.role === 'user'
                                                ? '/user'    // Redirect to user dashboard
                                                : '/' // Fallback to home page if no role
                                }
                                className="inline-block rounded-sm border border-white/20 px-5 py-1.5 text-sm leading-normal text-white hover:bg-white/20 transition duration-300"
                                style={{ fontFamily: "text" }}
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-white hover:bg-white/10 transition duration-300"
                                    style={{ fontFamily: "text" }}
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-white/30 px-5 py-1.5 text-sm leading-normal text-white hover:bg-white/10 hover:border-yellow-400 transition duration-300"
                                    style={{ fontFamily: "text" }}
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="relative w-full h-screen overflow-hidden pt-50">
                    {/* Video Background with Dark Overlay */}
                    <div className="absolute inset-0 z-0">
                        <video autoPlay loop muted playsInline src={video} className="w-full h-full object-cover brightness-50" >
                        </video>
                        <div className="absolute inset-0 bg-black/50"></div>
                    </div>

                    {/* Content Container */}
                    <div className="container mx-auto h-full flex items-center justify-center relative z-10 px-6">
                        {/* Centered Content */}
                        <div className="w-full max-w-4xl mx-auto space-y-6 text-white text-center relative bottom-25"> {/* Removed bottom-15 */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ fontFamily: 'title' }}>
                                <span className='text-yellow-300 block'>Drive Beyond Limits</span>
                                <span className='text-4xl block mt-2'>Where Every Road Tells a Story</span>
                            </h1>
                            <p className="text-lg md:text-xl opacity-90 max-w-lg mx-auto" style={{ fontFamily: 'text' }}>
                                Unleash the journey - where every turn ignites adventure, and every mile writes your story.
                            </p>
                            <div className="flex gap-4 justify-center">
                                <Link
                                    href={route('login')}
                                    className="inline-block bg-yellow-500 hover:bg-transparent border-2 border-transparent hover:border-yellow-500 text-white hover:text-yellow-500 px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                                >
                                    Get Started
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="inline-block border-2 border-yellow-500 hover:bg-yellow-500 hover:text-black text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-800">
                    <div className="max-w-7xl mx-auto">
                        <h2 id='services' className="text-3xl font-bold text-center text-white mb-12" style={{ fontFamily: "title" }} >Our Premium Services</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
                            {/* Card 1 */}
                            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 bg-gray-800 border-4 border-gray-700 hover:border-yellow-400">
                                <div className="h-56 overflow-hidden">
                                    <img
                                        src={car1}
                                        alt="Roadside assistance"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75 group-hover:brightness-90"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-yellow-400 mb-2">24/7 Roadside Assistance</h3>
                                    <p className="text-gray-300 mb-4" style={{ fontFamily: "text" }}>
                                        Travel with peace of mind knowing our emergency team is always on call.
                                    </p>
                                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 bg-gray-800 border-4 border-gray-700 hover:border-blue-400">
                                <div className="h-56 overflow-hidden">
                                    <img
                                        src={car2}
                                        alt="Airport pickup"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75 group-hover:brightness-90"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-blue-400 mb-2">Seamless Airport Pickup</h3>
                                    <p className="text-gray-300 mb-4" style={{ fontFamily: "text" }}>
                                        Skip the taxi line. Your pre-booked car will be waiting when you land.
                                    </p>
                                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 bg-gray-800 border-4 border-gray-700 hover:border-orange-400">
                                <div className="h-56 overflow-hidden">
                                    <img
                                        src={car3}
                                        alt="4x4 Adventure"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75 group-hover:brightness-90"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-orange-400 mb-2">Desert-Ready 4x4 Adventures</h3>
                                    <p className="text-gray-300 mb-4" style={{ fontFamily: "text" }}>
                                        Conquer Morocco's rugged terrain with our fully-equipped 4x4 fleet.
                                    </p>
                                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            </div>

                            {/* Card 4 */}
                            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 bg-gray-800 border-4 border-gray-700 hover:border-green-400">
                                <div className="h-56 overflow-hidden">
                                    <img
                                        src={car4}
                                        alt="Family travel"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75 group-hover:brightness-90"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-green-400 mb-2">Family Travel Packages</h3>
                                    <p className="text-gray-300 mb-4" style={{ fontFamily: "text" }}>
                                        Spacious vehicles with child seats and entertainment systems.
                                    </p>
                                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section About */}
                <div id='about' className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gray-900 overflow-hidden">
                    {/* Animated background elements */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
                    <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Left Side - Image with hover effect */}
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-50 blur-md transition-all duration-500"></div>
                                <img src={AboutImg} alt="Azmasim team in Nador"
                                    className="relative rounded-xl shadow-2xl transform transition-all duration-500 group-hover:-translate-y-2 w-full h-auto object-cover"
                                />
                                <div className="absolute inset-0 group-hover:bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-300 rounded-b-xl">
                                    {/* Text container fixed at bottom with solid dark background */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/40 rounded-b-xl">
                                        <p className="text-white font-bold text-sm opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-2 transition-all duration-300">
                                            Our team in Nador, ready to serve you
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - Content */}
                            <div className="space-y-8">
                                <h2 className="text-4xl font-bold text-white" style={{ fontFamily: "text" }}>
                                    About <span className="text-yellow-400">AZ Masim</span> – Your Trusted Road Companion
                                </h2>

                                <p className="text-lg text-gray-300 leading-relaxed">
                                    Born in the heart of Nador, Azmasim is more than a car rental – we're your gateway to authentic Moroccan journeys. With 10+ years of local expertise, we blend personalized service with meticulously maintained vehicles to ensure every drive feels like a first-class adventure.
                                </p>

                                <p className="text-lg text-gray-300 leading-relaxed">
                                    Our mission? To turn your travel plans into seamless stories – whether you're a solo explorer chasing coastal sunsets, a family creating memories, or a business traveler demanding reliability. We speak the language of the road, and now, we invite you to ride with us.
                                </p>

                                {/* Highlights Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                                    {/* Highlight 1 */}
                                    <div className="flex items-start space-x-4 p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all duration-300 group">
                                        <div className="flex-shrink-0 p-3 bg-yellow-500/10 rounded-lg text-yellow-400 group-hover:bg-yellow-500/20 transition-colors duration-300">
                                            <span className="text-2xl">🛠️</span>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-white">Local Mechanics</h4>
                                            <p className="text-gray-400">Every car serviced by Nador's best</p>
                                        </div>
                                    </div>

                                    {/* Highlight 2 */}
                                    <div className="flex items-start space-x-4 p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all duration-300 group">
                                        <div className="flex-shrink-0 p-3 bg-blue-500/10 rounded-lg text-blue-400 group-hover:bg-blue-500/20 transition-colors duration-300">
                                            <span className="text-2xl">🌍</span>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-white" >Morocco Experts</h4>
                                            <p className="text-gray-400">Hidden gems & route advice included</p>
                                        </div>
                                    </div>

                                    {/* Highlight 3 */}
                                    <div className="flex items-start space-x-4 p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all duration-300 group">
                                        <div className="flex-shrink-0 p-3 bg-green-500/10 rounded-lg text-green-400 group-hover:bg-green-500/20 transition-colors duration-300">
                                            <span className="text-2xl">🤝</span>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-white">No Hidden Fees</h4>
                                            <p className="text-gray-400">Transparent pricing, always</p>
                                        </div>
                                    </div>

                                    {/* Highlight 4 */}
                                    <div className="flex items-start space-x-4 p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all duration-300 group">
                                        <div className="flex-shrink-0 p-3 bg-purple-500/10 rounded-lg text-purple-400 group-hover:bg-purple-500/20 transition-colors duration-300">
                                            <span className="text-2xl">🚗</span>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-white">Flexible Returns</h4>
                                            <p className="text-gray-400">Extend your rental with one call</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Footer for Contact */}
                <Footer />
            </div>
        </>
    );
}
