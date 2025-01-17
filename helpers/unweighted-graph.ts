type AdjacencyList = Map<string, string[]>;

/* ========================================================================== */

type GraphType = 'directed' | 'undirected';

/* ========================================================================== */


export class UnweightedGraph {
	constructor(public readonly graphType: GraphType) {
		// Intentionally left empty.
	}

	/* ---------------------------------------------------------------------- */

	private adjacencyList: AdjacencyList = new Map();

	public get nodes(): string[] {
		return [...this.adjacencyList.keys()];
	}

	/* ---------------------------------------------------------------------- */

	private createPath(source: string, destination: string) {
		if (!this.adjacencyList.has(source)) {
			this.addNode(source);
		}

		const destinations = this.adjacencyList.get(source);
		destinations.push(destination);
	}

	/* ---------------------------------------------------------------------- */

	public addEdge(source: string, destination: string) {
		this.createPath(source, destination);
		if (this.graphType === 'undirected') {
			this.createPath(destination, source);
		}
	}

	public addNode(id: string) {
		this.adjacencyList.set(id, []);
	}

	public getAdjacentNodes(location: string): string[] {
		return this.adjacencyList.get(location);
	}

	public log() {
		console.log(this.adjacencyList);
	}
}
