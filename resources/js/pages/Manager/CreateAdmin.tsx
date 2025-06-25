import React, { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import ManagerLayout from '@/layouts/ManagerLayout';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Trash2, UserPlus, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

export default function CreateAdmin() {
  const { admins, errors } = usePage().props;
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    showPassword: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [showPasswords, setShowPasswords] = useState(false);

  // Clean up toasts when component unmounts
  useEffect(() => {
    return () => {
      toast.dismiss('create');
      toast.dismiss('delete');
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleAllPasswords = () => {
    setShowPasswords(!showPasswords);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    toast.loading('Creating admin...', {
      id: 'create',
      position: 'top-right'
    });

    router.post('/manager', {
      name: form.name,
      email: form.email,
      password: form.password
    }, {
      onSuccess: () => {
        setForm({ name: '', email: '', password: '', showPassword: false });
        toast.success('Admin created successfully!', {
          position: 'top-right',
          icon: <CheckCircle className="text-green-500" />,
        });
      },
      onError: () => {
        toast.error('Failed to create admin', {
          position: 'top-right',
          icon: <XCircle className="text-red-500" />,
        });
      },
      onFinish: () => {
        setIsSubmitting(false);
        toast.dismiss('create');
      }
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this admin?')) {
      setIsDeleting(id);
      toast.loading('Deleting admin...', {
        id: 'delete',
        position: 'top-right'
      });

      router.delete(`/manager/${id}`, {
        onSuccess: () => {
          toast.success('Admin deleted successfully!', {
            position: 'top-right',
            icon: <CheckCircle className="text-green-500" />,
          });
        },
        onError: () => {
          toast.error('Failed to delete admin', {
            position: 'top-right',
            icon: <XCircle className="text-red-500" />,
          });
        },
        onFinish: () => {
          setIsDeleting(null);
          toast.dismiss('delete');
        }
      });
    }
  };

  return (
    <ManagerLayout>
      <Toaster />
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Create Admin Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg border-4 shadow-gray-500 hover:shadow-black hover:border-black border-gray-400 dark:border-gray-700 p-6 mb-8 hover:dark:border-white/50 hover:dark:shadow-white/20 dark:shadow-gray-900"
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create Admin Account</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-400 dark:border-gray-600 rounded-lg focus:border-black dark:bg-gray-700 dark:text-white outline-none focus:dark:border-white/50"
                disabled={isSubmitting}
                placeholder="Enter full name (e.g. Wade MsI)"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-400 dark:border-gray-600 rounded-lg focus:border-black dark:bg-gray-700 dark:text-white outline-none focus:dark:border-white/50"
                disabled={isSubmitting}
                placeholder="Enter work email (e.g. admin@company.com)"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={form.showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-gray-400 dark:border-gray-600 rounded-lg focus:border-black dark:bg-gray-700 dark:text-white outline-none focus:dark:border-white/50"
                  disabled={isSubmitting}
                  placeholder="Create strong password (min 8 characters)"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setForm({ ...form, showPassword: !form.showPassword })}
                >
                  {form.showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition duration-300 disabled:opacity-75"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-5 w-5 mr-2" />
                    Create Admin
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Admins Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-100 dark:bg-gray-800 rounded-xl border-gray-400 shadow-lg border-4 shadow-gray-500 hover:shadow-black hover:border-black dark:border-gray-700 overflow-hidden hover:dark:border-white/50 hover:dark:shadow-white/20 dark:shadow-gray-900"
        >
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Admin Accounts</h2>
            <button
              onClick={toggleAllPasswords}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center transition-colors"
            >
              {showPasswords ? (
                <>
                  <EyeOff className="h-4 w-4 mr-1" />
                  Hide Passwords
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-1" />
                  Show Passwords
                </>
              )}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Password
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Created At
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {admins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {admin.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-400">
                      {admin.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium font-mono text-gray-900 dark:text-gray-400">
                      {showPasswords ? admin.copy_pass : '••••••••'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-400">
                      {new Date(admin.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDelete(admin.id)}
                        disabled={isDeleting === admin.id}
                        className="text-red-600 hover:text-red-900 dark:hover:text-red-400 inline-flex items-center disabled:opacity-75"
                      >
                        {isDeleting === admin.id ? (
                          <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4 mr-1" />
                        )}
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </ManagerLayout>
  );
}