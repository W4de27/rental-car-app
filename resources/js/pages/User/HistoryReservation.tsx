import React, { useEffect } from 'react';
import UserLayout from '@/layouts/UserLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { router } from '@inertiajs/react';
import { Trash2, ArrowUp, Loader2, Calendar, Phone, Clock, DollarSign, CheckCircle, XCircle, AlertCircle, User, Mail, Zap, BadgeCheck } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import { useState } from 'react';
import CountUp from 'react-countup';

export default function HistoryReservation({ reservations, user }) {
    const [deletingId, setDeletingId] = useState(null);
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    // Scroll to top handler
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Show/hide scroll to top button based on scroll position
    useEffect(() => {
        const checkScroll = () => {
            if (!showScrollToTop && window.scrollY > 400) {
                setShowScrollToTop(true);
            } else if (showScrollToTop && window.scrollY <= 400) {
                setShowScrollToTop(false);
            }
        };

        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, [showScrollToTop]);

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to cancel this reservation?')) {
            setDeletingId(id);
            toast.loading('Cancelling reservation...', {
                id: 'delete',
                position: 'top-right'
            });

            router.delete(route('user.destroy', id), {
                onSuccess: () => {
                    toast.success('Reservation cancelled!', {
                        id: 'delete',
                        position: 'top-right',
                        icon: '🚗',
                    });
                },
                onError: () => {
                    toast.error('Failed to cancel reservation', {
                        id: 'delete',
                        position: 'top-right',
                        icon: '❌',
                    });
                },
                onFinish: () => {
                    setDeletingId(null);
                }
            });
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return (
                    <div className="flex items-center">
                        <Clock className="h-5 w-5 text-yellow-500" />
                        <span className="ml-2 text-yellow-600 dark:text-yellow-400">Pending</span>
                    </div>
                );
            case 'confirmed':
                return (
                    <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-500" />
                        <span className="ml-2 text-blue-600 dark:text-blue-400">Confirmed</span>
                    </div>
                );
            case 'active':
                return (
                    <div className="flex items-center">
                        <Zap className="h-5 w-5 text-green-500" />
                        <span className="ml-2 text-green-600 dark:text-green-400">Active</span>
                    </div>
                );
            case 'completed':
                return (
                    <div className="flex items-center">
                        <BadgeCheck className="h-5 w-5 text-purple-500" />
                        <span className="ml-2 text-purple-600 dark:text-purple-400">Completed</span>
                    </div>
                );
            case 'cancelled':
                return (
                    <div className="flex items-center">
                        <XCircle className="h-5 w-5 text-red-500" />
                        <span className="ml-2 text-red-600 dark:text-red-400">Cancelled</span>
                    </div>
                );
            default:
                return (
                    <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-gray-500" />
                        <span className="ml-2 text-gray-600 dark:text-gray-400">Unknown</span>
                    </div>
                );
        }
    };

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

    return (
        <UserLayout>
            <Toaster />
            <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
                >
                    Your Reservation History
                </motion.h1>

                {reservations.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl text-center"
                    >
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            You haven't made any reservations yet.
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-6"
                    >
                        {reservations.map((reservation) => (
                            <motion.div
                                key={reservation.id}
                                variants={itemVariants}
                                className="bg-gray-200 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-4 border-gray-300 shadow-gray-800 hover:shadow-black dark:border-gray-700 hover:dark:shadow-white/30 hover:dark:border-white/30 hover:border-black dark:border-gray-700"
                            >
                                <div className="md:flex">
                                    {/* Car Image */}
                                    <div className="md:w-1/3 lg:w-1/4">
                                        <div className="h-full w-full">
                                            <img
                                                src={`/storage/${reservation.car?.image}`}
                                                alt={reservation.car?.model}
                                                className="w-full h-64 md:h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Reservation Details */}
                                    <div className="p-6 md:w-2/3 lg:w-3/4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                                    {reservation.car?.model || 'Unknown Car'}
                                                </h2>
                                                <p className="text-gray-500 dark:text-gray-400 mb-4">
                                                    Reservation Code #<span className='text-red-500 font-semibold' >{reservation.reservation_code}</span>
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                {(() => {
                                                    switch (reservation.status.toLowerCase()) {
                                                        case 'pending':
                                                            return <Clock className="h-5 w-5 text-yellow-500" />;
                                                        case 'confirmed':
                                                            return <CheckCircle className="h-5 w-5 text-blue-500" />;
                                                        case 'active':
                                                            return <Zap className="h-5 w-5 text-green-500" />;
                                                        case 'completed':
                                                            return <BadgeCheck className="h-5 w-5 text-purple-500" />;
                                                        case 'cancelled':
                                                            return <XCircle className="h-5 w-5 text-red-500" />;
                                                        default:
                                                            return <AlertCircle className="h-5 w-5 text-gray-500" />;
                                                    }
                                                })()}
                                                <span className={`ml-2 text-sm font-medium ${reservation.status.toLowerCase() === 'pending' ? 'text-yellow-600 dark:text-yellow-400' :
                                                    reservation.status.toLowerCase() === 'confirmed' ? 'text-blue-600 dark:text-blue-400' :
                                                        reservation.status.toLowerCase() === 'active' ? 'text-green-600 dark:text-green-400' :
                                                            reservation.status.toLowerCase() === 'completed' ? 'text-purple-600 dark:text-purple-400' :
                                                                'text-red-600 dark:text-red-400'
                                                    }`}>
                                                    {reservation.status}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                                            {/* User Info */}
                                            <div className="space-y-2">
                                                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                    User Information
                                                </h3>
                                                <div className="flex items-center">
                                                    <User className="h-4 w-4 text-gray-400 mr-2" />
                                                    <span className="text-gray-700 dark:text-gray-300">
                                                        {user.name}
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                                                    <span className="text-gray-700 dark:text-gray-300">
                                                        {user.email}
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                                                    <span className="text-gray-700 dark:text-gray-300">
                                                        {reservation.phone}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Reservation Info */}
                                            <div className="space-y-2">
                                                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                    Reservation Details
                                                </h3>
                                                <div className="flex items-center">
                                                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                                                    <span className="text-gray-700 dark:text-gray-300">
                                                        {new Date(reservation.start_date).toLocaleDateString()} - {new Date(reservation.end_date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                                                    <span className="text-gray-700 dark:text-gray-300">
                                                        {reservation.duration} days
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <AlertCircle className="h-4 w-4 text-gray-400 mr-2" />
                                                    <span className="text-gray-700 dark:text-gray-300 capitalize">
                                                        {reservation.validation}
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                                                    <span className="text-gray-700 dark:text-gray-300">
                                                        <span className='text-red-600 dark:text-red-400 font-bold' >Agence Phone :</span> 0661775562
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Pricing */}
                                            <div className="space-y-2">
                                                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                    Pricing
                                                </h3>
                                                <div className="flex items-center">
                                                    <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                                                    <span className="text-gray-700 dark:text-gray-300">
                                                        {reservation.car?.daily_price} MAD/day
                                                    </span>
                                                </div>
                                                <div className="flex items-baseline">
                                                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                                        <CountUp
                                                            end={reservation.total_price}
                                                            duration={0.5}
                                                        />
                                                        <span className='ml-2' >MAD</span>
                                                    </span>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                                                        total
                                                    </span>
                                                </div>
                                                <div className="flex items-baseline">
                                                    <span className="text-md font-medium text-green-600 dark:text-green-400">
                                                        <CountUp
                                                            end={reservation.price_paid}
                                                            duration={0.5}
                                                        />
                                                        <span className='ml-2' >MAD</span>
                                                    </span>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                                                        paid
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Car Info */}
                                        {reservation.car && (
                                            <div className="mt-6 pt-6 border-t-3 border-white dark:border-gray-700">
                                                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                                                    Car Specifications
                                                </h3>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    <div>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">Year</p>
                                                        <p className="font-medium">{reservation.car.year}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">Transmission</p>
                                                        <p className="font-medium capitalize">{reservation.car.transmission}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">Fuel Type</p>
                                                        <p className="font-medium capitalize">{reservation.car.fuel_type}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">Seats</p>
                                                        <p className="font-medium">{reservation.car.seats}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="mt-6 flex justify-end">
                                            {reservation.status.toLowerCase() === 'pending' && (
                                                <button
                                                    onClick={() => handleDelete(reservation.id)}
                                                    disabled={deletingId === reservation.id}
                                                    className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition duration-300"
                                                >
                                                    {deletingId === reservation.id ? (
                                                        <>
                                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                            Cancelling...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            Cancel Reservation
                                                        </>
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                                        {showScrollToTop && (
                                                            <motion.button
                                                                initial={{ opacity: 0, scale: 0.5 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                exit={{ opacity: 0, scale: 0.5 }}
                                                                transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                                                                onClick={scrollToTop}
                                                                className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group"
                                                                aria-label="Scroll to top"
                                                            >
                                                                <motion.div
                                                                    whileHover={{ scale: 1.1 }}
                                                                    whileTap={{ scale: 0.9 }}
                                                                    className="relative"
                                                                >
                                                                    <ArrowUp className="h-6 w-6 text-white" />
                                    
                                                                    {/* Pulsing circle effect */}
                                                                    <motion.div
                                                                        className="absolute inset-0 border-2 border-white/30 rounded-full"
                                                                        initial={{ scale: 1, opacity: 0 }}
                                                                        animate={{
                                                                            scale: 1.5,
                                                                            opacity: [0, 0.5, 0],
                                                                            transition: {
                                                                                repeat: Infinity,
                                                                                duration: 2
                                                                            }
                                                                        }}
                                                                    />
                                    
                                                                    {/* Glow effect */}
                                                                    <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                                </motion.div>
                                                            </motion.button>
                                                        )}
                                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </UserLayout>
    );
}