import Portfolio from '../components/Portfolio';
import PageHeader from '../components/PageHeader';

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Projects that"
        highlight="delivered results."
        subtitle="Website projects, business setups, custom PC builds and client success stories from across Vadodara and beyond."
      />
      <Portfolio />
    </>
  );
}
