'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function ErrorPage({ unstable_retry }: { unstable_retry: () => void }) {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col text-center">
        <div className="w-40 h-40" aria-hidden="true">
          <DotLottieReact src="/static/cat-fishing.lottie" loop autoplay />
        </div>
        <h2 className="text-2xl font-mono font-bold text-base-content/90">Something went wrong</h2>
        <p className="text-base-content/60 max-w-xs">The cat may or may not be involved.</p>
        <button
          type="button"
          onClick={() => {
            unstable_retry();
          }}
          className="btn btn-ghost text-base-content/60 hover:text-base-content"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
