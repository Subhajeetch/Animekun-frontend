import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VideoSkipOverlay = ({ currentTime, formatTime }, ref) => {
    const [showForward, setShowForward] = useState(false);
    const [showBackward, setShowBackward] = useState(false);

    const forwardTimeout = useRef(null);
    const backwardTimeout = useRef(null);

    const forward = () => {
        setShowForward(true);
        if (forwardTimeout.current) clearTimeout(forwardTimeout.current);
        forwardTimeout.current = setTimeout(() => setShowForward(false), 800);
    };

    const backward = () => {
        setShowBackward(true);
        if (backwardTimeout.current) clearTimeout(backwardTimeout.current);
        backwardTimeout.current = setTimeout(() => setShowBackward(false), 800);
    };

    React.useImperativeHandle(ref, () => ({
        forward,
        backward
    }));

    return (
        <div className='absolute top-0 left-0 w-full h-full pointer-events-none flex'>
            {/* Backward */}
            <div className='flex-1 relative flex items-center justify-center'>
                <AnimatePresence>
                    {showBackward && (
                        <motion.div
                            key='backward'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className='absolute inset-0 bg-[#dbdbdb93] rounded-r-full flex items-center justify-center overflow-hidden'
                        >
                            {/* Inner swipe animation */}
                            <motion.div
                                initial={{ x: "100%" }}
                                animate={{ x: "-100%" }}
                                transition={{
                                    duration: 0.6,
                                    ease: "easeInOut"
                                }}
                                className='absolute inset-0 bg-[#bcbcbc5f]'
                            />
                            <div className='z-10 text-center'>
                                <p className='font-bold text-white text-xl'>
                                    -10s
                                </p>
                                <p className='text-white text-sm'>
                                    {formatTime(currentTime)}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Spacer */}
            <div className='flex-1'></div>

            {/* Forward */}
            <div className='flex-1 relative flex items-center justify-center'>
                <AnimatePresence>
                    {showForward && (
                        <motion.div
                            key='forward'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className='absolute inset-0 bg-[#dbdbdb93] rounded-l-full flex items-center justify-center overflow-hidden'
                        >
                            {/* Inner swipe animation */}
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{
                                    duration: 0.6,
                                    ease: "easeInOut"
                                }}
                                className='absolute inset-0 bg-[#bcbcbc5f]'
                            />
                            <div className='z-10 text-center'>
                                <p className='font-bold text-white text-xl'>
                                    +10s
                                </p>
                                <p className='text-white text-sm'>
                                    {formatTime(currentTime)}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default React.forwardRef(VideoSkipOverlay);
