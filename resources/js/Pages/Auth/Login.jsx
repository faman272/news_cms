import { useForm } from '@inertiajs/react';
import axios from 'axios';

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        axios.post('/login', data)
            .then(() => {
                window.location.href = '/dashboard';
            })
            .catch((error) => {
                if (error.response && error.response.status === 422) {
                    // Ambil kesalahan dari respons dan simpan di state
                    const { data } = error.response;
                    if (data.errors) {
                        Object.keys(data.errors).forEach((key) => {
                            setData(key, ''); // Reset field yang ada kesalahan
                            errors[key] = data.errors[key][0]; // Simpan pesan kesalahan
                        });
                    }
                    console.error('Error logging in:', error);
                }
            });
    };

    return (
        <div className="flex items-center justify-center h-screen px-6 bg-gray-200">
            <div className="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
                <div className="flex flex-col items-center justify-center gap-2">
                    <img src="/images/profile.png" alt="" className='w-10 h-10' />
                    <span className="text-3xl font-semibold text-gray-700">Admin Login</span>
                </div>

                <form className="mt-4" onSubmit={submit}>
                    <label className="block">
                        <span className="text-lg text-gray-700">Email</span>
                        <input 
                            value={data.email}
                            id='email' 
                            name='email' 
                            type="email" 
                            onChange={(e) => setData('email', e.target.value)}
                            className={`block w-full mt-1 rounded-md form-input focus:border-indigo-600 ${errors.email ? 'border-red-500' : ''}`} 
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </label>

                    <label className="block mt-3">
                        <span className="text-lg text-gray-700">Password</span>
                        <input
                            value={data.password}
                            id='password'
                            name='password' 
                            type="password" 
                            onChange={(e) => setData('password', e.target.value)}
                            className={`block w-full mt-1 rounded-md form-input focus:border-indigo-600 ${errors.password ? 'border-red-500' : ''}`} 
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                    </label>

                    <div className="mt-6">
                        <button type='submit' className="w-full px-4 py-2 text-lg text-center text-white rounded-md bg-primary hover:bg-tertiary" disabled={processing}>
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}