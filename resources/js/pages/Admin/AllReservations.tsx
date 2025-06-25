import React, { useEffect, useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { router, Link } from '@inertiajs/react';
import { Toaster, toast } from 'react-hot-toast';
import {
    Trash2, Loader2, Calendar, Phone, Clock, DollarSign, CheckCircle,
    XCircle, AlertCircle, User, Mail, Zap, BadgeCheck, Edit, ArrowUp,
    Search,
    Filter
} from 'lucide-react';
import CountUp from 'react-countup';

export default function HistoryReservation({ reservations }) {
    const [deletingId, setDeletingId] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
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

            router.delete(route('reservation.destroy', id), {
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

    const handleEdit = (id) => {
        setEditingId(id);
        toast.loading('Loading reservation editor...', {
            id: 'edit',
            position: 'top-right'
        });
    };

    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
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
                return null;
        }
    };

    const getStatusTextColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'text-yellow-600 dark:text-yellow-400';
            case 'confirmed':
                return 'text-blue-600 dark:text-blue-400';
            case 'active':
                return 'text-green-600 dark:text-green-400';
            case 'completed':
                return 'text-purple-600 dark:text-purple-400';
            case 'cancelled':
                return 'text-red-600 dark:text-red-400';
            default:
                return '';
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

    const filteredReservations = reservations.filter((reservation) => {
        const matchesCode = reservation.reservation_code
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === 'all' ||
            reservation.status.toLowerCase() === statusFilter.toLowerCase();

        return matchesCode && matchesStatus;
    });

    return (
        <AdminLayout>
            <Toaster />
            <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
                >
                    All Reservations
                </motion.h1>

                <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by Reservation Code..."
                            className="w-full pl-10 px-4 py-2 border-2 border-gray-400 rounded-md shadow-sm outline-none hover:border-black focus:border-black dark:bg-gray-900 dark:text-white dark:border-gray-700 hover:dark:border-white/50 focus:dark:border-white/50"
                        />
                    </div>

                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Filter className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full pl-10 px-4 py-2 border-2 border-gray-400 rounded-md shadow-sm outline-none hover:border-black focus:border-black dark:bg-gray-900 dark:text-white dark:border-gray-700 hover:dark:border-white/50 focus:dark:border-white/50"
                        >
                            <option value="all">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    {/* Active Reservations Counter with Animation */}
                    <motion.div
                        className="flex-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <div className="flex items-center justify-end">
                            <div className="relative">
                                {/* Pulse animation background */}
                                <div className="absolute inset-0 bg-green-100 dark:bg-green-900/30 rounded-full opacity-70 animate-pulse"></div>

                                {/* Active reservations counter */}
                                <div className="relative flex items-center space-x-2 bg-green-100/50 dark:bg-gray-800 px-4 py-2 rounded-full border-2 border-green-300 dark:border-green-800 shadow-sm">
                                    <div className="relative">
                                        <Zap className="h-5 w-5 text-green-500 animate-bounce" />
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Active Now:
                                    </span>
                                    <CountUp
                                        end={reservations.filter(r => r.status.toLowerCase() === 'active').length}
                                        duration={1.5}
                                        className="text-lg font-bold text-green-600 dark:text-green-400"
                                    />
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {reservations.filter(r => r.status.toLowerCase() === 'active').length === 1 ? 'reservation' : 'reservations'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {filteredReservations.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl text-center"
                    >
                        <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            No reservations found matching your criteria.
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-6"
                    >
                        {filteredReservations.map((reservation) => (
                            <motion.div
                                key={reservation.id}
                                variants={itemVariants}
                                className="bg-gray-200 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-4 border-gray-300 shadow-gray-800 hover:shadow-black hover:border-black dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 hover:dark:border-white/50 hover:dark:shadow-white/20"
                            >
                                <div className="md:flex">
                                    <div className="md:w-1/3 lg:w-1/4 relative">
                                        <img
                                            src={`/storage/${reservation.car?.image}`}
                                            alt={reservation.car?.model}
                                            className="w-full h-64 md:h-full object-cover"
                                        />
                                        <div className="absolute top-4 right-4 bg-white dark:bg-gray-900 px-3 py-1 rounded-full shadow-md">
                                            <span className="text-xs font-semibold text-gray-900 dark:text-white">
                                                #{reservation.reservation_code}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 md:w-2/3 lg:w-3/4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                                    {reservation.car?.model || 'Unknown Car'}
                                                </h2>
                                                <p className="text-gray-500 dark:text-gray-400 mb-4">
                                                    {reservation.car?.year} • {reservation.car?.fuel_type}
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                {getStatusIcon(reservation.status)}
                                                <span className={`ml-2 text-sm font-medium ${getStatusTextColor(reservation.status)}`}>
                                                    {reservation.status}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                                            <div className="space-y-2">
                                                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">User Info</h3>
                                                <div className="flex items-center">
                                                    <User className="h-4 w-4 text-gray-400 mr-2" />
                                                    <span>{reservation.user?.name}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                                                    <span>{reservation.user?.email}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                                                    <span>{reservation.phone}</span>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Reservation Details</h3>
                                                <div className="flex items-center">
                                                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                                                    <span>
                                                        {new Date(reservation.start_date).toLocaleDateString()} - {new Date(reservation.end_date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                                                    <span>{reservation.duration} days</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <AlertCircle className="h-4 w-4 text-gray-400 mr-2" />
                                                    <span className="capitalize">{reservation.validation}</span>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pricing</h3>
                                                <div className="flex items-center">
                                                    <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                                                    <span>{reservation.car?.daily_price} MAD/day</span>
                                                </div>
                                                <div className="flex items-center font-bold text-blue-600 dark:text-blue-400 text-lg">
                                                    Total: {reservation.total_price} MAD
                                                </div>
                                                <div className="flex items-center text-green-600 dark:text-green-400">
                                                    Paid: {reservation.price_paid} MAD
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex flex-wrap gap-3">
                                            <Link
                                                href={route('reservation.edit', reservation.id)}
                                                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition"
                                                onStart={() => handleEdit(reservation.id)}
                                                onFinish={() => {
                                                    setEditingId(null);
                                                    toast.dismiss('edit');
                                                }}
                                            >
                                                {editingId === reservation.id ? (
                                                    <>
                                                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                                                        Loading...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Edit className="h-4 w-4 mr-2" />
                                                        Edit Reservation
                                                    </>
                                                )}
                                            </Link>

                                            {reservation.status === "Completed" ? null : <button
                                                onClick={() => handleDelete(reservation.id)}
                                                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition"
                                                disabled={deletingId === reservation.id}
                                            >
                                                {deletingId === reservation.id ? (
                                                    <>
                                                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                                                        Cancelling...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                        Cancel Reservation
                                                    </>
                                                )}
                                            </button>}


                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

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
        </AdminLayout>
    );
}