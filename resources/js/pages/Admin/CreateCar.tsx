import { useState } from 'react';
import { router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

export default function CreateCar() {
    const [form, setForm] = useState({
        model: '',
        year: '',
        transmission: '',
        fuel_type: '',
        daily_price: '',
        slug: '',
        seats: '',
        image: null as File | null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCanceling, setIsCanceling] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (name === 'image' && files) {
            setForm({ ...form, [name]: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSelect = (name: string, value: string) => {
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        toast.loading('Creating new car...', {
            id: 'create',
            position: 'top-right'
        });

        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (value instanceof File) {
                formData.append(key, value);
            } else if (value !== null && value !== undefined) {
                formData.append(key, value.toString());
            }
        });

        router.post(route('admin.store'), formData, {
            onSuccess: () => {
                toast.success('Car created successfully!', {
                    position: 'top-right',
                    icon: '🚗',
                });
            },
            onError: () => {
                toast.error('Failed to create car', {
                    position: 'top-right',
                    icon: '❌',
                });
            },
            onFinish: () => {
                setIsSubmitting(false);
                toast.dismiss('create');
            }
        });
    };

    const handleCancel = () => {
        setIsCanceling(true);
        toast.loading('Returning to dashboard...', {
            id: 'cancel',
            position: 'top-right'
        });

        router.visit('/admin', {
            onFinish: () => {
                setIsCanceling(false);
                toast.dismiss('cancel');
            }
        });
    };

    return (
        <AdminLayout>
            <Toaster />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full p-6 bg-gray-100 border-4 border-gray-400 dark:shadow-gray-900 dark:border-gray-600 dark:bg-gray-900 shadow-xl shadow-gray-500 hover:shadow-black hover:border-black rounded-xl mt-10 hover:dark:border-white/50 hover:dark:shadow-white/10"
            >
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
                    Add a New Car to Your Fleet
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Row 1: Model & Year */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <div className="relative">
                            <input
                                type="text"
                                name="model"
                                placeholder="Model"
                                value={form.model}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-400 dark:border-gray-700 rounded-lg outline-none focus:border-black dark:bg-gray-800 dark:text-white focus:dark:border-white/50"
                            />
                            <label
                                className="absolute top-0 left-4 -translate-y-1/2 bg-gray-100 dark:bg-gray-900 px-2 text-xs text-gray-500 dark:text-gray-400"
                            >
                                Car Model
                            </label>
                        </div>

                        <div className="relative">
                            <input
                                type="number"
                                name="year"
                                placeholder="Year"
                                value={form.year}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-400 dark:border-gray-700 rounded-lg outline-none focus:border-black dark:bg-gray-800 dark:text-white focus:dark:border-white/50"
                            />
                            <label
                                className="absolute top-0 left-4 -translate-y-1/2 bg-gray-100 dark:bg-gray-900 px-2 text-xs text-gray-500 dark:text-gray-400"
                            >
                                Year
                            </label>
                        </div>
                    </div>

                    {/* Row 2: Transmission & Fuel Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <div className="relative">
                            <select
                                name="transmission"
                                value={form.transmission}
                                onChange={(e) => handleSelect('transmission', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-400 dark:border-gray-700 rounded-lg outline-none focus:border-black dark:bg-gray-800 dark:text-white focus:dark:border-white/50"
                            >
                                <option value="" disabled>Select Transmission</option>
                                <option value="Manual">Manual</option>
                                <option value="Automatic">Automatic</option>
                            </select>
                            <label
                                className="absolute top-0 left-4 -translate-y-1/2 bg-gray-100 dark:bg-gray-900 px-2 text-xs text-gray-500 dark:text-gray-400"
                            >
                                Transmission
                            </label>
                        </div>

                        <div className="relative">
                            <select
                                name="fuel_type"
                                value={form.fuel_type}
                                onChange={(e) => handleSelect('fuel_type', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-400 dark:border-gray-700 rounded-lg outline-none focus:border-black dark:bg-gray-800 dark:text-white focus:dark:border-white/50"
                            >
                                <option value="" disabled>Select Fuel Type</option>
                                <option value="Essence">Essence</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Hybride">Hybrid</option>
                            </select>
                            <label
                                className="absolute top-0 left-4 -translate-y-1/2 bg-gray-100 dark:bg-gray-900 px-2 text-xs text-gray-500 dark:text-gray-400"
                            >
                                Fuel Type
                            </label>
                        </div>
                    </div>

                    {/* Row 3: Daily Price & Seats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <div className="relative">
                            <input
                                type="number"
                                name="daily_price"
                                placeholder="Daily Price"
                                value={form.daily_price}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-400 dark:border-gray-700 rounded-lg outline-none focus:border-black dark:bg-gray-800 dark:text-white focus:dark:border-white/50"
                            />
                            <label
                                className="absolute top-0 left-4 -translate-y-1/2 bg-gray-100 dark:bg-gray-900 px-2 text-xs text-gray-500 dark:text-gray-400"
                            >
                                Daily Price ($)
                            </label>
                        </div>

                        <div className="relative">
                            <input
                                type="number"
                                name="seats"
                                placeholder="Seats"
                                value={form.seats}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-400 dark:border-gray-700 rounded-lg outline-none focus:border-black dark:bg-gray-800 dark:text-white focus:dark:border-white/50"
                            />
                            <label
                                className="absolute top-0 left-4 -translate-y-1/2 bg-gray-100 dark:bg-gray-900 px-2 text-xs text-gray-500 dark:text-gray-400"
                            >
                                Seats
                            </label>
                        </div>
                    </div>

                    {/* Row 4: Category & Upload Car Image */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <div className="relative">
                            <select
                                name="slug"
                                value={form.slug}
                                onChange={(e) => handleSelect('slug', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-400 dark:border-gray-700 rounded-lg outline-none focus:border-black dark:bg-gray-800 dark:text-white focus:dark:border-white/50"
                            >
                                <option value="" disabled>Select Category</option>
                                <option value="City">City</option>
                                <option value="Off-Road">Off-Road</option>
                                <option value="Luxury">Luxury</option>
                                <option value="Family">Family</option>
                                <option value="Economic">Economic</option>
                                <option value="Prestige">Prestige</option>
                            </select>
                            <label
                                className="absolute top-0 left-4 -translate-y-1/2 bg-gray-100 dark:bg-gray-900 px-2 text-xs text-gray-500 dark:text-gray-400"
                            >
                                Category
                            </label>
                        </div>

                        <div className="relative">
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-400 dark:border-gray-700 rounded-lg outline-none focus:border-black dark:bg-gray-800 dark:text-white focus:dark:border-white/50"
                            />
                            <label
                                className="absolute top-0 left-4 -translate-y-1/2 bg-gray-100 dark:bg-gray-900 px-2 text-xs text-gray-500 dark:text-gray-400"
                            >
                                Upload Car Image
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-8 py-3 text-white bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-md rounded-full font-semibold flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                'Add Car'
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={isCanceling}
                            className="px-8 py-3 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 shadow-md rounded-full font-semibold flex items-center justify-center gap-2"
                        >
                            {isCanceling ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Canceling...
                                </>
                            ) : (
                                'Cancel'
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </AdminLayout>
    );
}