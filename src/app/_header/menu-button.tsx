'use client'

import { BookIcon, MenuIcon, SearchIcon, UsersIcon } from 'lucide-react'
import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function MenuButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MenuIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='space-y-2'>
        <DropdownMenuItem asChild>
          <Link className='flex cursor-pointer items-center gap-2' href='/dashboard'>
            <UsersIcon className='h-4 w-4' /> Your Groups
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className='flex cursor-pointer items-center gap-2' href='/browse'>
            <SearchIcon className='h-4 w-4' /> Browse Groups
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className='flex cursor-pointer items-center gap-2' href='/docs'>
            <BookIcon className='h-4 w-4' /> API Docs
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
