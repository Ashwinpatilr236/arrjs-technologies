import Blog from '../components/Blog';
import Newsletter from '../components/Newsletter';
import PageHeader from '../components/PageHeader';

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog & Insights"
        title="Technology, AI & business"
        highlight="insights."
        subtitle="Practical guides on websites, AI, PC building, cloud and cyber security — written for businesses and individuals."
      />
      <Blog />
      <Newsletter />
    </>
  );
}
