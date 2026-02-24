import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Services from "./pages/Services";
import APropos from "./pages/APropos";
import Methode from "./pages/Methode";
import Contact from "./pages/Contact";
import DeveloppementWeb from "./pages/services/DeveloppementWeb";
import MarketingDigital from "./pages/services/MarketingDigital";
import DesignGraphic from "./pages/services/DesignGraphic";
import SolutionsMetiers from "./pages/services/SolutionsMetiers";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBlogList from "./pages/admin/AdminBlogList";
import AdminBlogEditor from "./pages/admin/AdminBlogEditor";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import MentionsLegales from "./pages/MentionsLegales";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/a-propos" element={<APropos />} />
                <Route path="/methode" element={<Methode />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/developpement-web" element={<DeveloppementWeb />} />
                <Route path="/services/marketing-digital" element={<MarketingDigital />} />
                <Route path="/services/design-graphic" element={<DesignGraphic />} />
                <Route path="/services/solutions-metiers" element={<SolutionsMetiers />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/blogs" element={<AdminBlogList />} />
                <Route path="/admin/blogs/new" element={<AdminBlogEditor />} />
                <Route path="/admin/blogs/edit/:id" element={<AdminBlogEditor />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/mentions-legales" element={<MentionsLegales />} />
                <Route path="/faq" element={<FAQ />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
