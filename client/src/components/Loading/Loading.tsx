import animationData from '../../assets/animations/wave.json'
import { motion, AnimatePresence } from 'framer-motion';
import { useLottie } from 'lottie-react';
const Loading = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const { View } = useLottie(defaultOptions)

    return (
        <AnimatePresence>
            <motion.div
                className="loading"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="load-wrap">
                    { View }
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Loading;