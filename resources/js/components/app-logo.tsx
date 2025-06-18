import AppLogoIcon from './app-logo-icon';
import { Head, Link } from '@inertiajs/react';
import { Phone } from 'lucide-react';

export default function AppLogo() {
    return (
        <> 
        <header className="bg-transparent shadow-none">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center">
                <Link href="/dashboard" className="flex items-center space-x-2">
                    <Phone className="h-8 w-8 text-emerald-600" />
                    <span className="text-xl font-bold text-emerald-600">ChatBot</span>
                    </Link>
            </div>
        </header>
        </>
    );
}
