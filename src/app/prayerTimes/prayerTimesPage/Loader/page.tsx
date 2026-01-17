
import {FaMosque} from "react-icons/fa";
import { motion } from "framer-motion";
const Loader = () => {
    return (
            <div className="flex flex-col items-center justify-center min-h-[80vh]">
                <motion.div
                    animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0] 
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-8xl text-teal-500 mb-6"
                >
                    <FaMosque />
                </motion.div>
                <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="w-full h-full bg-teal-500"
                    />
                </div>
            </div>
        );
}
export default Loader