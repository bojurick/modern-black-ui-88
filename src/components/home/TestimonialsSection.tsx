
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Alex R.",
      role: "Experienced User",
      avatar: "https://i.pravatar.cc/150?img=1",
      quote: "Velocity's script execution capabilities are unmatched. It's made my gaming experience completely different.",
      rating: 5
    },
    {
      name: "Sarah K.",
      role: "Game Developer",
      avatar: "https://i.pravatar.cc/150?img=5",
      quote: "The script library saved me countless hours of work. So many quality scripts ready to use!",
      rating: 5
    },
    {
      name: "Michael T.",
      role: "Power User",
      avatar: "https://i.pravatar.cc/150?img=8",
      quote: "After trying many executors, Velocity is by far the most reliable and feature-rich option available.",
      rating: 5
    },
    {
      name: "Emma J.",
      role: "Content Creator",
      avatar: "https://i.pravatar.cc/150?img=9",
      quote: "Velocity's performance is incredible - I've never experienced such smooth script execution before.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/20 text-sm">
            <Star className="inline-block h-4 w-4 mr-1 fill-current" />
            <span>User Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. See what our community thinks about Velocity.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card/30 border border-white/10 p-6 rounded-lg backdrop-blur-sm hover:bg-card-hover/30 transition-colors relative"
            >
              <div className="absolute top-6 right-6 text-primary/50">
                <Quote className="w-8 h-8 opacity-50" />
              </div>
              
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3 border border-white/10">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`inline-block h-4 w-4 ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-600'} mr-1`} 
                  />
                ))}
              </div>
              
              <p className="text-gray-300 text-sm">{testimonial.quote}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
