import { createControlComponentConfig, KoStandaloneControl } from '../control-base.js';
class AmeStaticHtml extends KoStandaloneControl {
    constructor(params, $element) {
        super(params, $element);
        this.containerType = 'span';
        this.htmlContent = (typeof params.html === 'string') ? params.html : '';
        if (typeof params.container === 'string') {
            this.containerType = params.container;
        }
    }
}
//Note: The HTML content has to be in a container element because Knockout doesn't allow
//using the "html" binding with virtual elements.
export default createControlComponentConfig(AmeStaticHtml, `
	<!-- ko if: containerType === 'div' -->
		<div data-bind="html: htmlContent"></div>
	<!-- /ko -->
	<!-- ko if: containerType === 'span' -->
		<span data-bind="html: htmlContent"></span>
	<!-- /ko -->
`);
//# sourceMappingURL=ame-static-html.js.map