import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import Companies from "./pages/Companies";
import CompanyDetail from "./pages/CompanyDetail";
import SearchResults from "./pages/SearchResults";
import Investors from "./pages/Investors";
import SignUp from "./pages/SignUp";
import InvestorDetail from "./pages/InvestorDetail";
import SignIn from "./pages/SignIn";
import Compare from "./pages/Compare";
import NewsFunding from "./pages/NewsFunding";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/company/:slug" element={<CompanyDetail />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/investors" element={<Investors />} />
        <Route path="/investor/:slug" element={<InvestorDetail />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/news-funding" element={<NewsFunding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
