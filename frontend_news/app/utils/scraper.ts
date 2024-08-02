// src/utils/scraper.ts
import axios from 'axios';
import cheerio from 'cheerio';

const MAX_IMAGE_SIZE_KB = 40; // Maximum size of the image in KB

export const scrapeLogo = async (websiteUrl: string): Promise<string | null> => {
  try {
    const response = await axios.get(websiteUrl);
    const html = response.data;
    const $ = cheerio.load(html);

    let logoUrl = '';

    // Check for common logo link rel values with PNG preference
    const logoSelectors = [
      'link[rel="apple-touch-icon"]',
      'link[rel="icon"]',
      'link[rel="shortcut icon"]',
      'link[rel="apple-touch-icon-precomposed"]',
      'link[rel="icon shortcut"]',
    ];

    // Prefer PNG files
    for (const selector of logoSelectors) {
      const logo = $(selector).attr('href');
      if (logo && logo.toLowerCase().endsWith('.png')) {
        logoUrl = logo;
        break;
      }
    }

    if (!logoUrl) {
      // Fallback to other common icons
      for (const selector of logoSelectors) {
        const logo = $(selector).attr('href');
        if (logo) {
          logoUrl = logo;
          break;
        }
      }
    }

    if (!logoUrl) {
      return null;
    }

    // If logo URL is relative, convert to absolute URL
    if (!logoUrl.startsWith('http')) {
      const url = new URL(websiteUrl);
      logoUrl = `${url.origin}${logoUrl}`;
    }

    // Check the size of the logo
    const logoResponse = await axios.head(logoUrl);
    const contentLength = parseInt(logoResponse.headers['content-length'], 10);
    if (contentLength > MAX_IMAGE_SIZE_KB * 1024) { // Ignore logos larger than 40 KB
      return null;
    }

    return logoUrl;
  } catch (error) {
    console.error('Error scraping logo:', error);
    return null;
  }
};
