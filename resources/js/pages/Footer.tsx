import { Phone, Mail, MapPin, Clock, Shield, BadgeCheck, HelpCircle, FileText, MessageSquare } from 'lucide-react';
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import './../../css/fonts.css';
import logo from "./images/logo-removebg-preview.png";

export default function Footer() {

    return (
        <footer className="relative bg-gray-950 pt-20 pb-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800 overflow-hidden" id='contact'>
            {/* Background elements */}
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Column 1: Logo & Social */}
                    <div className="space-y-6">
                        <div className="flex items-center">
                            <img src={logo} alt="Azmasim Logo" className="h-12 w-auto" />
                            <span className="ml-3 text-2xl font-bold text-white" style={{ fontFamily: "text" }} >AZ-Masim</span>
                        </div>
                        <p className="text-gray-400" style={{ fontFamily: "text" }}>
                            Your trusted road companion in Morocco.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://web.facebook.com/profile.php?id=100075925266741"
                                className="text-gray-400 hover:text-blue-500 transition-colors duration-300 transform hover:scale-110" target="_blank">
                                <FaFacebookF className="h-6 w-6" />
                            </a>
                            <a href="https://www.instagram.com/azmasim/"
                                className="text-gray-400 hover:text-pink-500 transition-colors duration-300 transform hover:scale-110" target="_blank">
                                <FaInstagram className="h-6 w-6" />
                            </a>
                            <a href="https://www.tiktok.com/@az.masim.car"
                                className="text-gray-400 hover:text-black transition-colors duration-300 transform hover:scale-110" target="_blank">
                                <FaTiktok className="h-6 w-6" />
                            </a>
                            <a href="https://wa.me/212661775562" target="_blank" rel="noopener noreferrer"
                                className="text-gray-400 hover:text-green-500 transition-colors duration-300 transform hover:scale-110"
                            >
                                <FaWhatsapp className="h-6 w-6" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Customer Support */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-white">Customer Support</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2"><HelpCircle className="h-4 w-4" /> FAQ</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2"><FileText className="h-4 w-4" /> Terms & Conditions</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2"><Shield className="h-4 w-4" /> Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2"><MessageSquare className="h-4 w-4" /> Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-white">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <Phone className="flex-shrink-0 mt-1 h-5 w-5 text-yellow-400" />
                                <div>
                                    <p className="text-gray-400">Phone</p>
                                    <a href="tel:+212661775562" className="text-white hover:text-yellow-400 transition-colors duration-300">+212 6 61 77 55 62</a>
                                </div>
                            </li>
                            <li className="flex items-start space-x-3">
                                <Mail className="flex-shrink-0 mt-1 h-5 w-5 text-yellow-400" />
                                <div>
                                    <p className="text-gray-400">Email</p>
                                    <a href="mailto:azmasimcar@gmail.com" className="text-white hover:text-yellow-400 transition-colors duration-300">azmasimcar@gmail.com</a>
                                </div>
                            </li>
                            <li className="flex items-start space-x-3">
                                <MapPin className="flex-shrink-0 mt-1 h-5 w-5 text-yellow-400" />
                                <div>
                                    <p className="text-gray-400">Address</p>
                                    <p className="text-white">Qt,Issabanen Rue Azlaf N°25 Route Zeghanghan ,Nador 62000</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Fills Right Space - Business Hours & Trust Signals */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Clock className="h-5 w-5 text-yellow-400" /> Hours
                            </h3>
                            <ul className="space-y-2 text-gray-400">
                                <li className="flex justify-between">
                                    <span>Mon-Fri</span>
                                    <span className="text-white">8:00 - 20:00</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Saturday</span>
                                    <span className="text-white">9:00 - 18:00</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Sunday</span>
                                    <span className="text-white">Emergency Only</span>
                                </li>
                            </ul>
                        </div>

                        <div className="pt-4 space-y-3">
                            <div className="flex items-center gap-2 text-yellow-400">
                                <BadgeCheck className="h-5 w-5" />
                                <span className="text-white font-medium">Certified Vehicles</span>
                            </div>
                            <div className="flex items-center gap-2 text-yellow-400">
                                <Shield className="h-5 w-5" />
                                <span className="text-white font-medium">24/7 Support</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-800 text-center">
                    <p className="text-gray-500 text-sm">
                        &copy; 2025 Azmasim. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

