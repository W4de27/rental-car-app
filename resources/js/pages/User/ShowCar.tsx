import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Star, Users, Zap, Calendar, DollarSign, Fuel, Loader2, CalendarCheck } from 'lucide-react';
import CountUp from 'react-countup';
import { toast, Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';

export default function ShowCar({ car }) {
    const [isReturning, setIsReturning] = useState(false);
    const [isReserving, setIsReserving] = useState(false);

    // Clean up toasts when component unmounts
    useEffect(() => {
        return () => {
            toast.dismiss('return');
            toast.dismiss('reserve');
        };
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    const handleReturn = () => {
        setIsReturning(true);
        toast.loading('Returning to dashboard...', {
            id: 'return',
            position: 'top-right'
        });
    };

    const handleReserve = () => {
        setIsReserving(true);
        toast.loading('Preparing reservation...', {
            id: 'reserve',
            position: 'top-right',
            duration: Infinity
        });
    };

    return (
        <>
            <Toaster />
            <div className="px-4 sm:px-6 lg:px-8 py-4 max-w-7xl mx-auto">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4"
                >
                    <Link
                        href="/user"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                        onStart={handleReturn}
                        onComplete={() => {
                            setIsReturning(false);
                            toast.dismiss('return');
                        }}
                    >
                        {isReturning ? (
                            <>
                                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                Returning...
                            </>
                        ) : (
                            <>
                                <ArrowLeft className="h-5 w-5 mr-2" />
                                Back to Dashboard
                            </>
                        )}
                    </Link>
                </motion.div>

                {/* Main Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                    {/* Left Side - Car Details */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <motion.h1
                            variants={itemVariants}
                            className="text-3xl font-bold text-gray-900 dark:text-white"
                        >
                            {car.model}
                        </motion.h1>

                        {/* Rating */}
                        <motion.div variants={itemVariants} className="flex items-center">
                            <div className="flex text-yellow-400 mr-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-5 w-5 ${i < car.stars ? 'fill-current' : 'text-gray-300 dark:text-gray-500'}`}
                                    />
                                ))}
                            </div>
                            <span className="text-gray-600 dark:text-gray-400">
                                (<CountUp end={car.reviews} duration={2} /> reviews)
                            </span>
                        </motion.div>

                        {/* Price */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-blue-200 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-100 dark:border-blue-900/50"
                        >
                            <div className="flex items-center">
                                <div className="mr-3 p-2 bg-blue-100 dark:bg-blue-800/50 rounded-full">
                                    <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                                </div>
                                <div className="flex items-baseline">
                                    <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                        {car.daily_price}
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-400 ml-1 text-sm">/ day</span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                Taxes and fees included
                            </p>
                        </motion.div>

                        {/* Specifications Grid */}
                        <motion.div
                            variants={itemVariants}
                            className="grid grid-cols-2 gap-4 mt-6"
                        >
                            <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
                                <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                                    <Calendar className="h-5 w-5 mr-2" />
                                    <span className="text-sm">Year</span>
                                </div>
                                <div className="text-lg font-medium">{car.year}</div>
                            </div>

                            <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
                                <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                                    <Fuel className="h-5 w-5 mr-2" />
                                    <span className="text-sm">Fuel</span>
                                </div>
                                <div className="text-lg font-medium capitalize">{car.fuel_type}</div>
                            </div>

                            <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
                                <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                                    <Zap className="h-5 w-5 mr-2" />
                                    <span className="text-sm">Transmission</span>
                                </div>
                                <div className="text-lg font-medium capitalize">{car.transmission}</div>
                            </div>

                            <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
                                <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                                    <Users className="h-5 w-5 mr-2" />
                                    <span className="text-sm">Seats</span>
                                </div>
                                <div className="text-lg font-medium">{car.seats}</div>
                            </div>
                        </motion.div>

                        {/* Reserve Button */}
                        <motion.div variants={itemVariants} className="mt-6">
                            <Link
                                href={`/user/create/${car.id}`}
                                className="inline-flex items-center justify-center w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition duration-300"
                                onStart={handleReserve}
                                onComplete={() => {
                                    setIsReserving(false);
                                    toast.dismiss('reserve');
                                }}
                                preserveScroll
                            >
                                {isReserving ? (
                                    <>
                                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                        Preparing Reservation...
                                    </>
                                ) : (
                                    <>
                                        <CalendarCheck className="h-5 w-5 mr-2" />
                                        Reserve This Car
                                    </>
                                )}
                            </Link>
                        </motion.div>

                        {/* Additional Info */}
                        <motion.div variants={itemVariants} className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">About This Vehicle</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Experience premium comfort and performance with the {car.model}. Perfect for {car.seats} passengers with its {car.transmission} transmission and {car.fuel_type} engine.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Car Image */}
                    <motion.div
                        variants={itemVariants}
                        className="relative h-full min-h-[400px] rounded-xl overflow-hidden shadow-lg"
                    >
                        <img
                            src={`/storage/${car.image}`}
                            alt={car.model}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                        {/* Floating Badge */}
                        <div className="absolute top-4 right-4 bg-white dark:bg-gray-900 px-3 py-1 rounded-full shadow-md flex items-center">
                            <span className="text-xs font-semibold text-gray-900 dark:text-white">ID: {car.slug}</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
}