type AdjacencyList = Map<string, NodeList>;
export type NodeList = Map<string, number>;

export class Graph {
	constructor() {
		//
	}

	/* ---------------------------------------------------------------------- */

	private adjacencyList: AdjacencyList = new Map();

	public get locations(): string[] {
		return [...this.adjacencyList.keys()];
	}

	/* ---------------------------------------------------------------------- */

	private createPath(source: string, destination: string, distance: number) {
		if (!this.adjacencyList.has(source)) {
			this.addNode(source);
		}

		const destinations = this.adjacencyList.get(source);
		destinations.set(destination, distance);
	}

	/* ---------------------------------------------------------------------- */

	public addEdge(source: string, destination: string, distance: number) {
		this.createPath(source, destination, distance);
		this.createPath(destination, source, distance);
	}

	public addNode(id: string) {
		this.adjacencyList.set(id, new Map());
	}

	public getDestinationsForLocation(location: string): NodeList {
		return this.adjacencyList.get(location);
	}

	public log() {
		console.log(this.adjacencyList);
	}
}
