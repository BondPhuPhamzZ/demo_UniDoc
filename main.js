document.addEventListener('DOMContentLoaded', function() {
    
    // Khởi tạo Toast của Bootstrap
    const aiToastElement = document.getElementById('aiToast');
    const aiToast = new bootstrap.Toast(aiToastElement);
    const aiToastBody = document.getElementById('aiToastBody');

    // Bắt sự kiện click vào các nút AI Tóm tắt
    const aiButtons = document.querySelectorAll('.btn-ai-summary');
    
    aiButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Lấy id tài liệu (mock)
            const docId = this.getAttribute('data-doc');
            const docTitle = this.closest('.card-body').querySelector('.card-title').innerText;
            
            // Đổi state của nút
            const originalHtml = this.innerHTML;
            this.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Đang xử lý...';
            this.disabled = true;

            // Hiển thị Toast Loading
            aiToastBody.innerHTML = `Đang dùng Gemini phân tích tài liệu: <strong>${docTitle}</strong>...`;
            aiToast.show();

            // Giả lập gọi API AI mất 2 giây
            setTimeout(() => {
                // Phục hồi nút
                this.innerHTML = originalHtml;
                this.disabled = false;

                // Cập nhật Toast với kết quả giả lập
                aiToastBody.innerHTML = `
                    <div class="fw-bold mb-1">Tóm tắt: ${docTitle}</div>
                    <p class="small mb-0 text-muted">Tài liệu này bao gồm các kiến thức nền tảng quan trọng, các dạng bài tập thường gặp trong đề thi cuối kỳ và hướng dẫn giải chi tiết. Phù hợp để ôn tập cấp tốc.</p>
                `;
                aiToast.show();
            }, 2000);
        });
    });

    // Bắt sự kiện tìm kiếm
    const btnSearch = document.getElementById('btnSearch');
    const searchInput = document.getElementById('searchInput');

    btnSearch.addEventListener('click', function(e) {
        e.preventDefault();
        const query = searchInput.value.trim();
        if(query) {
            alert(`Tính năng tìm kiếm sẽ lọc kết quả cho từ khóa: "${query}" (sẽ implement ở phần Backend)`);
        } else {
            searchInput.focus();
        }
    });
});
