'use client';

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useRef } from "react";

const HeroSection = () => {

    const imageRef = useRef();

    useEffect(() => {
        const imageElement = imageRef.current;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const scrollThreshold = 100;

            if (scrollPosition > scrollThreshold) {
                imageElement.classList.add('scrolled')
            } else {
                imageElement.classList.remove('scrolled')
            }
        };

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="pb-20 px-4">
            <div className="container mx-auto text-center">
                <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">Manage your Finances<br />with AI and Intelligence.</h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">AI-powered finance management application that helps you stay on top of your money.</p>
                <div className="flex justify-center space-x-4">
                    <Link href={'/dashboard'}>
                        <Button size='lg' className='px-8'>Get Started</Button>
                    </Link>
                    <Link href={'/'}>
                        <Button size='lg' variant='outline' className='px-8'>Watch Demo</Button>
                    </Link>
                </div>
            </div>
            <div className="hero-image-wrapper">
                <div ref={imageRef} className="hero-image">
                    <Image src='/banner.png' width={1280} height={720} alt="dashboard-preview" priority className="rounded-lg shadow-2xl border mx-auto" />
                </div>
            </div>
        </div>
    )
}

export default HeroSection