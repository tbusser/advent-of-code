type AdjacencyList = Map<string, WeightMap>;
export type WeightMap = Map<string, number>;

/* ========================================================================== */

type GraphType = 'directed' | 'undirected';

/* ========================================================================== */


export class Graph {
	constructor(public readonly graphType: GraphType) {
		// Intentionally left empty.
	}

	/* ---------------------------------------------------------------------- */

	private adjacencyList: AdjacencyList = new Map();

	public get nodes(): string[] {
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
		if (this.graphType === 'undirected') {
			this.createPath(destination, source, distance);
		}
	}

	public addNode(id: string) {
		this.adjacencyList.set(id, new Map());
	}

	public getAdjacentNodes(location: string): WeightMap {
		return this.adjacencyList.get(location);
	}

	public log() {
		console.log(this.adjacencyList);
	}
}
