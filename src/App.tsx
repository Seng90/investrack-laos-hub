import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Companies from "./pages/Companies";
import CompanyDetail from "./pages/CompanyDetail";
import TeamMemberDetail from "./pages/TeamMemberDetail";
import SearchResults from "./pages/SearchResults";
import Investors from "./pages/Investors";
import SignUp from "./pages/SignUp";
import InvestorDetail from "./pages/InvestorDetail";
import SignIn from "./pages/SignIn";
import Compare from "./pages/Compare";

import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/company/:slug" element={<CompanyDetail />} />
        <Route path="/company/:slug/team/:memberSlug" element={<TeamMemberDetail />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/investors" element={<Investors />} />
        <Route path="/investor/:slug" element={<InvestorDetail />} />
        <Route path="/compare" element={<Compare />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AnimatedRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
