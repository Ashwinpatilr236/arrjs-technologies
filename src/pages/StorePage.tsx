import DigitalStore from '../components/DigitalStore';
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
      <Newsletter />
    </>
  );
}
