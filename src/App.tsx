import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AnimatePresence } from "framer-motion";

import Index from "./pages/Index";
import Demo from "./pages/Demo";
import Biologists from "./pages/Biologists";
import BiologistProfile from "./pages/BiologistProfile";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import TestHooks from "./pages/TestHooks";
import Pricing from "./pages/Pricing";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardOverview from "./pages/dashboard";
import MyApplications from "./pages/dashboard/MyApplications";
import ProfileEditor from "./pages/dashboard/ProfileEditor";
import Messages from "./pages/dashboard/Messages";
import DashboardNotifications from "./pages/dashboard/Notifications";
import Billing from "./pages/dashboard/Billing";
import VerificationWizard from "./pages/dashboard/VerificationWizard";

import InstitutionLayout from "./components/layout/InstitutionLayout";
import InstitutionDashboardOverview from "./pages/institution/Dashboard";
import InstitutionProjects from "./pages/institution/MyProjects";
import NewProject from "./pages/institution/NewProject";
import InstitutionApplications from "./pages/institution/Applications";

import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminVerifications from "./pages/admin/Verifications";
import AdminProjects from "./pages/admin/Projects";
import AdminInstitutions from "./pages/admin/Institutions";
import AdminUsers from "./pages/admin/Users";
import AdvancedSearch from "./pages/AdvancedSearch";
import InstitutionReports from "./pages/institution/Reports";
import InstitutionAnalytics from "./pages/institution/Analytics";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterBiologist from "./pages/auth/RegisterBiologist";
import RegisterInstitution from "./pages/auth/RegisterInstitution";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Terms from "./pages/legal/Terms";
import Privacy from "./pages/legal/Privacy";
import Help from "./pages/Help";
import Contact from "./pages/Contact";
import BlogIndex from "./pages/blog/index";
import BlogPost from "./pages/blog/Post";
import BlogManager from "./pages/admin/BlogManager";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        {/* ... all other routes ... */}
        <Route path="/biologists" element={<Biologists />} />
        <Route path="/biologists/:id" element={<BiologistProfile />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/register/biologist" element={<RegisterBiologist />} />
        <Route path="/auth/register/institution" element={<RegisterInstitution />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />

        {/* Demo Mode */}
        <Route path="/demo" element={<Demo />} />

        {/* Advanced Search */}
        <Route path="/search" element={<AdvancedSearch />} />
        <Route path="/pricing" element={<Pricing />} />

        {/* Support & Legal */}
        <Route path="/help" element={<Help />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />

        {/* Blog System */}
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPost />} />

        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="/test-hooks" element={<TestHooks />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="messages" element={<Messages />} />
          <Route path="notifications" element={<DashboardNotifications />} />
          <Route path="applications" element={<MyApplications />} />
          <Route path="profile" element={<ProfileEditor />} />
          <Route path="billing" element={<Billing />} />
          <Route path="verify" element={<VerificationWizard />} />
        </Route>

        {/* Institution Routes */}
        <Route path="/institution" element={<InstitutionLayout />}>
          <Route index element={<InstitutionDashboardOverview />} />
          <Route path="projects" element={<InstitutionProjects />} />
          <Route path="projects/new" element={<NewProject />} />
          <Route path="applications" element={<InstitutionApplications />} />
          <Route path="reports" element={<InstitutionReports />} />
          <Route path="analytics" element={<InstitutionAnalytics />} />
          <Route path="billing" element={<Billing />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="verifications" element={<AdminVerifications />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="institutions" element={<AdminInstitutions />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="blog" element={<BlogManager />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

import { HelmetProvider } from "react-helmet-async";

// ... existing imports ...

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
