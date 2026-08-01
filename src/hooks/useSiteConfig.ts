import { useState, useEffect } from 'react';
import { SiteConfig } from '../types';
import { DEFAULT_SITE_CONFIG } from '../data/config';

export function useSiteConfig(): SiteConfig {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('arrjs_site_config');
    if (saved) {
      try { return { ...DEFAULT_SITE_CONFIG, ...JSON.parse(saved) }; } catch (e) {}
    }
    return DEFAULT_SITE_CONFIG;
  });

  useEffect(() => {
    const handleUpdate = () => {
      const saved = localStorage.getItem('arrjs_site_config');
      if (saved) {
        try { setSiteConfig({ ...DEFAULT_SITE_CONFIG, ...JSON.parse(saved) }); } catch (e) {}
      }
    };

    window.addEventListener('arrjs_site_config_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('arrjs_site_config_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return siteConfig;
}
