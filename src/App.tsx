import { RouterProvider, useRouter } from './lib/router';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import CookieConsent from './components/CookieConsent';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import StorePage from './pages/StorePage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

function Routes() {
  const { path } = useRouter();
  let Page = Home;
  if (path === '/') Page = Home;
  else if (path.startsWith('/admin')) Page = AdminPage;
  else if (path.startsWith('/services')) Page = ServicesPage;
  else if (path.startsWith('/store')) Page = StorePage;
  else if (path.startsWith('/portfolio')) Page = PortfolioPage;
  else if (path.startsWith('/about')) Page = AboutPage;
  else if (path === '/blog') Page = BlogPage;
  else if (path.startsWith('/blog/')) Page = BlogPostPage;
  else if (path.startsWith('/contact')) Page = ContactPage;

  return <Page />;
}

export default function App() {
  const { path } = useRouter();
  const isAdmin = path.startsWith('/admin');

  return (
    <RouterProvider>
      <div className="relative min-h-screen overflow-x-hidden">
        <AnimatedBackground />
        {!isAdmin && <Navbar />}
        <main>
          <Routes />
        </main>
        {!isAdmin && <Footer />}
        {!isAdmin && <WhatsAppFloat />}
        {!isAdmin && <CookieConsent />}
      </div>
    </RouterProvider>
  );
}
