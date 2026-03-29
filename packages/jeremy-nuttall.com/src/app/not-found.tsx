'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col text-center">
        <div className="w-40 h-40" aria-hidden="true">
          <DotLottieReact src="/static/cat-fishing.lottie" loop autoplay />
        </div>
        <h2 className="text-2xl font-mono font-bold text-base-content/90">404</h2>
        <p className="text-base-content/60 max-w-xs">Maybe the cat stole it.</p>
        <Link href="/" className="btn btn-ghost text-base-content/60 hover:text-base-content">
          Go home
        </Link>
      </div>
    </div>
  );
}
