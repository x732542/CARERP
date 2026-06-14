
        // ===== 客戶管理頁面的 HTML（點其他選單時會被取代，點回客戶管理時恢復） =====
        const customerPageHTML = document.getElementById("pageContent").innerHTML;

        // ===== Sidebar 選單切換邏輯 =====
        const menuItems = document.querySelectorAll(".menu-item");
        const pageContent = document.getElementById("pageContent");

        menuItems.forEach(item => {
            item.addEventListener("click", function () {

                // 取消所有 active
                menuItems.forEach(x => x.classList.remove("active"));

                // 給目前點擊的選單 active
                this.classList.add("active");

                const pageName = this.dataset.page;

                if (pageName === "客戶管理") {
                    // 切回客戶管理頁面時，還原完整內容
                    pageContent.innerHTML = customerPageHTML;
                } else {
                    // 其他頁面顯示佔位內容
                    pageContent.innerHTML = `
                        <div class="page-title">${pageName}</div>
                        <div class="card-box">
                            <p>這裡放置「${pageName}」功能內容</p>
                        </div>`;
                }
            });
        });