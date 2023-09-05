import React from 'react';

const Verified = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="flex flex-col items-center space-y-8 p-10">
                <img src="assets/img/logo.svg" alt="Your Logo" className="w-48 h-auto mb-8"/>
                <h1 className="text-5xl">
                    Welcome to Hopguides! 
                </h1>
                <p className="text-center text-2xl max-w-xl">
                   Some text
                </p>
                <hr className="w-full max-w-2xl border-gray-300"/>
               
            </div>
        </div>
    );
}

export default Verified;