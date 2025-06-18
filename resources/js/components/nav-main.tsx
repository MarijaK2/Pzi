import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { MessageSquarePlus, Contact, Clock, CheckCircle, User } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { recentMessages = [] } = usePage().props;

    return (
        <>
            <SidebarGroup className="px-2 py-0">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton 
                            asChild 
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                            <Link href="/message">
                                <MessageSquarePlus className="w-5 h-5" />
                                <span>Nova poruka</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton 
                            asChild 
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                            <Link href="/contacts">
                                <Contact className="w-5 h-5" />
                                <span>Kontakti</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup className="px-2 py-0">
                <SidebarGroupLabel>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Nedavne poruke</span>
                    </div>
                </SidebarGroupLabel>
                
                <ScrollArea className="h-[300px]">
                    <SidebarMenu>
                        {recentMessages.length > 0 ? (
                            recentMessages.map((message) => (
                                <SidebarMenuItem key={message.id}>
                                    <SidebarMenuButton 
                                        asChild
                                        className="hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                            <div className="flex items-center gap-2 w-full">
                                                {message.contact ? (
                                                    <User className="w-4 h-4 text-blue-500" />
                                                ) : (
                                                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                                                )}
                                                <div className="truncate flex-1">
                                                    <div className="font-medium text-sm truncate">
                                                        {message.contact?.name || message.phone}
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                        {message.message.substring(0, 30)}
                                                    </div>
                                                </div>
                                                <div className="text-xs text-gray-400 dark:text-gray-500">
                                                    {new Date(message.created_at).toLocaleTimeString([], { 
                                                        hour: '2-digit', 
                                                        minute: '2-digit' 
                                                    })}
                                                </div>
                                            </div>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))
                        ) : (
                            <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                                Nema nedavnih poruka.
                            </div>
                        )}
                    </SidebarMenu>
                </ScrollArea>
            </SidebarGroup>
        </>
    );
}