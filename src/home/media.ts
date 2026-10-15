export type ImageAsset = {
  src: string;
  width: number;
  height: number;
};

const homeMedia = '/media/home';

export const logoImage: ImageAsset = { src: `${homeMedia}/logo.webp`, width: 160, height: 150 };
export const whatsappBadgeImage: ImageAsset = { src: `${homeMedia}/whatsapp-badge.webp`, width: 120, height: 120 };
export const heroImage: ImageAsset = { src: `${homeMedia}/hero.webp`, width: 640, height: 360 };
export const imacFrameImage: ImageAsset = { src: `${homeMedia}/imac-frame.webp`, width: 612, height: 408 };
export const desktopFrameImage: ImageAsset = { src: `${homeMedia}/desktop-frame.webp`, width: 640, height: 378 };

// PI! NEED DATA: client name for each logo (used as alt text)
export const clientLogos: readonly ImageAsset[] = [
  { src: `${homeMedia}/client-logo-1.webp`, width: 360, height: 312 },
  { src: `${homeMedia}/client-logo-2.webp`, width: 360, height: 164 },
  { src: `${homeMedia}/client-logo-3.webp`, width: 360, height: 94 },
  { src: `${homeMedia}/client-logo-4.webp`, width: 360, height: 288 },
  { src: `${homeMedia}/client-logo-5.webp`, width: 360, height: 360 },
  { src: `${homeMedia}/client-logo-6.webp`, width: 360, height: 358 },
  { src: `${homeMedia}/client-logo-7.webp`, width: 360, height: 346 },
  { src: `${homeMedia}/client-logo-8.webp`, width: 360, height: 182 },
];

export type VideoAsset = {
  src: string;
  poster: string;
  width: number;
  height: number;
};

export const portfolioVideos = {
  alixerErp: { src: `${homeMedia}/alixer-perfume-erp.mp4`, poster: `${homeMedia}/alixer-perfume-erp-poster.webp`, width: 960, height: 446 },
  premioCrm: { src: `${homeMedia}/premio-crm-preview.mp4`, poster: `${homeMedia}/premio-crm-preview-poster.webp`, width: 1280, height: 670 },
  permioInventory: { src: `${homeMedia}/permio-inventory-preview.mp4`, poster: `${homeMedia}/permio-inventory-preview-poster.webp`, width: 1276, height: 720 },
  myFitnessCoach: { src: `${homeMedia}/myfitnesscoach-preview.mp4`, poster: `${homeMedia}/myfitnesscoach-preview-poster.webp`, width: 432, height: 782 },
} as const satisfies Record<string, VideoAsset>;
