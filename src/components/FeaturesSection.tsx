import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { 
  Eye, 
  MousePointer, 
  Search, 
  MessageCircle, 
  Zap, 
  Shield,
  Target,
  Clock
} from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Screen Analysis",
    description: "Intelligently analyze any webpage content to understand context and provide relevant insights about what you're viewing."
  },
  {
    icon: MousePointer,
    title: "Text Selection & Search",
    description: "Select any text on a webpage and instantly search for related information or get quick explanations."
  },
  {
    icon: MessageCircle,
    title: "Context-Aware Answers",
    description: "Get instant answers and explanations based on the current page content and your selected text."
  },
  {
    icon: Target,
    title: "Smart Content Recognition",
    description: "Automatically recognize and understand different types of content including articles, forms, and data tables."
  },
  {
    icon: Zap,
    title: "Quick Insights",
    description: "Perform instant analysis of screen content with simple clicks - no complex commands or setup required."
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your browsing data stays private. All analysis happens securely with no personal information stored or shared."
  },
  {
    icon: Search,
    title: "Intelligent Search",
    description: "Enhanced search capabilities that work with your selected text to find the most relevant information quickly."
  },
  {
    icon: Clock,
    title: "Always Available",
    description: "Access screen analysis and text search features 24/7 on any website without switching tabs or applications."
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Powerful Features for Every Need
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Solexity AI comes packed with intelligent features designed to enhance your browsing experience 
            and boost your productivity across all websites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}