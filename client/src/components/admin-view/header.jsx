import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { AlignJustify, LogOut } from 'lucide-react';
import { logoutUser } from '@/store/auth-slice';

function AdminHeader({ setOpen }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser()).then(() => {
            navigate('/auth/login');
        });
    };

    return (
        <header className='flex items-center justify-between px-4 py-3 bg-background border-b'>
            <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
                <AlignJustify />
                <span className='sr-only'> Toggle Menu</span>
            </Button>
            <div className='flex flex-1 justify-between items-center'>
                <h1 className='text-xl font-semibold'>Admin Dashboard</h1>
                <Button 
                    onClick={handleLogout} 
                    className='inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow'
                >
                    <LogOut />
                    Logout
                </Button>
            </div>
        </header>
    );
}

export default AdminHeader;