import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ui/ScrollReveal";

const faqs = [
  {
    question: "What certifications do your diamonds come with?",
    answer: "All our diamonds come with internationally recognized certifications from GIA (Gemological Institute of America), IGI (International Gemological Institute), or SGL (Solitaire Gemmological Laboratories). Each certificate verifies the diamond's authenticity, quality, and specifications."
  },
  {
    question: "Do you offer custom jewellery designs?",
    answer: "Yes, we specialize in creating bespoke jewellery pieces. Our master craftsmen work with you to bring your vision to life. From engagement rings to heirloom pieces, we craft unique designs tailored to your preferences and budget."
  },
  {
    question: "What is your return and exchange policy?",
    answer: "We offer a 7-day return policy for unworn items in their original packaging. Exchanges can be made within 30 days. Custom-made pieces are non-returnable but can be resized or adjusted within the warranty period."
  },
  {
    question: "How do I care for my diamond jewellery?",
    answer: "Clean your diamond jewellery regularly with mild soap and warm water using a soft brush. Avoid wearing jewellery during strenuous activities. Store pieces separately in soft pouches to prevent scratching. We also offer complimentary cleaning services at our showroom."
  },
  {
    question: "Do you offer financing or payment plans?",
    answer: "Yes, we offer flexible payment options including EMI plans through major banks and credit cards. We also accept partial payments with the balance due before delivery. Contact us for personalized financing solutions."
  },
  {
    question: "How can I verify the authenticity of my purchase?",
    answer: "Every piece comes with a certificate of authenticity and a unique identification number. You can verify your diamond's details through the respective certification body's website. We also provide lifetime authenticity guarantee for all purchases."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we offer secure insured shipping across India and select international destinations. All shipments are fully insured and require signature confirmation upon delivery for your peace of mind."
  },
  {
    question: "Can I book an appointment to view diamonds?",
    answer: "Absolutely! We encourage private appointments for a personalized experience. Book through our app or contact us directly. Our experts will guide you through our collection and help you find the perfect piece."
  }
];

export const FAQSection = () => {
  return (
    <section className="py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal direction="up" className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="inline-flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <span className="text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] text-muted-foreground font-medium">
              Have Questions?
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Find answers to common questions about our diamonds, services, and policies.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <Accordion type="single" collapsible className="space-y-2 sm:space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg sm:rounded-xl px-4 sm:px-6 overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <AccordionTrigger className="text-left text-foreground font-medium py-4 sm:py-5 hover:no-underline hover:text-primary transition-colors text-sm sm:text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground pb-4 sm:pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>

        <ScrollReveal direction="fade" delay={0.4} className="text-center mt-8 sm:mt-10">
          <p className="text-sm sm:text-base text-muted-foreground">
            Still have questions?{" "}
            <span className="text-primary font-medium cursor-pointer hover:underline">
              Contact our support team
            </span>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};
