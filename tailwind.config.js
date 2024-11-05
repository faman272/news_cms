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
                body: ['Public Sans'],
                roboto: ['Roboto'],
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
                '2xs': ['6px', '16px'],
                'xs': ['8px', '10px'],
                'sm': ['10px', '16px'],
                'base': ['12px', '16px'],
                'lg': ['14px', '18px'],
                'xl': ['16px', '18px'],
                '2xl': ['18px', '20px'],
                '3xl': ['20px', '24px'],
                '4xl': ['24px', '28px'],
                '5xl': ['32px', '40px'],
                '6xl': ['40px', '48px'],
                '7xl': ['48px', '56px'],
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