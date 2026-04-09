import { Navigate } from 'react-router-dom';
import type { RouteRecord } from 'vite-react-ssg';
import RootLayout from './layouts/RootLayout';
import IndexSection from './sections/IndexSection';
import TimelineSection from './sections/TimelineSection';
import CapabilitiesSection from './sections/CapabilitiesSection';
import WorkSection from './sections/WorkSection';
import ProjectDetail from './sections/ProjectDetail';
import SignalSection from './sections/SignalSection';

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Navigate to="/en/" replace />,
  },
  {
    path: '/:lang',
    element: <RootLayout />,
    children: [
      { path: '', element: <IndexSection /> },
      { path: 'experience', element: <TimelineSection /> },
      { path: 'capabilities', element: <CapabilitiesSection /> },
      { path: 'selected-works', element: <WorkSection /> },
      { path: 'selected-works/:slug', element: <ProjectDetail /> },
      { path: 'contact', element: <SignalSection /> },
    ],
  },
];
