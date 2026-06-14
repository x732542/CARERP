(function () {
  const INACTIVE_LINK_CLASS =
    "flex items-center px-4 py-3 rounded text-outline-variant hover:text-on-primary hover:bg-primary-container transition-colors group";
  const ACTIVE_LINK_CLASS =
    "flex items-center px-4 py-3 rounded border-l-4 border-gold-accent text-on-primary font-bold bg-primary-container relative left-[-12px] pl-[28px] w-[calc(100%+12px)] transition-all";
  const INACTIVE_ICON_CLASS =
    "material-symbols-outlined mr-3 text-on-primary-container group-hover:text-gold-accent";
  const ACTIVE_ICON_CLASS = "material-symbols-outlined mr-3 text-gold-accent";

  const SIDEBAR_MARKUP = `
<!-- Sidebar Navigation -->
<aside
  class="fixed left-0 top-0 h-full w-[280px] bg-sidebar-bg z-40 flex flex-col shadow-lg transition-all duration-300 ease-in-out md:flex hidden"
>
  <!-- Logo -->
  <div class="px-6 py-8">
    <h1 class="font-headline-md text-headline-md font-bold text-on-primary">
      智富車庫 ERP
    </h1>
    <p
      class="font-label-md text-label-md text-on-primary-container mt-1 tracking-wider"
    >
      Automotive Management System
    </p>
  </div>

  <!-- Navigation -->
  <nav class="flex-1 mt-4 flex flex-col gap-1 px-3">
    <a data-sidebar-page="dashboard" data-sidebar-href="pages/dashboard/dashboard.html" href="../../pages/dashboard/dashboard.html">
      <span class="material-symbols-outlined">dashboard</span>
      <span class="font-label-md text-label-md">儀表板</span>
    </a>
    <a data-sidebar-page="vehicle" data-sidebar-href="pages/vehicle-management/vehicle-management.html" href="../../pages/vehicle-management/vehicle-management.html">
      <span class="material-symbols-outlined">directions_car</span>
      <span class="font-label-md text-label-md">車輛管理</span>
    </a>
    <a data-sidebar-page="customer" data-sidebar-href="pages/customer-management/customer-management.html" href="../../pages/customer-management/customer-management.html">
      <span class="material-symbols-outlined">group</span>
      <span class="font-label-md text-label-md">客戶管理</span>
    </a>
    <a data-sidebar-page="order" data-sidebar-href="pages/order-management/order-management.html" href="../../pages/order-management/order-management.html">
      <span class="material-symbols-outlined">receipt_long</span>
      <span class="font-label-md text-label-md">訂單管理</span>
    </a>
    <a data-sidebar-page="sales" data-sidebar-href="pages/sales-center/sales-center.html" href="../../pages/sales-center/sales-center.html">
      <span class="material-symbols-outlined">badge</span>
      <span class="font-label-md text-label-md">業務中心</span>
    </a>
    <a data-sidebar-page="accounting" data-sidebar-href="pages/accounting-management/accounting-management.html" href="../../pages/accounting-management/accounting-management.html">
      <span class="material-symbols-outlined">shopping_cart</span>
      <span class="font-label-md text-label-md">會計管理</span>
    </a>
    <a data-sidebar-page="registry" data-sidebar-href="pages/vehicle-registry/vehicle-registry.html" href="../../pages/vehicle-registry/vehicle-registry.html">
      <span class="material-symbols-outlined">credit_card</span>
      <span class="font-label-md text-label-md">車籍資料</span>
    </a>
    <a data-sidebar-page="document" data-sidebar-href="pages/document-management/document-management.html" href="../../pages/document-management/document-management.html">
      <span class="material-symbols-outlined">folder_open</span>
      <span class="font-label-md text-label-md">文件管理</span>
    </a>
  </nav>

  <!-- Footer -->
  <div class="p-6 border-t border-primary-container">
    <div class="text-on-primary-container text-xs space-y-1">
      <div>系統版本 v1.0.0</div>
      <div>智富車庫 Automotive ERP</div>
    </div>
  </div>
</aside>`;

  const script = document.currentScript;
  const scriptUrl = new URL(script.src, window.location.href);
  const rootUrl = new URL("../../", scriptUrl);

  function resolvePageUrl(path) {
    return new URL(path, rootUrl).href;
  }

  function inferCurrentPage() {
    const path = window.location.pathname.replace(/\\/g, "/").toLowerCase();
    const filename = path.split("/").pop() || "";

    const exactMatches = {
      "dashboard.html": "dashboard",
      "vehicle-management.html": "vehicle",
      "customer-management.html": "customer",
      "order-management.html": "order",
      "sales-center.html": "sales",
      "accounting-management.html": "accounting",
      "document-management.html": "document",
      "vehicle-registry.html": "registry",
    };

    if (exactMatches[filename]) {
      return exactMatches[filename];
    }

    if (path.includes("/dashboard/")) return "dashboard";
    if (path.includes("/vehicle-management/")) return "vehicle";
    if (path.includes("/customer-management/")) return "customer";
    if (path.includes("/order-management/")) return "order";
    if (path.includes("/sales-center/")) return "sales";
    if (path.includes("/accounting-management/")) return "accounting";
    if (path.includes("/document-management/")) return "document";
    if (path.includes("/vehicle-registry/")) return "registry";

    return "";
  }

  function applyActiveState(container) {
    const currentPage =
      inferCurrentPage() ||
      window.currentPage ||
      container.dataset.currentPage ||
      "";

    container.querySelectorAll("[data-sidebar-page]").forEach((link) => {
      const icon = link.querySelector(".material-symbols-outlined");
      const isActive = link.dataset.sidebarPage === currentPage;

      link.className = isActive ? ACTIVE_LINK_CLASS : INACTIVE_LINK_CLASS;
      link.href = resolvePageUrl(link.dataset.sidebarHref);

      if (icon) {
        icon.className = isActive ? ACTIVE_ICON_CLASS : INACTIVE_ICON_CLASS;
        if (isActive) {
          icon.style.fontVariationSettings = '"FILL" 1';
        } else {
          icon.style.removeProperty("font-variation-settings");
        }
      }
    });
  }

  function mountSidebar(markup) {
    document.querySelectorAll("[data-sidebar]").forEach((container) => {
      container.innerHTML = markup;
      applyActiveState(container);
    });
  }

  mountSidebar(SIDEBAR_MARKUP);
})();
