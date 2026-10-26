export const THEME_STORAGE_KEY = "theme";

// Runs in <head> before first paint, so a saved choice never flashes the other theme. It also
// marks the page as scripted (html.js), so scroll reveals only hide content when JS will show it.
export const themeInitScript = `(function(){var d=document.documentElement;d.classList.add("js");try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")d.dataset.theme=t;}catch(e){}})();`;
