import React, { Component } from 'react';

interface IState {
  error: Error | null;
}

interface IProps {
  children: JSX.Element;
}

class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (!error) {
      return children;
    }

    return (
      <section>
        <h1>Error</h1>
        <p>{error?.message}</p>
      </section>
    );
  }
}

export default ErrorBoundary;
