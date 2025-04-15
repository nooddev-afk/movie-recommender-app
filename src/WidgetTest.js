import React from 'react';

export default function WidgetTest() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <h1 className="text-3xl font-bold">🔧 Widget Test Page (Fallback)</h1>
      <p className="mt-4 text-zinc-400">Widget integration failed. We'll use the API directly instead.</p>
    </div>
  );
}
