import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Chrome, Globe, Download, MousePointer, Settings, FileArchive, Search   } from "lucide-react";
import { trackDownload } from "./Analytics";
import { downloadApi } from "../services/api";
import { useState } from "react";

export function InstallSection() {
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

const handleChromeDownload = async () => {
  setIsLoading(true);
  try {
    await downloadApi.create({
      browser: 'chrome',
      platform: getPlatformInfo(),
      downloadType: 'zip',
      userAgent: navigator.userAgent,
    });

    const link = document.createElement('a');
    link.href = '/api/download-file'; 
    link.download = 'solexity-extension.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (error) {
    console.error('Tracking failed:', error);
    
    const link = document.createElement('a');
    link.href = '/src/downloads/extension.zip'; 
    link.download = 'solexity-extension.zip';
    link.click();
  } finally {
    setIsLoading(false);
  }
};



  const getPlatformInfo = (): string => {
    const platform = navigator.platform.toLowerCase();
    if (platform.includes('win')) return 'windows';
    if (platform.includes('mac')) return 'macos';
    if (platform.includes('linux')) return 'linux';
    if (platform.includes('android')) return 'android';
    if (platform.includes('iphone') || platform.includes('ipad')) return 'ios';
    return 'other';
  };

  return (
    <section id="install" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Easy Installation in Minutes
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started with Solexity AI in just a few clicks. Choose your browser and follow the simple steps below.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="chrome" className="w-full">
            <TabsList className="grid w-full grid-cols-1 mb-8">
              <TabsTrigger value="chrome" className="flex items-center gap-2">
                <Chrome className="w-4 h-4" />
                Chrome
              </TabsTrigger>
              </TabsList>

            <TabsContent value="chrome" className="space-y-6">
              <div className="text-center mb-8">
                <Button 
                  size="lg" 
                  className="h-14 px-8 bg-[#4285F4] hover:bg-[#3367D6] text-white border-0" 
                  onClick={handleChromeDownload}

                  disabled={isLoading}
                >
                  <Chrome className="w-6 h-6 mr-3" />
                  <span className="text-lg">
                    {isLoading ? 'Loading...' : 'Add to Chrome'}
                  </span>
                  <Download className="w-5 h-5 ml-3" />
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Download className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle>Step 1: Download</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">
                      Click "Add to Chrome" to download the Solexity Extension zip file.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <FileArchive className="w-6 h-6 text-green-600" />
                    </div>
                    <CardTitle>Step 2: Extract</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">
                      Extract the file.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <MousePointer className="w-6 h-6 text-red-600" />
                    </div>
                    <CardTitle>Step 3: Pin Extension</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">
                      Click the puzzle piece icon, manage extensions, then load unpacked.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Search  className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle>Step 4: Find Manifest</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">
                      Navigate to the path of your extracted file /extension and select folder.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Settings className="w-6 h-6 text-purple-600" />
                    </div>
                    <CardTitle>Step 3: Start Using</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">
                      Click the Solexity AI icon in your toolbar and start chatting with your AI assistant!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            
          </Tabs>

          <div className="mt-12 p-6 bg-muted/50 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
            <p className="text-muted-foreground mb-4">
              Having trouble installing? Check our comprehensive installation guide or contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline">
                View Full Guide
              </Button>
              <Button variant="ghost" asChild>
                <a href="mailto:m.chunawala@somaiya.edu">
                  Contact Support
                </a>
              </Button>
            </div>
            <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
              <p>Support Hours: 9 AM - 6 PM (IST)</p>
              <p>Email: <a href="mailto:m.chunawala@somaiya.edu" className="hover:text-foreground transition-colors">m.chunawala@somaiya.edu</a></p>
              <p>Phone: <a href="tel:+919892807086" className="hover:text-foreground transition-colors">+91 9892807086</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}