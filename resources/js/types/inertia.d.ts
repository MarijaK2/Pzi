import { User } from '@/types';
import { PageProps } from '@inertiajs/core';

interface Contact {
    id: number;
    name: string;
}

interface SharedMessage {
    id: number;
    phone: string;
    message: string;
    created_at: string;
    contact?: {
        name: string;
    };
}

declare module '@inertiajs/core' {
    export interface PageProps extends InertiaPageProps {
        phone?: string;
        recentMessages?: Array<{
            id: number;
            phone: string;
            message: string;
            created_at: string;
            contact?: { name: string };
        }>;
        auth: {
            user: {
                id: number;
                name: string;
                email: string;
            };
        };
        flash: {
            message?: string;
        };
    }
}