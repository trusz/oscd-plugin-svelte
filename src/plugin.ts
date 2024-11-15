import Plugin from './plugin.svelte'
import * as pkg from "../package.json";
import { mount } from "svelte";

export default class NewOSCDPlugin extends HTMLElement {

	private plugin?: Plugin
	
	connectedCallback() {
		this.attachShadow({ mode: "open" });
		this.plugin = mount(Plugin, {
        			target: this.shadowRoot!,
        			props: {
        				doc: this._doc,
        				editCount: -1
        			}
        		});

		const linkElement = createStyleLinkElement()
		this.shadowRoot?.appendChild(linkElement)
	}

	private _doc?: XMLDocument
	public set doc(newDoc: XMLDocument){
		this._doc = newDoc
		if(!this.plugin) {
			return
		}

		this.plugin.$set({doc: newDoc})
	}

	public set editCount(newCount: number) {
		if (!this.plugin) {
			return
		}
		this.plugin.$set({ editCount: newCount })
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

