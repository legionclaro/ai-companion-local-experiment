import { motion } from "framer-motion";
import SEO from "@/components/common/SEO";

interface PageTransitionProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
}

const PageTransition = ({ children, title, description }: PageTransitionProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <SEO title={title} description={description} />
            {children}
        </motion.div>
    );
};

export default PageTransition;
