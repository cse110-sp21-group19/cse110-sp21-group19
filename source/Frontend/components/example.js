// <example> custom web component
class ExampleElement extends HTMLElement {
	constructor() {
		super();

		// templated HTML content
		const template = document.createElement("template");

		template.innerHTML = `
			<div id="example-component"></div>
			`;

		// do stuff here
		const hello = document.createElement("p");
		hello.innerHTML = "Hello World";

		// create a shadow root for this web component
		const shadow = this.attachShadow({ mode: "open" });
		// attach cloned content of template to shadow DOM 
		this.shadowRoot.appendChild(template.content.cloneNode(true));

		// Apply external styles to the shadow dom
		const linkElem = document.createElement("link");
		linkElem.setAttribute("rel", "stylesheet");
		// NOTE: it's important that you do NOT include the slash before "style/css/..."
		linkElem.setAttribute("href", "style/css/example.css");

		// Attach the created elements to the shadow dom
		shadow.appendChild(linkElem);
		shadow.appendChild(hello);
	}
}
// Define a custom element for the BulletSelect web component
customElements.define("example-element", ExampleElement);