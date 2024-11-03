import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                body: ['Public Sans']
            },
            colors: {
                primary: "#038A47",
                secondary: "#038A47",
                tertiary: "#0B6839",
                primary30: "#39A9354D",
                darkGrey: "#4A5764",
                backgroundPrimary: "#FAFAFA",
            },
            fontSize: {
                '2xs': '6px',
                'xs': '8px',
                'sm': '10px',
                'base': '12px',
                'lg': '14px',
                'xl': '16px',
                '2xl': '18px',
                '3xl': '20px',
                '4xl': '24px',
                '5xl': '32px',
                '6xl': '36px',
                '7xl': '48px',
            },
            lineHeight: {
                '4xs': '8px',
                '3xs': '10px',
                '2xs': '16px',
                'xs': '18px',
                'sm': '20px',
                'base': '22px',
                'lg': '24px',

            },
            borderRadius: {
                'sm': '4px',
                'base': '8px',
                'lg': '16px',
                'xl': '20px',
                '2xl': '32px',
            },
        },
    },

    plugins: [forms],
};