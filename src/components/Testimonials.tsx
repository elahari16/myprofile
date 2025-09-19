import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Dr. Rajesh Kumar",
    role: "Senior Data Scientist, Tech Corp",
    content: "Hariharan's work on the MILTRANS project was exceptional. His ability to understand complex NLP requirements and deliver a scalable solution that reduced training delays by 40% was impressive.",
    rating: 5,
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    name: "Priya Sharma",
    role: "ML Engineer, DataTech Solutions",
    content: "Working with Hariharan on computer vision projects has been great. His technical skills in YOLO and real-time processing, combined with his problem-solving approach, make him a valuable team member.",
    rating: 5,
    image: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    name: "Arun Patel",
    role: "Project Manager, AI Innovations",
    content: "Hariharan consistently delivers high-quality work on time. His 92% accuracy achievement in safety monitoring systems and attention to detail in model optimization is commendable.",
    rating: 5,
    image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150"
  }
];

const Testimonials: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-accent-50 to-primary-50 dark:from-dark-800 dark:to-dark-900">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-accent-100 dark:bg-accent-900 text-accent-600 dark:text-accent-400 text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-serif">What Colleagues Say</h2>
          <p className="text-dark-600 dark:text-dark-300 max-w-2xl mx-auto">
            Feedback from professionals I've worked with on various data science and AI projects.
          </p>
        </motion.div>

        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary-200 dark:text-primary-800" />
              
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-dark-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-dark-600 dark:text-dark-400">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-dark-700 dark:text-dark-300 italic">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;