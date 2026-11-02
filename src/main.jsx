import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { captureTrackingData } from "./utils/leadTracking";
import { initCmsTracker, cmsPageView } from './cms/tracker';
import { BrowserRouter } from "react-router-dom";
import "./styles/variables.css";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

const startCmsTracker = () => {
  initCmsTracker({ clicks: true });
  cmsPageView(window.location.pathname);
};
if ('requestIdleCallback' in window) window.requestIdleCallback(startCmsTracker, { timeout: 3000 });
else setTimeout(startCmsTracker, 1500);
