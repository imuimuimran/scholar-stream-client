<Route
  path="/dashboard"
  element={
    <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>
  }
/>