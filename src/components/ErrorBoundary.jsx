import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught application error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#faf9f5]">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-2xl mb-4">
            !
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#1e5e3a] mb-2">
            Something went wrong
          </h1>
          <p className="text-sm text-slate-600 mb-6 max-w-md">
            An unexpected error occurred in the application. Please reload the page or return to the storefront.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.href = "/";
            }}
            className="bg-[#1e5e3a] hover:bg-[#15462a] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all cursor-pointer"
          >
            Return to Storefront
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
