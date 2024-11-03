import React, { useState } from 'react';
import { IoShareSocialOutline } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { LuFacebook } from "react-icons/lu";

const ShareButton = ({ url }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleShareClick = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(url)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    return (
        <>
            <div>
                <ul className='sticky top-0 flex items-center justify-center gap-4 pb-10 md:flex-col md:pl-16 xl:py-8 md:justify-start text-darkGrey'>
                    <li>
                        {isCopied && 
                            <span className='absolute top-0 px-2 py-1 text-xs font-semibold text-white rounded-sm right-1/2 xl:right-0 xl:text-lg bg-primary'>
                                Copied!
                            </span>
                        }
                        <button onClick={handleShareClick}>
                            <IoShareSocialOutline className='text-lg xl:text-3xl' />
                        </button>
                    </li>
                    <li>
                        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">
                            <FaXTwitter className='text-lg xl:text-3xl' />
                        </a>
                    </li>
                    <li>
                        <a href={`https://www.instagram.com/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">
                            <FaInstagram className='text-lg xl:text-3xl' />
                        </a>
                    </li>
                    <li>
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">
                            <LuFacebook className='text-lg xl:text-3xl' />
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default ShareButton;