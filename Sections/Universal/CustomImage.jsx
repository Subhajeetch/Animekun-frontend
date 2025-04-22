"use client"
import { useState } from 'react';

export default function CustomImage({
    src,
    alt,
    className = '',
    placeholderSrc = '',
    ...props
}) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Placeholder (blur) */}
            {!isLoaded && placeholderSrc && (
                <img
                    src={placeholderSrc}
                    alt="blur-placeholder"
                    className="absolute top-0 left-0 w-full h-full object-cover blur-lg scale-105 transition duration-500"
                />
            )}

            {/* Real image */}
            <img
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                {...props}
            />
        </div>
    );
}
