(function () {
  const mount = document.querySelector("[data-sales-center-topbar]");
  if (!mount) return;

  const module = mount.getAttribute("data-topbar-module") || "sales";
  const fileName =
    window.location.pathname.split("/").pop() || "sales-center.html";
  const MODULE_CONFIG = {
    sales: {
      defaultPage: "staff",
      role: "業務主管",
      pages: {
        "sales-center.html": "staff",
        "customer-assignment.html": "assignment",
        "personal-sales-funnel.html": "funnel",
      },
      items: [
        { page: "staff", href: "sales-center.html", label: "業務人員管理" },
        {
          page: "assignment",
          href: "customer-assignment.html",
          label: "客戶分配",
        },
        {
          page: "funnel",
          href: "personal-sales-funnel.html",
          label: "銷售漏斗分析",
        },
      ],
    },
    accounting: {
      defaultPage: "accounting",
      role: "財務主管",
      pages: {
        "accounting-management.html": "accounting",
        "procurement-management.html": "procurement",
      },
      items: [
        {
          page: "accounting",
          href: "accounting-management.html",
          label: "會計記錄",
        },
        {
          page: "procurement",
          href: "procurement-management.html",
          label: "採購管理",
        },
      ],
    },
  };

  const config = MODULE_CONFIG[module] || MODULE_CONFIG.sales;
  const activePage = config.pages[fileName] || config.defaultPage;
  const userRole = mount.getAttribute("data-topbar-role") || config.role;
  const userName = mount.getAttribute("data-topbar-user") || "王大明";

  const mode = mount.getAttribute("data-sales-center-topbar");
  const headerClass =
    mode === "fixed"
      ? "h-[70px] fixed top-0 right-0 left-[280px] bg-sidebar-bg border-b border-primary-container z-10 flex justify-between items-center px-margin-desktop w-[calc(100%-280px)] shadow-[0_8px_20px_-12px_rgba(20,8,4,0.45)]"
      : "h-[70px] bg-sidebar-bg border-b border-primary-container flex items-center justify-between px-margin-desktop w-full shrink-0 z-40 shadow-[0_8px_20px_-12px_rgba(20,8,4,0.45)]";

  const activeClass =
    "flex items-center h-full text-on-primary font-bold border-b-2 border-gold-accent pb-1 font-label-md text-label-md";
  const inactiveClass =
    "flex items-center h-full text-on-primary-container hover:text-gold-accent transition-colors font-label-md text-label-md cursor-pointer active:scale-95 border-b-2 border-transparent";

  const linkClass = (page) =>
    activePage === page ? activeClass : inactiveClass;

  const navMarkup = config.items
    .map(
      ({ page, href, label }) =>
        `<a class="${linkClass(page)}" href="${href}">${label}</a>`,
    )
    .join("");

  mount.outerHTML = `
    <header class="${headerClass}">
      <div class="flex items-center gap-8 h-full">
        <nav class="flex h-full gap-8">
          ${navMarkup}
        </nav>
      </div>
      <div class="ml-auto flex items-center justify-end gap-4">
        <button class="text-on-primary-container hover:text-gold-accent transition-colors p-2 rounded-full hover:bg-primary-container relative">
          <span class="material-symbols-outlined" data-icon="notifications">notifications</span>
          <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
        </button>
        <button class="text-on-primary-container hover:text-gold-accent transition-colors p-2 rounded-full hover:bg-primary-container">
          <span class="material-symbols-outlined" data-icon="settings">settings</span>
        </button>
        <div class="h-8 w-px bg-primary-container"></div>
        <div class="flex items-center gap-3">
          <img
            alt="使用者頭像"
            class="w-10 h-10 rounded-full object-cover border border-primary-container"
            src="../../assets/images/avatar-default.jpg"
          />
          <div class="text-left hidden md:block">
            <p class="font-label-md text-label-md text-on-primary">${userName}</p>
            <p class="font-label-sm text-label-sm text-on-primary-container">${userRole}</p>
          </div>
        </div>
      </div>
    </header>
  `;
})();
