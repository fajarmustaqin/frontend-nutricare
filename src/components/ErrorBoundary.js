import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('❌ Error caught by Error Boundary:', error);
    console.error('📄 Error info:', errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card border-danger">
                <div className="card-header bg-danger text-white">
                  <h5 className="mb-0">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    Oops! Something went wrong
                  </h5>
                </div>
                <div className="card-body">
                  <p className="text-muted mb-4">
                    Aplikasi mengalami error. Silakan refresh halaman atau hubungi administrator.
                  </p>
                  
                  {process.env.NODE_ENV === 'development' && (
                    <div className="alert alert-warning">
                      <h6 className="fw-bold">Error Details (Development Mode):</h6>
                      <pre className="mb-0" style={{ fontSize: '12px', maxHeight: '200px', overflow: 'auto' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo && this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}

                  <div className="d-flex gap-2">
                    <button 
                      className="btn btn-primary"
                      onClick={() => window.location.reload()}
                    >
                      <i className="fas fa-redo me-2"></i>
                      Refresh Halaman
                    </button>
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={() => window.location.href = '/'}
                    >
                      <i className="fas fa-home me-2"></i>
                      Kembali ke Home
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
