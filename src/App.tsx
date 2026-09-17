import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Core Views
import { HomeView } from './views/HomeView';
import { SolutionsView } from './views/SolutionsView';
import { IndustriesView } from './views/IndustriesView';
import { CaseStudiesView } from './views/CaseStudiesView';
import { CaseStudyDetailView } from './views/CaseStudyDetailView';
import { AboutView } from './views/AboutView';
import { InsightsView } from './views/InsightsView';
import { InsightDetailView } from './views/InsightDetailView';
import { ContactView } from './views/ContactView';
import { CareersView } from './views/CareersView';
import { JobDetailView } from './views/JobDetailView';
import { CandidateDashboardView } from './views/CandidateDashboardView';
import { CandidateProfileView } from './views/CandidateProfileView';
import { RecruiterDashboardView } from './views/RecruiterDashboardView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';
import { ForgotPasswordView } from './views/ForgotPasswordView';
import { ResetPasswordView } from './views/ResetPasswordView';
import { VerifyEmailView } from './views/VerifyEmailView';
import { ProtectedRoute } from './components/ProtectedRoute';

// Templates & Content Registries
import { SolutionPageTemplate } from './components/templates/SolutionPageTemplate';
import { solutionDetailsMap } from './content/solutionDetails';
import { IndustryPageTemplate } from './components/templates/IndustryPageTemplate';
import { industriesContent } from './content/industries';
import { caseStudiesList } from './content/caseStudies';
import { insightsList } from './content/insights';

function AppContent() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderView = () => {
    // 1. Home
    if (currentPath === '/' || currentPath === '') {
      return <HomeView onNavigate={handleNavigate} />;
    }

    // 2. Solutions Landing & Dynamic Detail Pages (8 practices)
    if (currentPath === '/solutions') {
      return <SolutionsView onNavigate={handleNavigate} />;
    }
    if (currentPath.startsWith('/solutions/')) {
      const rawSlug = currentPath.replace('/solutions/', '').trim();
      let normalizedSlug = rawSlug;
      if (rawSlug === 'cloud') normalizedSlug = 'cloud-devops';
      if (rawSlug === 'recruitment') normalizedSlug = 'recruitment-staffing';

      const solution = solutionDetailsMap[normalizedSlug];
      if (solution) {
        return <SolutionPageTemplate solution={solution} onNavigate={handleNavigate} />;
      }
      return <SolutionsView onNavigate={handleNavigate} />;
    }

    // 3. Industries Landing & Dynamic Detail Pages (8 sectors)
    if (currentPath === '/industries') {
      return <IndustriesView onNavigate={handleNavigate} />;
    }
    if (currentPath.startsWith('/industries/')) {
      const slug = currentPath.replace('/industries/', '').trim();
      const industry = industriesContent.find((i) => i.slug === slug);
      if (industry) {
        return <IndustryPageTemplate industry={industry} onNavigate={handleNavigate} />;
      }
      return <IndustriesView onNavigate={handleNavigate} />;
    }

    // 4. Case Studies Landing & Dynamic Detail Pages
    if (currentPath === '/case-studies') {
      return <CaseStudiesView onNavigate={handleNavigate} />;
    }
    if (currentPath.startsWith('/case-studies/')) {
      const slug = currentPath.replace('/case-studies/', '').trim();
      const caseStudy = caseStudiesList.find((c) => c.slug === slug);
      if (caseStudy) {
        return <CaseStudyDetailView caseStudy={caseStudy} onNavigate={handleNavigate} />;
      }
      return <CaseStudiesView onNavigate={handleNavigate} />;
    }

    // 5. About
    if (currentPath === '/about') {
      return <AboutView onNavigate={handleNavigate} />;
    }

    // 6. Insights Landing & Dynamic Detail Pages
    if (currentPath === '/insights') {
      return <InsightsView onNavigate={handleNavigate} />;
    }
    if (currentPath.startsWith('/insights/')) {
      const slug = currentPath.replace('/insights/', '').trim();
      const insight = insightsList.find((i) => i.slug === slug);
      if (insight) {
        return <InsightDetailView insight={insight} onNavigate={handleNavigate} />;
      }
      return <InsightsView onNavigate={handleNavigate} />;
    }

    // 7. Contact
    if (currentPath === '/contact') {
      return <ContactView onNavigate={handleNavigate} />;
    }

    // 8. Authentication & Account Management
    if (currentPath.startsWith('/login')) {
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get('redirect') || undefined;
      return <LoginView onNavigate={handleNavigate} redirectUrl={redirect} />;
    }
    if (currentPath === '/register') {
      return <RegisterView onNavigate={handleNavigate} />;
    }
    if (currentPath === '/forgot-password') {
      return <ForgotPasswordView onNavigate={handleNavigate} />;
    }
    if (currentPath.startsWith('/reset-password')) {
      return <ResetPasswordView onNavigate={handleNavigate} />;
    }
    if (currentPath.startsWith('/verify-email')) {
      return <VerifyEmailView onNavigate={handleNavigate} />;
    }

    // 9. Careers & Talent Ecosystem
    if (currentPath === '/careers') {
      return <CareersView onNavigate={handleNavigate} />;
    }
    if (currentPath.startsWith('/jobs/')) {
      const slug = currentPath.replace('/jobs/', '').trim();
      return <JobDetailView slug={slug} onNavigate={handleNavigate} />;
    }
    if (currentPath === '/candidate/dashboard') {
      return (
        <ProtectedRoute allowedRoles={['candidate', 'super_admin']} currentPath={currentPath} onNavigate={handleNavigate}>
          <CandidateDashboardView onNavigate={handleNavigate} />
        </ProtectedRoute>
      );
    }
    if (currentPath === '/candidate/profile') {
      return (
        <ProtectedRoute allowedRoles={['candidate', 'super_admin']} currentPath={currentPath} onNavigate={handleNavigate}>
          <CandidateProfileView onNavigate={handleNavigate} />
        </ProtectedRoute>
      );
    }
    if (currentPath === '/recruiter') {
      return (
        <ProtectedRoute
          allowedRoles={['recruiter', 'hr_manager', 'admin', 'super_admin']}
          currentPath={currentPath}
          onNavigate={handleNavigate}
        >
          <RecruiterDashboardView onNavigate={handleNavigate} />
        </ProtectedRoute>
      );
    }
    if (currentPath.startsWith('/admin')) {
      return (
        <ProtectedRoute
          allowedRoles={['admin', 'super_admin', 'hr_manager']}
          currentPath={currentPath}
          onNavigate={handleNavigate}
        >
          <AdminDashboardView onNavigate={handleNavigate} />
        </ProtectedRoute>
      );
    }

    // Fallback to Home
    return <HomeView onNavigate={handleNavigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFC] text-[#0F172A] font-sans antialiased selection:bg-sky-500/20 selection:text-sky-900">
      <Navbar currentPath={currentPath} onNavigate={handleNavigate} />
      <main className="flex-1">
        {renderView()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
