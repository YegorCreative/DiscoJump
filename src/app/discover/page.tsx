import type { Metadata } from 'next';
import DiscoverClient from './DiscoverClient';

export const metadata: Metadata = {
  title: 'Discover — Disco Jump',
  description: 'Explore restaurants, nightlife, adventures, cafés, and hidden gems near you.',
};

export default function DiscoverPage() {
  return <DiscoverClient />;
}
