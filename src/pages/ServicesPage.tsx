import Services from '../components/Services';
import Newsletter from '../components/Newsletter';
import PageHeader from '../components/PageHeader';

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What we do"
        title="Technology services"
        highlight="under one roof."
        subtitle="From custom PCs and websites to complete business setup, AI chatbots and IT support — everything your business needs to grow."
      />
      <Services />
      <Newsletter />
    </>
  );
}
