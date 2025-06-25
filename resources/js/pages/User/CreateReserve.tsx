import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Car, Calendar, Phone, Users, DollarSign, ArrowLeft, Loader2, AlertCircle, Star } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

export default function ReserveCar({ car }) {
    const { data, setData, post, processing, errors } = useForm({
        car_id: car.id,
        phone: '',
        start_date: '',
        end_date: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isReturning, setIsReturning] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        toast.loading('Processing your reservation...', {
            id: 'reservation',
            position: 'top-right'
        });

        post(route('user.store'), {
            onSuccess: () => {
                toast.success('Reservation confirmed successfully!', {
                    id: 'reservation',
                    position: 'top-right',
                    icon: '🚗',
                });
            },
            onError: () => {
                toast.error('Failed to process reservation', {
                    id: 'reservation',
                    position: 'top-right',
                    icon: '❌',
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

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Toaster />
            <div className="flex items-center mb-4">
                <Link
                    href="/user"
                    className="text-blue-600 hover:text-blue-800 flex items-center"
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
                            <Loader2 className="h-5 w-5 mr-1 animate-spin" />
                            Returning...
                        </>
                    ) : (
                        <>
                            <ArrowLeft className="h-5 w-5 mr-1" />
                            Back to Cars
                        </>
                    )}
                </Link>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 hover:dark:shadow-white/30 hover:dark:border-white/30 dark:shadow-sm hover:dark:shadow-lg rounded-xl border-4 shadow-lg overflow-hidden shadow-gray-500 hover:shadow-black hover:border-black dark:border-gray-600 border-gray-200"
            >
                {/* Car Information Section */}
                <div className="p-6 md:p-8">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{car.model}</h1>
                        <p className="text-gray-600 dark:text-gray-400">{car.year} • {car.transmission} • {car.fuel_type}</p>
                    </div>

                    <div className="mb-6 rounded-lg overflow-hidden">
                        <img
                            src={`/storage/${car.image}`}
                            alt={car.model}
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg">
                            <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                                <Users className="h-4 w-4 mr-2" />
                                <span className="text-sm">Seats</span>
                            </div>
                            <div className="text-lg font-medium">{car.seats}</div>
                        </div>

                        <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg">
                            <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                                <DollarSign className="h-4 w-4 mr-2" />
                                <span className="text-sm">Daily Price</span>
                            </div>
                            <div className="text-lg font-medium">{car.daily_price} MAD</div>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="flex text-yellow-400 mr-2">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-5 w-5 ${i < car.stars ? 'fill-current' : 'text-gray-300 dark:text-gray-500'}`}
                                />
                            ))}
                        </div>
                        <span className="text-gray-600 dark:text-gray-400">
                            ({car.reviews} reviews)
                        </span>
                    </div>
                </div>

                {/* Reservation Form Section */}
                <div className="p-6 md:p-8 bg-gray-50 dark:bg-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Reservation Details</h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                                    className="pl-10 w-full rounded-lg border-2 border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-blue-500 py-3 px-4 dark:outline-none dark:focus:border-white/50"
                                    placeholder="+212 XXX-XXXXXX"
                                />
                            </div>
                            {errors.phone && (
                                <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                                        className="pl-10 w-full rounded-lg border-2 border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-blue-500 py-3 px-4 dark:outline-none dark:focus:border-white/50"
                                    />
                                </div>
                                {errors.start_date && (
                                    <p className="mt-2 text-sm text-red-600">{errors.start_date}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                                        className="pl-10 w-full rounded-lg border-2 border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-blue-500 py-3 px-4 dark:outline-none dark:focus:border-white/50"
                                    />
                                </div>
                                {errors.end_date && (
                                    <p className="mt-2 text-sm text-red-600">{errors.end_date}</p>
                                )}
                            </div>
                        </div>

                        <div className="pt-5">
                            <button
                                type="submit"
                                disabled={processing || isSubmitting}
                                className="w-full flex justify-center items-center px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition duration-300 disabled:opacity-70"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    'Confirm Reservation'
                                )}
                            </button>
                        </div>

                        {/* Automatic removal notice */}
                        <div className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-800 rounded-lg">
                            <div className="flex">
                                <AlertCircle className="h-5 w-5 text-yellow-500 dark:text-yellow-400 mr-2 mt-0.5" />
                                <div>
                                    <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Important Notice</h3>
                                    <div className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                                        <p>
                                            Please note that unconfirmed reservations will be automatically removed after 3 days.
                                            To secure your booking, please complete the payment process promptly after submitting this form.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}