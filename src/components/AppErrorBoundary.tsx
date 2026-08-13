import React from 'react';

interface AppErrorBoundaryState {
  hasError: boolean;
}

export class AppErrorBoundary extends React.Component<React.PropsWithChildren, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('Website startup error:', error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main style={{ minHeight: '100vh', background: '#030712', color: '#fff', display: 'grid', placeItems: 'center', padding: 24, fontFamily: 'Arial, sans-serif' }}>
        <section style={{ maxWidth: 620, textAlign: 'center', border: '1px solid #334155', borderRadius: 20, padding: 32, background: '#0f172a' }}>
          <h1 style={{ marginTop: 0 }}>The local website could not start</h1>
          <p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>Close this browser tab and the launcher window, then run <strong>RUN_WEBSITE.bat</strong> again. If this message remains, delete the <strong>node_modules</strong> folder first so the launcher can reinstall the website packages.</p>
          <button onClick={() => window.location.reload()} style={{ border: 0, borderRadius: 999, padding: '12px 22px', background: '#22d3ee', color: '#082f49', fontWeight: 700, cursor: 'pointer' }}>Reload website</button>
        </section>
      </main>
    );
  }
}
