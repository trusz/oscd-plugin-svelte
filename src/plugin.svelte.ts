import Plugin from './plugin.svelte'
import * as pkg from "../package.json";
import { mount } from "svelte";

export default class NewOSCDPlugin extends HTMLElement {
	
	private props = $state<{
		doc: XMLDocument | undefined,
		editCount: number,
	}>({
		doc: undefined,
		editCount: -1,
	});

	
	connectedCallback() {
		this.attachShadow({ mode: "open" });
		mount(
			Plugin, 
			{ 
				target: this.shadowRoot!,
				props: this.props,
			}
		)
		const linkElement = createStyleLinkElement()
		this.shadowRoot?.appendChild(linkElement)
	}

	public set doc(newDoc: XMLDocument){
		this.props.doc = newDoc
	}

	public set editCount(newCount: number) {
		this.props.editCount = newCount
	}

}

function createStyleLinkElement(): HTMLElement{
	const id = `${pkg.name}-v${pkg.version}-style`
	const stylePath = generateStylePath()

	const linkElement = document.createElement("link")
	linkElement.rel = "stylesheet"
	linkElement.type = "text/css"
	linkElement.href = stylePath
	linkElement.id = id

	return linkElement
}

function generateStylePath(): string {
	const srcUrl = new URL(import.meta.url)
	const origin = srcUrl.origin
	const path = srcUrl.pathname.split("/").slice(0,-1).filter(Boolean).join("/")
	const stylePath = [origin, path, "style.css"].filter(Boolean).join("/")
	
	return stylePath
}

