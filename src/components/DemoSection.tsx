import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Zap, MousePointer, MessageCircle, Eye } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function DemoSection() {
  const demoSteps = [
    {
      icon: Eye,
      title: "Screen Analysis",
      description: "AI analyzes the current webpage content to understand context and structure.",
      color: "bg-blue-500"
    },
    {
      icon: MousePointer,
      title: "Text Selection",
      description: "Select any text on the page to get instant insights and explanations.",
      color: "bg-green-500"
    },
    
    {
      icon: Zap,
      title: "Quick Actions",
      description: "Perform actions like summarizing, translating, or finding related content.",
      color: "bg-orange-500"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="w-fit mx-auto">
            <Zap className="w-3 h-3 mr-1" />
            How It Works
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            How Solexity AI Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the power of AI-driven screen analysis. From simple text selection to complex content understanding, 
            see how Solexity AI enhances your browsing experience in real-time.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Extension Interface Preview */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-8">
              <ImageWithFallback
                src="src\downloads\image.jpg"
                alt="Solexity AI Extension Interface"
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">AI</span>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg">
              <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            </div>
          </div>

          {/* Demo Steps */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">
              Simple 3-Step Process
            </h3>
            {demoSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${step.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">Screen Analysis</h4>
              <p className="text-sm text-muted-foreground mb-4">
                AI understands webpage content and provides context-aware insights.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MousePointer className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">Text Selection</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Select any text to get instant explanations and related information.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
