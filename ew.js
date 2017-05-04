
(() => {
    'use strict';

    let displayTarget;
    let observeTarget;
    const observeSettings = {
        childList: true,
        subtree: true,
    };

    const observer = new MutationObserver(() => {
        const stats = calculateStats(observeTarget.textContent);
        const summary = "Words: " + stats.wordAmount + ", " + "Characters: " + stats.charactersAmount;
        displayTarget.dataset.ewStats = summary;
    });

    function getEditor() {
        const iframe = document.querySelector('iframe[name$="common-editor-iframe"]');
        if (iframe && iframe.contentWindow.document) {
            return iframe.contentWindow.document.querySelector('div[contenteditable]');
        } else {
            return null;
        }
    }

    function tryObserve() {
        observeTarget = getEditor();
        if (observeTarget) {
            displayTarget = document.querySelector('input[id$="NoteTitleView-textBox"]').parentNode;
            observer.observe(observeTarget, observeSettings);
        } else {
            setTimeout(tryObserve, 150);
        }
    }

    tryObserve();

    console.log("Executing");
})();