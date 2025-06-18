import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Label } from '@radix-ui/react-label';
import React from 'react';
import { useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Poruka',
        href: '/message',
    },
];

export default function Index() {
    const { data, setData, post, processing, errors } = useForm({
        phone: '',
        message: ''
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const phoneParam = urlParams.get('phone');
        if (phoneParam) {
            setData('phone', phoneParam);
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('message.store'));  
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Poruka" />
            <div className='w-8/12 p-4'>
                <form className='space-y-4' onSubmit={handleSubmit}>
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive">
                            <AlertTitle>Error!</AlertTitle>
                            <AlertDescription>
                                <ul className="list-disc pl-5">
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription> 
                        </Alert>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor='phone'>Broj mobitela (s kodom drzave)</Label>
                        <Input 
                            id="phone"
                            pattern="^\+\d{1,15}$"
                            placeholder='+123456789' 
                            value={data.phone} 
                            onChange={(e) => setData('phone', e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor='message'>Poruka</Label>
                        <Textarea 
                            id="message"
                            placeholder='Poruka' 
                            value={data.message} 
                            onChange={(e) => setData('message', e.target.value)}
                            required
                        />
                    </div>
                    <Button type='submit' disabled={processing}>
                        {processing ? 'Slanje...' : 'Posalji poruku'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}