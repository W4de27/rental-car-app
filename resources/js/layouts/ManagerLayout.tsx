import AppHeaderLayout from '@/layouts/app/app-header-layout';

export default function ManagerLayout({ children }) {
    const links = [
        { title: 'Dashboard', href: '/manager' },
        { title: 'Reservations', href: '/reservations' },
        { title: 'Create Account Admin', href: '/manager/create' },
    ];


    return <AppHeaderLayout links={links}>{children}</AppHeaderLayout>;
}
