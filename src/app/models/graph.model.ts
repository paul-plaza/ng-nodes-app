import { Edge, Node } from "@swimlane/ngx-graph/lib/models";

export class GraphModel {
    public nodes: Array<Node>;
    public links: Array<Edge>;
    public zoom: number;
    public pan = {
        x: 0, y: 0
    };

    constructor(params: {
        nodes?: Array<Node>,
        links?: Array<Edge>,
        zoom?: number,
    } = {}) {
        this.nodes = params.nodes || [];
        this.links = params.links || [];
        this.zoom = params.zoom || 1;
    }
}