"use client";

import { useEffect } from "react";

import EmptyState from "./components/EmptyState";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title="Oh Ooo" subtitle="Something has gone wrong" />;
};

export default ErrorState;
