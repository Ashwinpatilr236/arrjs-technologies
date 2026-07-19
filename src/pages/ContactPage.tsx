import Contact from '../components/Contact';
import FAQ from '../components/FAQ';
import PageHeader from '../components/PageHeader';

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Let's build something"
        highlight="that works."
        subtitle="Tell us about your project or the problem you need solved. We reply within one business day with next steps."
      />
      <Contact />
      <FAQ />
    </>
  );
}
