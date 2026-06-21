export type PortfolioCategory = 'Shorts' | 'Long-form' | 'Promos';

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  thumbnail: string;
  videoUrl: string;
  clientName: string;
}

export const portfolioData: PortfolioItem[] = [
  {
    id: "1",
    title: "Retention-Focused Short Form Edit",
    category: "Shorts",
    thumbnail: "/thumbnails/short video thumbnail.webp",
    videoUrl: "https://youtube.com/shorts/DEH1qJVWuQ0?feature=share",
    clientName: "Alex Hormozi Style Creator"
  },
  {
    id: "2",
    title: "High-End YouTube Documentary Style",
    category: "Long-form",
    thumbnail: "/thumbnails/long video thumbnail.webp",
    videoUrl: "https://youtu.be/PNrPifaYD6A",
    clientName: "Tech Insider Channel"
  },
  {
    id: "3",
    title: "Cinematic Product Promo Video",
    category: "Promos",
    thumbnail: "/thumbnails/product video thumbnail.webp",
    videoUrl: "https://youtu.be/YmL59RJldAg",
    clientName: "EcoFlow Tech Brand"
  }
];
