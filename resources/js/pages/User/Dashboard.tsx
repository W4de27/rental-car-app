import React, { useState, useEffect, useMemo } from 'react';
import UserLayout from '@/layouts/UserLayout';
import { Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { Star, ArrowRight, CalendarCheck, Loader2, ArrowUp } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

export default function Dashboard({ cars }) {
    const [viewingId, setViewingId] = useState<number | null>(null);
    const [reservingId, setReservingId] = useState<number | null>(null);

    const [modelFilter, setModelFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const [slugFilter, setSlugFilter] = useState('');
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

    useEffect(() => {
        return () => {
            toast.dismiss('view');
            toast.dismiss('reserve');
        };
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    };

    const handleView = (id: number) => {
        setViewingId(id);
        toast.loading('Loading car details...', {
            id: 'view',
            position: 'top-right',
            duration: Infinity
        });
    };

    const handleReserve = (id: number) => {
        setReservingId(id);
        toast.loading('Preparing reservation...', {
            id: 'reserve',
            position: 'top-right',
            duration: Infinity
        });
    };

    const filteredCars = useMemo(() => {
        return cars.filter(car => {
            const matchesModel = modelFilter
                ? car.model.toLowerCase().includes(modelFilter.toLowerCase())
                : true;

            const matchesPrice = priceFilter
                ? parseFloat(car.daily_price) <= parseFloat(priceFilter)
                : true;

            const matchesSlug = slugFilter ? car.slug === slugFilter : true;

            return matchesModel && matchesPrice && matchesSlug;
        });
    }, [cars, modelFilter, priceFilter, slugFilter]);

    return (
        <UserLayout>
            <Toaster />
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-4 mb-8"
                >
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Available Cars
                    </h1>

                    {/* Filter Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input
                            type="text"
                            placeholder="Search by model"
                            value={modelFilter}
                            onChange={(e) => setModelFilter(e.target.value)}
                            className="px-4 py-2 rounded-lg border-2 border-gray-400 rounded-md shadow-sm outline-none hover:border-black focus:border-black dark:bg-gray-900 dark:text-white dark:border-gray-700 hover:dark:border-white/50 focus:dark:border-white/50"
                        />
                        <input
                            type="number"
                            placeholder="Max price"
                            value={priceFilter}
                            onChange={(e) => setPriceFilter(e.target.value)}
                            className="px-4 py-2 rounded-lg border-2 border-gray-400 rounded-md shadow-sm outline-none hover:border-black focus:border-black dark:bg-gray-900 dark:text-white dark:border-gray-700 hover:dark:border-white/50 focus:dark:border-white/50"
                        />
                        <select
                            value={slugFilter}
                            onChange={(e) => setSlugFilter(e.target.value)}
                            className="px-4 py-2 rounded-lg border-2 border-gray-400 rounded-md shadow-sm outline-none hover:border-black focus:border-black dark:bg-gray-900 dark:text-white dark:border-gray-700 hover:dark:border-white/50 focus:dark:border-white/50"
                        >
                            <option value="">All</option>
                            <option value="City">City</option>
                            <option value="Off-Road">Off-Road</option>
                            <option value="Luxury">Luxury</option>
                            <option value="Family">Family</option>
                            <option value="Economic">Economic</option>
                            <option value="Prestige">Prestige</option>
                        </select>
                        <button
                            onClick={() => toast.success('Filters applied!')}
                            className="px-4 py-2 bg-black hover:bg-black/70 cursor-pointer text-white rounded-lg transition-all duration-300 dark:bg-white dark:text-black dark:hover:bg-white/50"
                        >
                            Search
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {filteredCars.length > 0 ? (
                        filteredCars.map((car) => (
                            <motion.div
                                key={car.id}
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                                className="bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg shadow-black border-4 border-gray-400 hover:border-black hover:shadow-black dark:border-gray-700 hover:dark:shadow-white/30 hover:dark:border-white/30 transition-all duration-300 flex flex-col h-full"
                            >
                                <div className="relative h-48 overflow-hidden group">
                                    <img
                                        src={`/storage/${car.image}`}
                                        alt={car.model}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end">
                                        <h3 className="text-xl font-semibold text-white">{car.model}</h3>
                                        <p className="text-gray-300 text-sm">{car.year} • {car.fuel_type}</p>
                                        <span className="absolute top-2 right-2 bg-white/90 dark:bg-gray-900/90 text-xs font-semibold px-2 py-1 rounded-full">
                                            {car.slug}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 flex-grow flex flex-col">
                                    <div className="flex items-center mb-3">
                                        <div className="flex text-yellow-400 mr-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-5 w-5 ${i < car.stars ? 'fill-current' : 'text-gray-300 dark:text-gray-500'}`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            (<CountUp end={car.reviews} duration={2} /> reviews)
                                        </span>
                                    </div>

                                    <div className="mt-auto">
                                        <div className="flex justify-between items-center mb-4">
                                            <div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Daily Rate</p>
                                                <p className="text-lg font-bold text-gray-900 dark:text-white">
                                                    {car.daily_price} MAD
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex space-x-2">
                                            <Link
                                                href={`/user/show/${car.id}`}
                                                className="flex-1 min-w-[80px] inline-flex items-center justify-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-all duration-300"
                                                onStart={() => handleView(car.id)}
                                                onComplete={() => {
                                                    toast.dismiss('view');
                                                    setViewingId(null);
                                                }}
                                                preserveScroll
                                            >
                                                {viewingId === car.id ? (
                                                    <>
                                                        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                                        Viewing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <ArrowRight className="h-4 w-4 mr-1" />
                                                        Details
                                                    </>
                                                )}
                                            </Link>
                                            <Link
                                                href={`/user/create/${car.id}`}
                                                className="flex-1 min-w-[80px] inline-flex items-center justify-center px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-all duration-300"
                                                onStart={() => handleReserve(car.id)}
                                                onComplete={() => {
                                                    toast.dismiss('reserve');
                                                    setReservingId(null);
                                                }}
                                                preserveScroll
                                            >
                                                {reservingId === car.id ? (
                                                    <>
                                                        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                                        Reserving...
                                                    </>
                                                ) : (
                                                    <>
                                                        <CalendarCheck className="h-4 w-4 mr-1" />
                                                        Reserve
                                                    </>
                                                )}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400 col-span-full mt-8">
                            No cars match your filters.
                        </p>
                    )}
                </motion.div>

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
        </UserLayout>
    );
}
