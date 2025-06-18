import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';

interface Contact {
    id: number,
    name: string,
    phone: string,
    email: string,
    notes: string
}

interface Props {
    contact: Contact
}

export default function Edit({contact} : Props) {
    const { flash } = usePage().props;
    const { data, setData, put, processing, errors, reset } = useForm({
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        notes: contact.notes
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('contacts.update', contact.id))
    };

    return (
        <AppLayout breadcrumbs={[{title: 'Uredi kontakt', href: `/contacts/${contact.id}/edit`}]}>
            <Head title="Uredi kontakt" />
            <div className='w-8/12 p-4 space-y-4'>
                {Object.keys(errors).length > 0 && (
                    <Alert variant="destructive">
                        <AlertTitle>ERROR</AlertTitle>
                        <AlertDescription>
                            <ul className="list-disc pl-5">
                                {Object.entries(errors).map(([key, message]) => (
                                    <li key={key}>{message as string}</li>
                                ))}
                            </ul>
                        </AlertDescription>
                    </Alert>
                )}

                <form className='space-y-4' onSubmit={handleUpdate}>
                    <div className='space-y-2'>
                        <Label htmlFor='name'>Ime kontakta *</Label>
                        <Input 
                            id="name"
                            placeholder='Ime' 
                            value={data.name} 
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor='phone'>Broj mobitela (s kodom drzave) *</Label>
                        <Input 
                            id="phone"
                            pattern="^\+\d{1,15}$"
                            placeholder='+123456789' 
                            value={data.phone} 
                            onChange={(e) => setData('phone', e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className='space-y-2'>
                        <Label htmlFor='email'>Email kontakta</Label>
                        <Input 
                            id="email"
                            type='email'
                            placeholder='Email' 
                            value={data.email} 
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>
                    
                    <div className='space-y-2'>
                        <Label htmlFor='notes'>Biljeske kontakta</Label>
                        <Textarea 
                            id="notes"
                            placeholder='Biljeske' 
                            value={data.notes} 
                            onChange={(e) => setData('notes', e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Polja oznacena sa * su obavezna!</span>
                    </div>
                    <Button type='submit' disabled={processing}>
                        {processing ? 'Azuriranje...' : 'Azuriraj kontakta'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}