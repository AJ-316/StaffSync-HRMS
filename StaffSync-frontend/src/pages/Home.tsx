/* import { Link } from 'react-router-dom'; */
import Header from '../components/PageHeader/Header';
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div
        className="w-full h-screen bg-base-300 flex flex-col justify-center items-center"
      >
        <motion.div
          initial={{ y: -50, scaleY:0.8, opacity: 0 }}
          animate={{ y: 0, scaleY:1, opacity: 1 }}
          transition={{ delay:0.1, ease: 'easeInOut', type: "spring", stiffness: 300, damping: 10}}
        >
          <p className="title-big">StaffSync</p>
          <p className="title-p text-center">Human Resource Management System</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
