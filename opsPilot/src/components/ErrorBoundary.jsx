import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary caught", error);
    console.error(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong</h2>

          <button
            onClick={() =>
              this.setState({
                hasError: false,
              })
            }
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
