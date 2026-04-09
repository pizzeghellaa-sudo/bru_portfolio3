import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './index.css';

// HelmetProvider is wired automatically by vite-react-ssg:
//   - During SSG: it wraps the tree in <HelmetProvider context={helmetContext}>
//     and calls extractHelmet() to inject <title>, <meta>, <link>, <script> tags
//     directly into each route's static <head> before writing the HTML file.
//   - During client hydration: the same HelmetProvider is mounted via the
//     client-side ViteReactSSG wrapper, so <Helmet> calls keep working reactively.
// No manual HelmetProvider setup is required in this file or in RootLayout.tsx.
export const createRoot = ViteReactSSG(
  { routes },
  () => {},
);
