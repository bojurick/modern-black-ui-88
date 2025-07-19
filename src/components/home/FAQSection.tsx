
import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "What is Essence?",
      answer: "Essence is a powerful script executor with advanced features for gaming enhancement. It allows you to run scripts with unmatched performance and reliability."
    },
    {
      question: "Is Essence safe to use?",
      answer: "Yes, Essence is designed with security as a top priority. Our technology ensures you remain undetected while using our platform."
    },
    {
      question: "How do I get started with Essence?",
      answer: "Simply create an account, download the Essence client from your dashboard, and start executing scripts. Our intuitive interface makes it easy to get started."
    },
    {
      question: "What scripts are available?",
      answer: "Essence provides access to a vast library of scripts, ranging from game enhancements to utility tools. You can also create and share your own scripts."
    },
    {
      question: "Is customer support available?",
      answer: "Yes, we offer 24/7 customer support to help you with any questions or issues you might encounter."
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
            <HelpCircle className="inline-block h-4 w-4 mr-1" />
            <span>Questions & Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about Essence and its features.
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem value={`item-${index}`} className="border border-white/10 rounded-lg overflow-hidden bg-card/30 backdrop-blur-sm">
                  <AccordionTrigger className="px-6 py-4 hover:bg-card-hover/30 transition-colors">
                    <span className="text-left font-medium">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-1 text-gray-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
