import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Download, Menu, Github, Mail, Phone, BarChart3 } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    {
      title: "Product",
      items: [
        { name: "Features", href: "#features" },
        { name: "Download", href: "#install" },
        { name: "What's New", href: "#" },
      ]
    },
    {
      title: "Resources",
      items: [
        { name: "Help Center", href: "#" },
        { name: "Installation Guide", href: "#install" },
        { name: "API Documentation", href: "#" },
      ]
    },
    {
      title: "Support",
      items: [
        { name: "Contact Us", href: "mailto:m.chunawala@somaiya.edu" },
        { name: "Report Bug", href: "#" },
        { name: "Community", href: "https://github.com/MohammedC18" },
      ]
    }
  ];

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <span className="font-semibold text-xl">Solexity AI</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#install" className="text-muted-foreground hover:text-foreground transition-colors">
            Download
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Help Center
          </a>
          <a href="mailto:m.chunawala@somaiya.edu" className="text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          {/* Contact Icons - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <a href="https://github.com/MohammedC18" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="mailto:m.chunawala@somaiya.edu">
                <Mail className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="/admin/login" target="_blank">
                <BarChart3 className="w-4 h-4" />
                Admin
              </a>
            </Button>
          </div>

          <Button size="sm" className="hidden md:flex" asChild>
            <a href="#install">
              <Download className="w-4 h-4 mr-2" />
              Download
            </a>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden">
                <Menu className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 pt-6">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">S</span>
                  </div>
                  <span className="font-semibold text-xl">Solexity AI</span>
                </div>

                {navigationItems.map((section, index) => (
                  <div key={index} className="space-y-3">
                    <h4 className="font-semibold text-foreground">{section.title}</h4>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <a 
                            href={item.href}
                            className="text-muted-foreground hover:text-foreground transition-colors block py-2"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div className="space-y-4 pt-4 border-t">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Contact Info</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <a href="mailto:m.chunawala@somaiya.edu" className="hover:text-foreground transition-colors">
                          m.chunawala@somaiya.edu
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <a href="tel:+919892807086" className="hover:text-foreground transition-colors">
                          +91 9892807086
                        </a>
                      </div>
                      <p>Support: 9 AM - 6 PM (IST)</p>
                    </div>
                  </div>

                  <Button className="w-full" asChild>
                    <a href="#install" onClick={() => setIsOpen(false)}>
                      <Download className="w-4 h-4 mr-2" />
                      Download Extension
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}