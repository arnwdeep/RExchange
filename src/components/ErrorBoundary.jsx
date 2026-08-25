import React, { Component } from 'react';
import { ShieldCheck, RefreshCw } from 'lucide-react';

/**
 * ErrorBoundary Component
 * Prevents application crashes and renders an audit-compliant fallback UI.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('RExchange Runtime Error Caught:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center select-none font-sans">
          <div className="border-2 border-[#FF4F00] bg-zinc-950 p-8 rounded-3xl max-w-md w-full space-y-4 shadow-2xl">
            <div className="w-16 h-16 bg-[#FF4F00]/20 rounded-full flex items-center justify-center mx-auto text-[#FF4F00]">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-xl font-black uppercase font-helvetica text-white">REXCHANGE® SECURITY SAFEGUARD</h1>
            <p className="text-xs text-zinc-400 font-mono-code">
              A minor client error occurred. Your campus security passport and listings remain 100% safe.
            </p>
            <button
              onClick={this.handleReload}
              className="w-full py-3 bg-[#FF4F00] text-black font-mono-code font-black text-xs uppercase rounded-xl hover:bg-white transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload RExchange Platform</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
