import { Outlet, NavLink } from "react-router-dom";
import { Home, QrCode } from "lucide-react";
import "../css/TabsLayout.css";

export default function TabsLayout() {
  return (
    <div className="tabs-container">
      {/* Aktif rota içeriğinin gösterileceği alan */}
      <main className="tabs-content">
        <Outlet />
      </main>

      {/* Alt Sekme Barı (Bottom Navigation Bar) */}
      <nav className="bottom-nav-bar">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `tab-item ${isActive ? "tab-item-active" : "tab-item-inactive"}`
          }
        >
          <Home size={22} className="tab-icon" />
          <span className="tab-label">Ana Sayfa</span>
        </NavLink>

        <NavLink
          to="/scan"
          className={({ isActive }) =>
            `tab-item ${isActive ? "tab-item-active" : "tab-item-inactive"}`
          }
        >
          <QrCode size={22} className="tab-icon" />
          <span className="tab-label">QR Kod</span>
        </NavLink>
      </nav>
    </div>
  );
}