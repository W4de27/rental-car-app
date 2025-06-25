import AppHeaderLayout from '@/layouts/app/app-header-layout';

export default function UserLayout({ children }) {
    const links = [
        { title: 'Dashboard', href: '/user' },
        { title: 'Your Reservations', href: '/history' }
    ];

    return <AppHeaderLayout links={links}>{children}</AppHeaderLayout>;
}
