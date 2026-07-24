import DigitalStore from '../components/DigitalStore';
import Blog from '../components/Blog';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Newsletter from '../components/Newsletter';
import PageHeader from '../components/PageHeader';

export default function StorePage() {
  return (
    <>
      <PageHeader
        eyebrow="Digital Store"
        title="Premium templates"
        highlight="& digital products."
        subtitle="Instant download, secure checkout, lifetime updates. Excel templates, React & Next.js starter kits, Notion workspaces, AI prompt packs and more."
      />
      <DigitalStore />
      <Blog />
      <Testimonials />
      <FAQ />
      <Newsletter />
    </>
  );
}
