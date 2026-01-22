import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const faqs = [
  {
    question: "What browsers does Solexity AI support?",
    answer: "Solexity AI currently supports Chrome browsers. We're working on support for Safari and Edge. The extension works on all major websites and web applications."
  },
  {
    question: "Is my data private and secure?",
    answer: "Absolutely! We prioritize your privacy. All analysis happens securely, and we don't store any personal information or browsing history. Your data stays on your device and is only processed when you actively use the extension."
  },
  {
    question: "Do I need to create an account to use Solexity AI?",
    answer: "No account required! You can start using Solexity AI immediately after installation. Simply install the extension and you're ready to go. No registration or login needed."
  },
  {
    question: "How accurate is the screen analysis?",
    answer: "Our AI-powered screen analysis is highly accurate and continuously improving. It can understand complex web content, recognize different content types, and provide relevant insights based on the context of what you're viewing."
  },
  {
    question: "Can I use Solexity AI on any website?",
    answer: "Yes! Solexity AI works on virtually any website. Whether you're reading articles, analyzing data, or browsing social media, the extension can help you understand and interact with the content more effectively."
  },
  {
    question: "What if I encounter issues with the extension?",
    answer: "We provide comprehensive support! You can contact our support team via email at m.chunawala@somaiya.edu or call us at +91 9892807086 during support hours (9 AM - 6 PM IST). We also have a detailed help center with troubleshooting guides."
  },
  {
    question: "Is Solexity AI free to use?",
    answer: "Yes, Solexity AI is completely free to install and use. There are no hidden fees, subscriptions, or premium tiers. All features are available to all users at no cost."
  },

  {
    question: "Can I use Solexity AI for academic research?",
    answer: "Absolutely! Many students and researchers use Solexity AI for academic purposes. The text selection and search features are particularly useful for understanding complex topics and finding related research materials."
  },
  {
    question: "Does the extension work offline?",
    answer: "Solexity AI requires an internet connection to provide AI-powered analysis and search results. However, basic text selection and some features may work with cached content when offline."
  }
];

export function FAQSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Got questions? We've got answers. Find everything you need to know about Solexity AI 
            and how it can enhance your browsing experience.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:m.chunawala@somaiya.edu"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Contact Support
            </a>
            <a 
              href="tel:+919892807086"
              className="inline-flex items-center justify-center px-6 py-3 border border-input bg-background rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
