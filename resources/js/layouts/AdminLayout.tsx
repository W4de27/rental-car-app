import AppHeaderLayout from '@/layouts/app/app-header-layout';

export default function AdminLayout({ children }) {
    const links = [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Create Car', href: '/admin/create' },
        { title: 'Reservations', href: '/reservation' },
    ];

    return <AppHeaderLayout links={links}>{children}</AppHeaderLayout>;
}
