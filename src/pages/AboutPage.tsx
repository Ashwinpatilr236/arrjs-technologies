import About from '../components/About';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Newsletter from '../components/Newsletter';
import PageHeader from '../components/PageHeader';

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About ARRJS"
        title="Building Technology That"
        highlight="Works For Everyone."
        subtitle="A Vadodara-based technology solutions company serving individuals, businesses, gamers, doctors, schools, startups and shops — on-site and remotely across India."
      />
      <About />
      <Testimonials />
      <FAQ />
      <Newsletter />
    </>
  );
}
