// Shared between the bar and the hero. It lives here rather than being exported
// from HeroCarousel because Nav renders on every page, and importing the
// carousel just to read a string would pull it and framer-motion into every
// bundle.
export const SHOW_BRAND_SLIDE = "audcomp:show-brand-slide";
