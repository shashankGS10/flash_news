const fetchLogo = async (url) => {
  try {
    console.warn(url)
    const response = await fetch(url);
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const ogImageTag = doc.querySelector('meta[property="og:image"]');
    return ogImageTag ? ogImageTag.content : null;
  } catch (error) {
    console.error('Error fetching logo:', error);
    return null;
  }
};