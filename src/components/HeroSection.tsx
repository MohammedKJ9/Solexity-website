import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Download, Chrome, Globe, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { downloadApi } from "../services/api";
import { trackDownload } from "./Analytics";
import { useState } from "react";


export function HeroSection() {
  const [downloadLinks, setDownloadLinks] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

    useState(() => {
      const fetchLinks = async () => {
        try {
          const response = await downloadApi.getLinks();
          if (response.status === 'success' && response.data) {
            setDownloadLinks(response.data);
          }
        } catch (error) {
          console.error('Failed to fetch download links:', error);
        }
      };
      fetchLinks();
    });


      const getPlatformInfo = (): string => {
    const platform = navigator.platform.toLowerCase();
    if (platform.includes('win')) return 'windows';
    if (platform.includes('mac')) return 'macos';
    if (platform.includes('linux')) return 'linux';
    if (platform.includes('android')) return 'android';
    if (platform.includes('iphone') || platform.includes('ipad')) return 'ios';
    return 'other';
  };


const handleChromeDownload = async () => {
  setIsLoading(true);
  try {
    // 1. Track using your existing downloadApi
    await downloadApi.create({
      browser: 'chrome',
      platform: getPlatformInfo(),
      downloadType: 'zip',
      userAgent: navigator.userAgent,
    });

    // 2. Download via the fixed backend route
    const link = document.createElement('a');
    link.href = '/api/download-file'; // ✅ Use the new endpoint
    link.download = 'solexity-extension.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (error) {
    console.error('Tracking failed:', error);
    
    // Fallback: Try direct access
    const link = document.createElement('a');
    link.href = '/src/downloads/extension.zip'; // Direct path
    link.download = 'solexity-extension.zip';
    link.click();
  } finally {
    setIsLoading(false);
  }
};

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <Badge variant="secondary" className="w-fit">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Screen Analysis Tool
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Analyze Any Screen
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                {" "}With SolexityAI
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Solexity AI analyzes webpage content and lets you search selected text instantly. 
              Get context-aware answers and insights about what you're viewing with just a click.
            </p>
          </div>

          <div className="space-y-4">
            <p className="font-medium">Download for your browser:</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="flex-1 sm:flex-initial h-14 px-8 bg-[#4285F4] hover:bg-[#3367D6] text-white border-0"
                onClick={handleChromeDownload}
              >
                <Chrome className="w-6 h-6 mr-3" />
                <span className="text-lg">Add to Chrome</span>
                <Download className="w-5 h-5 ml-3" />
              </Button>
              
            </div>
            <p className="text-sm text-muted-foreground">
              Free to install • Works on all major websites • No account required
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-8">
            <ImageWithFallback
              src="src\downloads\image.jpg"
              alt="Solexity AI Browser Extension Interface"
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
        </div>
      </div>
    </section>
  );
}