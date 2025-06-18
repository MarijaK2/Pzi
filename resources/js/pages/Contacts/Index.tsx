import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kontakti',
        href: '/contacts',
    },
];

interface Contact {
    id: number,
    name: string,
    phone: string,
    email: string,
    notes: string
}

interface ContactIndexProps {
    contacts: Contact[];
}


export default function Index({ contacts }: ContactIndexProps) {

    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, name: string) => {
        if(confirm(`Zelis li izbrisati ${id} - ${name}`)){
            destroy(`/contacts/${id}`);
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kontakti" />
            <div className='m-4'>
                <Link href={route('contacts.add')}>
                    <Button>Dodaj novi kontakt</Button>
                </Link>
            </div>
            {contacts.length > 0 && (
                <div className='m-4 w-10/12 p-4 space-y-4'>
                    <Table>
                        <TableCaption></TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="">ID</TableHead>
                                <TableHead className='text-center'>Ime</TableHead>
                                <TableHead className='text-center'>Broj</TableHead>
                                <TableHead className='text-center'>Email</TableHead>
                                <TableHead className='text-center'>Biljeske</TableHead>
                                <TableHead className='text-center'>Akcija</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {contacts.map((contact) => (
                                <TableRow className='text-center'>
                                    <TableCell className="font-medium">{contact.id}</TableCell>
                                    <TableCell>{contact.name}</TableCell>
                                    <TableCell>{contact.phone}</TableCell>
                                    <TableCell>{contact.email || '-||-'}</TableCell>
                                    <TableCell>{contact.notes || '-||-'}</TableCell>
                                    <TableCell className='text-center space-x-2'>
                                        <Link href={route('contacts.edit', contact.id)}><Button className='bg-slate-600 hover:bg-slate-700'>Uredi</Button></Link>
                                        <Link href={`/message?phone=${encodeURIComponent(contact.phone)}`}>
        <Button className='bg-emerald-600 hover:bg-emerald-700'>Posalji poruku</Button>
    </Link>
                                        <Button disabled={processing} onClick={() => handleDelete(contact.id, contact.name)} className='bg-red-500  hover:bg-red-700'>Izbrisi</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </AppLayout>
    );
}
