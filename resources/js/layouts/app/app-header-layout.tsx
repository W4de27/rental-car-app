import { AppHeader } from '@/components/app-header';
import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AppHeaderLayout({ children, breadcrumbs, links }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[], links: { name: string, href: string }[] }>) {
    return (
        <AppShell>
            <AppHeader breadcrumbs={breadcrumbs} links={links} />
            <AppContent>{children}</AppContent>
        </AppShell>
    );
}
