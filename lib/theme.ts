// The theme: light or dark, chosen by the reader or by their system.
/**
 * Runs before the page paints, so a dark-theme reader never sees a flash of
 * the light theme: the saved choice, else the system's.
 */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})()`;
