// Автоматическая блокировка свайпов и прокрутки при открытии модальных окон
document.addEventListener("DOMContentLoaded", () => {
    const observer = new MutationObserver(() => {
        // Ищем открытые модалки, попапы или выпадающие списки (настрой селекторы под свои элементы)
        const openModals = document.querySelectorAll('.modal.active, .popup.active, [style*="display: block"]'); 
        
        const hasActiveModal = Array.from(openModals).some(el => {
            return el.id !== 'characterSelectScreen' && window.getComputedStyle(el).display === 'block';
        });

        if (hasActiveModal) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    });

    observer.observe(document.body, { attributes: true, childList: true, subtree: true, attributeFilter: ['style', 'class'] });
});
