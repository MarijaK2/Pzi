import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { MessageSquare, Contact, Send, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';


interface PageProps{
    flash: {
        message?: string;
    }
}

export default function Dashboard() {
    return (
        <AppLayout>
            <Head title="Dashboard" />
            <div className="p-6 max-w-4xl mx-auto space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Platforma za slanje poruka na WhatsApp-u</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-full">
                                <Send className="h-6 w-6 text-emerald-600 dark:text-emerald-300" />
                            </div>
                            <h2 className="text-xl font-semibold">Slanje poruka</h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Brzo pošaljite WhatsApp poruke na broj preko Twillio.
                            Broj mora biti potvrđen od strane Twillia da biste dobili poruku na broj!
                        </p>
                        <Button asChild className="w-full">
                            <Link href="/message">
                                Idi na novu poruku
                            </Link>
                        </Button>
                    </div>

                    <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                                <Contact className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                            </div>
                            <h2 className="text-xl font-semibold">Kontakti</h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Pohranite i organizirajte svoje kontakte za brzo slanje poruka. Spremite imena, brojeve i bilješke za lakše snalaženje.
                        </p>
                        <Button asChild variant="outline" className="w-full">
                            <Link href="/contacts">
                                Pogledaj kontakte
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mt-8">
                    <h2 className="text-xl font-semibold mb-4">Kako radi</h2>
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                                    <Phone className="h-5 w-5" />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-medium">1. Unesi broj mobitela</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Uključite pozivni broj države (npr. +387 za BiH)
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                                    <Mail className="h-5 w-5" />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-medium">2. Napiši svoju poruku</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Napišite svoju poruku (ograničenje od 1600 znakova)
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                                    <Send className="h-5 w-5" />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-medium">3. Pošalji</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Poruke se odmah dostavljaju putem WhatsAppa
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
