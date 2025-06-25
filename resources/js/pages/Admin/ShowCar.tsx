import { motion } from 'framer-motion';
import { router } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Star, Users, Zap, Calendar, DollarSign, Fuel, Pencil, Trash2, Loader2 } from 'lucide-react';
import CountUp from 'react-countup';
import { toast, Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';

export default function ShowCar({ car }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isReturning, setIsReturning] = useState(false);

    // Clean up toasts when component unmounts
    useEffect(() => {
        return () => {
            toast.dismiss('edit');
            toast.dismiss('delete');
            toast.dismiss('return');
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

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this car?')) {
            setIsDeleting(true);
            toast.loading('Deleting car...', {
                id: 'delete',
                position: 'top-right'
            });

            router.delete(`/admin/${id}`, {
                onSuccess: () => {
                    toast.success('Car deleted successfully!', {
                        position: 'top-right',
                        icon: '🚗',
                    });
                },
                onError: () => {
                    toast.error('Failed to delete car', {
                        position: 'top-right',
                        icon: '❌',
                    });
                },
                onFinish: () => {
                    setIsDeleting(false);
                    toast.dismiss('delete');
                }
            });
        }
    };

    const handleReturn = () => {
        setIsReturning(true);
        toast.loading('Returning to dashboard...', {
            id: 'return',
            position: 'top-right'
        });

        // Add timeout to ensure toast is dismissed if navigation is slow
        setTimeout(() => {
            toast.dismiss('return');
        }, 2000);
    };

    const handleEdit = () => {
        setIsEditing(true);
        toast.loading('Opening editor...', {
            id: 'edit',
            position: 'top-right'
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
                        href="/admin"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                        onStart={handleReturn}
                        onSuccess={() => {
                            setIsReturning(false);
                            toast.dismiss('return');
                        }}
                        onError={() => {
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
                    <motion.div variants={itemVariants} className="space-y-5">
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
                                    <span className="text-gray-500 dark:text-gray-400 ml-1 text-sm">MAD / day</span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                Taxes and fees included
                            </p>
                        </motion.div>

                        {/* Specs */}
                        <motion.div
                            variants={itemVariants}
                            className="grid grid-cols-2 gap-4 mt-6"
                        >
                            {[
                                { label: 'Year', value: car.year, icon: Calendar },
                                { label: 'Fuel', value: car.fuel_type, icon: Fuel },
                                { label: 'Transmission', value: car.transmission, icon: Zap },
                                { label: 'Seats', value: car.seats, icon: Users }
                            ].map(({ label, value, icon: Icon }) => (
                                <div
                                    key={label}
                                    className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg"
                                >
                                    <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                                        <Icon className="h-5 w-5 mr-2" />
                                        <span className="text-sm">{label}</span>
                                    </div>
                                    <div className="text-lg font-medium capitalize">{value}</div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="mt-6 flex gap-4"
                        >
                            <Link
                                href={`/admin/${car.id}/edit`}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow transition duration-300"
                                onStart={handleEdit}
                                onSuccess={() => {
                                    setIsEditing(false);
                                    toast.dismiss('edit');
                                }}
                                onError={() => {
                                    setIsEditing(false);
                                    toast.dismiss('edit');
                                }}
                            >
                                {isEditing ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Loading...
                                    </>
                                ) : (
                                    <>
                                        <Pencil className="h-4 w-4 mr-2" />
                                        Edit
                                    </>
                                )}
                            </Link>
                            <button
                                onClick={() => handleDelete(car.id)}
                                disabled={isDeleting}
                                className="inline-flex items-center px-4 py-2 bg-red-600 text-white hover:bg-red-700 cursor-pointer rounded-lg shadow transition duration-300"
                            >
                                {isDeleting ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete
                                    </>
                                )}
                            </button>
                        </motion.div>

                        {/* About Vehicle */}
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
                        <div className="absolute top-4 right-4 bg-white dark:bg-gray-900 px-3 py-1 rounded-full shadow-md flex items-center">
                            <span className="text-xs font-semibold text-gray-900 dark:text-white">ID: {car.slug}</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
}