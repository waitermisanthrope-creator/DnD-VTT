// Автоматическая блокировка свайпов и прокрутки при открытии модальных окон.
// ВАЖНО: не ищем любой элемент со style="display:block" — обычные label/div
// с таким стилем не являются модалками и раньше могли оставлять весь body в
// touch-action:none, из-за чего Android WebView плохо обрабатывал нажатия.
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    function syncModalTouchLock() {
      var selectors = [
        '.modal.active',
        '.popup.active',
        '[role="dialog"][aria-hidden="false"]',
        '[data-modal-active="true"]',
        '[id$="Modal"]',
        '[id$="modal"]'
      ].join(',');

      var nodes = document.querySelectorAll(selectors);
      var hasActiveModal = false;

      for (var i = 0; i < nodes.length; i++) {
        var el = nodes[i];
        if (!el || !document.body.contains(el)) continue;
        var style = window.getComputedStyle(el);
        if (style.display !== 'none' && style.visibility !== 'hidden' && parseFloat(style.opacity || '1') > 0) {
          hasActiveModal = true;
          break;
        }
      }

      document.body.classList.toggle('modal-open', hasActiveModal);
    }

    var observer = new MutationObserver(syncModalTouchLock);
    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ['style', 'class', 'aria-hidden']
    });

    syncModalTouchLock();
  });
})();
