import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Github, Mail, Phone, Clock, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer id="support" className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="font-semibold text-xl">Solexity AI</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Your intelligent screen analysis tool for enhanced productivity and seamless web content understanding.
            </p>
            <div className="flex space-x-2">
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
                <a href="tel:+919892807086">
                  <Phone className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-semibold">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#install" className="hover:text-foreground transition-colors">Download</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">What's New</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="mailto:m.chunawala@somaiya.edu" className="hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#install" className="hover:text-foreground transition-colors">Installation Guide</a></li>
              <li><a href="mailto:m.chunawala@somaiya.edu" className="hover:text-foreground transition-colors">Contact Us</a></li>
              <li><a href="mailto:m.chunawala@somaiya.edu" className="hover:text-foreground transition-colors">Report Bug</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:m.chunawala@somaiya.edu" className="hover:text-foreground transition-colors">
                  m.chunawala@somaiya.edu
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+919892807086" className="hover:text-foreground transition-colors">
                  +91 9892807086
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5" />
                <div>
                  <p>Support Hours:</p>
                  <p>9 AM - 6 PM (IST)</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 Solexity AI. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> for a better web experience
          </p>
        </div>
      </div>
    </footer>
  );
}