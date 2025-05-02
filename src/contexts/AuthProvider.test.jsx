import { describe, test, expect, jest, afterEach } from "vitest";
import React from "react";
import { render, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "./AuthProvider";
import { onAuthStateChanged } from "firebase/auth";

// Mock Firebase
jest.mock("firebase/auth", () => {
  return {
    onAuthStateChanged: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    sendPasswordResetEmail: jest.fn(),
  };
});

const TestComponent = () => {
  const { currentUser } = useAuth();
  return <div>{currentUser ? currentUser.email : "No user"}</div>;
};

describe("AuthProvider", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render children when loading is complete with null user", async () => {
    const mockUnsubscribe = jest.fn();
    onAuthStateChanged.mockImplementation((_, callback) => {
      callback(null); // Simulate no user
      return mockUnsubscribe;
    });

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => getByText("No user"));
  });

  test("should unsubscribe on unmount", () => {
    const mockUnsubscribe = jest.fn();
    onAuthStateChanged.mockImplementation((_, callback) => {
      callback(null);
      return mockUnsubscribe;
    });

    const { unmount } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    unmount();
    expect(mockUnsubscribe).toHaveBeenCalled();
  });
});
