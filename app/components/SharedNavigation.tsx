'use client'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Menu, X, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const menuItems = [
    { name: 'Home', href: '/' },
    { 
        name: 'WED Events', 
        href: '#',
        dropdown: [
            { name: 'WED Initiative Overview', href: '/wed-overview' },
            { name: 'WED 1.0', href: '/wed-1' },
            { name: 'WED 2.0', href: '/wed-2' },
            { name: 'WED 3.0', href: '/wed-3' },
        ]
    },
    { name: 'About', href: '/about' },
    { name: 'Activities', href: '/activities' },
    { name: 'Sponsorship', href: '/sponsorship' },
    { name: 'Speakers', href: '/speakers' },
    { name: 'Gallery', href: '/gallery' },
]

const mobileMenuItems = [
    { name: 'Home', href: '/' },
    { name: 'WED Initiative Overview', href: '/wed-overview' },
    { name: 'WED 1.0', href: '/wed-1', indent: true },
    { name: 'WED 2.0', href: '/wed-2', indent: true },
    { name: 'WED 3.0', href: '/wed-3', indent: true },
    { name: 'About', href: '/about' },
    { name: 'Activities', href: '/activities' },
    { name: 'Sponsorship', href: '/sponsorship' },
    { name: 'Speakers', href: '/speakers' },
    { name: 'Gallery', href: '/gallery' },
]

const WEDLogo = ({ className }: { className?: string }) => {
    return (
        <div className={cn('flex items-center space-x-2', className)}>
            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-xl font-bold text-red-600">WED 4.0</span>
        </div>
    )
}

export default function SharedNavigation() {
    const [menuState, setMenuState] = useState(false)
    
    return (
        <header className="sticky top-0 z-50">
            <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        {/* Logo */}
                        <Link
                            href="/"
                            aria-label="home"
                            className="flex items-center space-x-2">
                            <WEDLogo />
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center space-x-8">
                            {menuItems.map((item, index) => (
                                <div key={index}>
                                    {item.dropdown ? (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="flex items-center gap-1 text-gray-700 hover:text-red-600 transition-colors duration-150 font-medium">
                                                <span>{item.name}</span>
                                                <ChevronDown className="h-4 w-4" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg">
                                                {item.dropdown.map((dropdownItem, dropdownIndex) => (
                                                    <DropdownMenuItem key={dropdownIndex} asChild>
                                                        <Link 
                                                            href={dropdownItem.href} 
                                                            className="text-gray-700 hover:text-red-600 cursor-pointer">
                                                            {dropdownItem.name}
                                                        </Link>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="text-gray-700 hover:text-red-600 transition-colors duration-150 font-medium">
                                            {item.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                            
                            <Button
                                asChild
                                className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6">
                                <Link href="/register">Register</Link>
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button 
                            className="lg:hidden" 
                            onClick={() => setMenuState(!menuState)}
                            aria-label={menuState ? 'Close Menu' : 'Open Menu'}>
                            {menuState ? <X className="h-6 w-6 text-red-600" /> : <Menu className="h-6 w-6 text-red-600" />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {menuState && (
                        <div className="lg:hidden py-4 border-t border-gray-100">
                            <div className="flex flex-col space-y-4">
                                {mobileMenuItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className={cn(
                                            "text-gray-700 hover:text-red-600 transition-colors duration-150 font-medium",
                                            item.indent && "pl-4"
                                        )}
                                        onClick={() => setMenuState(false)}>
                                        {item.name}
                                    </Link>
                                ))}
                                <Button
                                    asChild
                                    className="bg-red-600 hover:bg-red-700 text-white rounded-full w-fit">
                                    <Link href="/register" onClick={() => setMenuState(false)}>
                                        Register
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    )
}
