
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { SessionProvider } from "./context/SessionContext"; // ya da SessionProvider
import { useSession } from "./context/useSession";
import TabsLayout from "./layouts/TabsLayout";
import HomePage from "./pages/HomePage";
import ScannerPage from "./pages/ScannerPage";
import SignInPage from "./pages/SignInPage";

// 1. Sadece oturumu olanların girebileceği korumalı rota
function ProtectedRoutes() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return (
      <div style={loadingContainerStyle}>
        <Loader2 className="spin" size={36} color="#0f172a" />
      </div>
    );
  }

  // Oturum yoksa login sayfasına yönlendir
  return session ? <Outlet /> : <Navigate to="/login" replace />;
}

// 2. Oturumu açık olanların tekrar login sayfasına girmesini engelleyen rota
function PublicOnlyRoute() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return (
      <div style={loadingContainerStyle}>
        <Loader2 className="spin" size={36} color="#0f172a" />
      </div>
    );
  }

  // Oturum zaten varsa ana sayfaya yönlendir
  return !session ? <SignInPage /> : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          {/* Giriş Sayfası (Sadece oturumu olmayanlar görebilir) */}
          <Route path="/login" element={<PublicOnlyRoute />} />

          {/* Korumalı Alanlar (Oturum zorunlu) */}
          <Route element={<ProtectedRoutes />}>
            <Route element={<TabsLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/scan" element={<ScannerPage />} />
            </Route>
          </Route>

          {/* Eşleşmeyen tüm adresleri ana sayfaya yönlendir */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  );
}

const loadingContainerStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#ffffff",
};


