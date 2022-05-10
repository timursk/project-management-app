import { Button } from '@mui/material';
import React from 'react';
import { FC, useState } from 'react';
import ErrorScreenWrapper from './ErrorScreenWrapper';
import i18n from '../../localization/i18n';
import ErrorScreen from './ErrorScreen';
interface ErrorBoundaryProps {
  children: React.ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }
  // Translation used according https://github.com/isaachinman/next-i18next/issues/515
  render() {
    if (this.state.hasError) {
      return <ErrorScreen onTryAgain={() => this.setState({ hasError: false })} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
