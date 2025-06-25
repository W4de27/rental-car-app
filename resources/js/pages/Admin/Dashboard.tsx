import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { Star, ArrowRight, Edit2, Trash2, Loader2, ArrowUp, Search } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

export default function Dashboard({ cars: initialCars }) {
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [viewingId, setViewingId] = useState<number | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSlug, setSelectedSlug] = useState('');
    const [cars, setCars] = useState(initialCars);

    // Filter cars based on search term and selected slug
    useEffect(() => {
        let filtered = [...initialCars];

        if (searchTerm) {
            filtered = filtered.filter(car =>
                car.model.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedSlug) {
            filtered = filtered.filter(car =>
                car.slug === selectedSlug
            );
        }

        setCars(filtered);
    }, [searchTerm, selectedSlug, initialCars]);

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

    // Clean up toasts when component unmounts or on page load
    useEffect(() => {
        return () => {
            toast.dismiss('create');
            toast.dismiss('view');
            toast.dismiss('edit');
        };
    }, []);

    // Animation variants
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

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this car?')) {
            setDeletingId(id);
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
                    setDeletingId(null);
                    toast.dismiss('delete');
                }
            });
        }
    };

    const handleView = (id: number) => {
        setViewingId(id);
        toast.loading('Loading car details...', {
            id: 'view',
            position: 'top-right'
        });
    };

    const handleEdit = (id: number) => {
        setEditingId(id);
        toast.loading('Opening editor...', {
            id: 'edit',
            position: 'top-right'
        });
    };

    return (
        <AdminLayout>
            <Toaster />
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-between items-center mb-8"
                >
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Car Fleet Management
                    </h1>
                    <Link
                        href="/admin/create"
                        className="inline-flex items-center px-4 py-2 bg-black hover:bg-black/50 text-white dark:bg-white dark:text-black hover:dark:bg-white/50 rounded-lg transition-all duration-300 shadow hover:shadow-md"
                        onStart={() => toast.loading('Opening creation form...', {
                            id: 'create',
                            position: 'top-right'
                        })}
                        onComplete={() => toast.dismiss('create')}
                    >
                        Add New Car
                    </Link>
                </motion.div>

                {/* Search and Slug Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
                    {/* Search Input - 50% width */}
                    <div className="relative w-full md:w-1/2">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by model..."
                            className="block w-full pl-10 pr-3 py-2 border-2 border-gray-400 rounded-md shadow-sm outline-none hover:border-black focus:border-black dark:bg-gray-900 dark:text-white dark:border-gray-700 hover:dark:border-white/50 focus:dark:border-white/50"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Slug Select Dropdown - 50% width */}
                    <div className="w-full md:w-1/2">
                        <select
                            className="w-full px-3 py-2 border-2 border-gray-400 rounded-md shadow-sm outline-none hover:border-black focus:border-black dark:bg-gray-900 dark:text-white dark:border-gray-700 hover:dark:border-white/50 focus:dark:border-white/50"
                            value={selectedSlug}
                            onChange={(e) => setSelectedSlug(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            <option value="City">City</option>
                            <option value="Off-Road">Off-Road</option>
                            <option value="Luxury">Luxury</option>
                            <option value="Family">Family</option>
                            <option value="Economic">Economic</option>
                            <option value="Prestige">Prestige</option>
                        </select>
                    </div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {cars.map((car) => (
                        <motion.div
                            key={car.id}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className="bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg shadow-black border-4 border-gray-400 hover:border-black hover:shadow-black dark:border-gray-700 hover:dark:shadow-white/30 hover:dark:border-white/30 transition-all duration-300 flex flex-col h-full"
                        >
                            {/* Image with overlay */}
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

                            {/* Card content */}
                            <div className="p-5 flex-grow flex flex-col">
                                {/* Rating */}
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

                                {/* Price */}
                                <div className="mt-auto">
                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Daily Rate</p>
                                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                                                {car.daily_price} MAD
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex space-x-1">
                                        <Link
                                            href={`/admin/show/${car.id}`}
                                            className="flex-1 min-w-[80px] inline-flex items-center justify-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-all duration-300"
                                            onStart={() => handleView(car.id)}
                                            onComplete={() => {
                                                toast.dismiss('view');
                                                setViewingId(null);
                                            }}
                                        >
                                            {viewingId === car.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <>
                                                    <ArrowRight className="h-4 w-4 mr-1" />
                                                    View
                                                </>
                                            )}
                                        </Link>
                                        <Link
                                            href={`/admin/${car.id}/edit`}
                                            className="flex-1 min-w-[80px] inline-flex items-center justify-center px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded-lg transition-all duration-300"
                                            onStart={() => handleEdit(car.id)}
                                            onComplete={() => {
                                                toast.dismiss('edit');
                                                setEditingId(null);
                                            }}
                                        >
                                            {editingId === car.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <>
                                                    <Edit2 className="h-4 w-4 mr-1" />
                                                    Edit
                                                </>
                                            )}
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(car.id)}
                                            className="flex-1 min-w-[80px] inline-flex items-center justify-center cursor-pointer px-2 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-all duration-300"
                                            disabled={deletingId === car.id}
                                        >
                                            {deletingId === car.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <>
                                                    <Trash2 className="h-4 w-4 mr-1" />
                                                    Delete
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
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
        </AdminLayout>
    );
}