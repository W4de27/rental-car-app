import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Car, Calendar, Phone, DollarSign, CheckCircle, XCircle, Zap, BadgeCheck, Clock, Users, Fuel, Loader2, User, AlertCircle } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import { useState } from 'react';
import CountUp from 'react-countup';

export default function EditReservation({ reservation, car, user }) {
    const { data, setData, put, processing, errors } = useForm({
        phone: reservation.phone || '',
        start_date: reservation.start_date || '',
        end_date: reservation.end_date || '',
        price_paid: reservation.price_paid || 0,
        status: reservation.status || '',
        validation: reservation.validation || '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isReturning, setIsReturning] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        toast.loading('Updating reservation...', {
            id: 'update',
            position: 'top-right'
        });

        put(route('reservation.update', reservation.id), {
            onSuccess: () => {
                toast.success('Reservation updated successfully!', {
                    id: 'update',
                    position: 'top-right',
                    icon: '✅'
                });
            },
            onError: () => {
                toast.error('Failed to update reservation', {
                    id: 'update',
                    position: 'top-right',
                    icon: '❌'
                });
            },
            onFinish: () => {
                setIsSubmitting(false);
            }
        });
    };

    const handleReturn = () => {
        setIsReturning(true);
        toast.loading('Returning to reservations...', {
            id: 'return',
            position: 'top-right'
        });
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'pending': return <Clock className="h-5 w-5 text-yellow-500" />;
            case 'confirmed': return <CheckCircle className="h-5 w-5 text-blue-500" />;
            case 'active': return <Zap className="h-5 w-5 text-green-500" />;
            case 'completed': return <BadgeCheck className="h-5 w-5 text-purple-500" />;
            case 'cancelled': return <XCircle className="h-5 w-5 text-red-500" />;
            default: return <AlertCircle className="h-5 w-5 text-gray-500" />;
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 fixed">
            <Toaster />

            {/* Back Button */}
            <div className="mb-4">
                <Link
                    href="/reservation"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    onStart={handleReturn}
                    onSuccess={() => {
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
                            Back to Reservations
                        </>
                    )}
                </Link>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
                {/* Left Column - Information */}
                <div className="space-y-6">
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-2xl font-bold text-gray-900 dark:text-white"
                    >
                        Edit Reservation #<span className='text-red-500 font-bold' >{reservation.reservation_code}</span>
                    </motion.h1>

                    {/* User Information */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg shadow-gray-500 border-4 border-gray-200 hover:shadow-black hover:border-black dark:border-gray-700 dark:shadow-gray-900 hover:dark:border-white/50 hover:dark:shadow-white/20"
                    >
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <User className="h-5 w-5 mr-2 text-blue-500" />
                            User Information
                        </h2>
                        <div className="space-y-3">
                            <p className="flex items-center">
                                <span className="font-medium w-24">Name:</span>
                                {user.name}
                            </p>
                            <p className="flex items-center">
                                <span className="font-medium w-24">Email:</span>
                                {user.email}
                            </p>
                        </div>
                    </motion.div>

                    {/* Car Information */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg shadow-gray-500 border-4 border-gray-200 hover:shadow-black hover:border-black dark:border-gray-700 dark:shadow-gray-900 hover:dark:border-white/50 hover:dark:shadow-white/20"
                    >
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <Car className="h-5 w-5 mr-2 text-blue-500" />
                            Car Information
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <img
                                    src={`/storage/${car.image}`}
                                    alt={car.model}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                            </div>
                            <div className="space-y-3">
                                <p className="font-bold text-lg">{car.model}</p>
                                <p className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                    {car.year}
                                </p>
                                <p className="flex items-center">
                                    <Fuel className="h-4 w-4 mr-2 text-gray-400" />
                                    {car.fuel_type}
                                </p>
                                <p className="flex items-center">
                                    <Zap className="h-4 w-4 mr-2 text-gray-400" />
                                    {car.transmission}
                                </p>
                                <p className="flex items-center">
                                    <Users className="h-4 w-4 mr-2 text-gray-400" />
                                    {car.seats} seats
                                </p>
                                <p className="flex items-center">
                                    <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                                    {car.daily_price} MAD/day
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column - Edit Form */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gray-100 dark:bg-gray-800 p-3 rounded-xl shadow-lg border-4 border-gray-200 dark:border-gray-700 shadow-gray-500 hover:shadow-black hover:border-black relative bottom-13 dark:shadow-gray-900 hover:dark:border-white/50 hover:dark:shadow-white/20"
                >
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Reservation Details
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-3 ">
                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Phone Number
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="pl-10 w-full rounded-lg border-2 border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-black py-2 px-3 focus:dark:border-white/50 outline-none"
                                />
                            </div>
                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                            )}
                        </div>

                        {/* Date Range */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Start Date
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Calendar className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) => setData('start_date', e.target.value)}
                                        className="pl-10 w-full rounded-lg border-2 border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-black py-2 px-3 focus:dark:border-white/50 outline-none"
                                    />
                                </div>
                                {errors.start_date && (
                                    <p className="mt-1 text-sm text-red-600">{errors.start_date}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    End Date
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Calendar className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="date"
                                        value={data.end_date}
                                        onChange={(e) => setData('end_date', e.target.value)}
                                        className="pl-10 w-full rounded-lg border-2 border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-black py-2 px-3 focus:dark:border-white/50 outline-none"
                                    />
                                </div>
                                {errors.end_date && (
                                    <p className="mt-1 text-sm text-red-600">{errors.end_date}</p>
                                )}
                            </div>
                        </div>

                        {/* Price Paid */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Price Paid (MAD)
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <DollarSign className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="number"
                                    value={data.price_paid}
                                    onChange={(e) => setData('price_paid', e.target.value)}
                                    className="pl-10 w-full rounded-lg border-2 border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-black py-2 px-3 focus:dark:border-white/50 outline-none"
                                />
                            </div>
                            {errors.price_paid && (
                                <p className="mt-1 text-sm text-red-600">{errors.price_paid}</p>
                            )}
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Status
                            </label>
                            <div className="flex items-center space-x-2">
                                {getStatusIcon(data.status)}
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full rounded-lg border-2 border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-black py-2 px-3 focus:dark:border-white/50 outline-none"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Active">Active</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                            {errors.status && (
                                <p className="mt-1 text-sm text-red-600">{errors.status}</p>
                            )}
                        </div>

                        {/* Validation */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Validation
                            </label>
                            <select
                                value={data.validation}
                                onChange={(e) => setData('validation', e.target.value)}
                                className="w-full rounded-lg border-2 border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-black py-2 px-3 focus:dark:border-white/50 outline-none"
                            >
                                <option value="Validate">Validate</option>
                                <option value="No Validate">No Validate</option>
                            </select>
                            {errors.validation && (
                                <p className="mt-1 text-sm text-red-600">{errors.validation}</p>
                            )}
                        </div>

                        {/* Summary */}
                        <div className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-400 dark:border-blue-900/50">
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-300">Duration:</span>
                                <span className="font-medium">{reservation.duration} days</span>
                            </div>
                            <div className="flex justify-between mt-1">
                                <span className="text-gray-600 dark:text-gray-300">Total Price:</span>
                                <span className="font-bold text-blue-600 dark:text-blue-400">
                                    <CountUp end={reservation.total_price} duration={0.5} prefix="MAD " />
                                </span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={processing || isSubmitting}
                                className="w-full flex justify-center items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition duration-300 disabled:opacity-70"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    'Update Reservation'
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
}