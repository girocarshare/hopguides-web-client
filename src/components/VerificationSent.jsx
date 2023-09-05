import React from 'react';

const VerificationComponent = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="flex flex-col items-center space-y-8 p-10">
                <img src="assets/img/logo.svg" alt="Your Logo" className="w-48 h-auto mb-8"/>
                <h1 className="text-5xl">
                    Verification <span className="text-blue-500">link</span> sent
                </h1>
                <p className="text-center text-2xl max-w-xl">
                    We've sent you an email verification link. 
                    Please check your inbox and click the link to confirm your account.
                </p>
                <hr className="w-full max-w-2xl border-gray-300"/>
                <p className="text-center text-lg max-w-xl">
                    Didn't get a verification email? Check your spam folder or
                </p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                    Resend
                </button>
                <p className="text-center text-lg max-w-xl">
    Still didn't get it? <a href="/support" className="text-blue-500 hover:underline">Contact support</a> or use a <a href="/change-email" className="text-blue-500 hover:underline">different mail</a>
</p>
            </div>
        </div>
    );
}

export default VerificationComponent;