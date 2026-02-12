const plugin = (mermaidConf) => (hook) => {

    hook.afterEach((html, next) => {
        // We load the HTML inside a DOM node to allow for manipulation
        const htmlElement = document.createElement('div');
        htmlElement.innerHTML = html;

        htmlElement.querySelectorAll('pre[data-lang=mermaid]').forEach((element) => {
            // Create a <div class="mermaid"> to replace the <pre> 
            const replacement = document.createElement('div');
            replacement.textContent = element.textContent;
            replacement.classList.add('mermaid');

            // Replace
            element.parentNode.replaceChild(replacement, element);
        });

        next(htmlElement.innerHTML);
    });

    hook.doneEach(() => {
        if (typeof mermaid.run === 'function') {
            // mermaid.run() is the v10+ API (requires ESM import)
            mermaid.run(mermaidConf);
        } else {
            // mermaid.init() is the v9 API (works with regular <script> tags)
            mermaid.init(undefined, mermaidConf.querySelector || '.mermaid');
        }
    });

};

export default plugin;
