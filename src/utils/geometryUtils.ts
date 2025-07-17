type Point = {
    x: number;
    y: number;
};

type Edge = [Point, Point];

export function isAngleMoreHorisontal(p1: Point, p2: Point): boolean {
    const dx = p2.x -p1.x;
    const dy = p2.y -p1.y;

    const magnitude = Math.sqrt(dx * dx + dy * dy);

    if(magnitude === 0) return true;

    const cosX = dx / magnitude;
    const cosY = dy / magnitude;

    return Math.abs(cosX) > Math.abs(cosY);
};

export function createEdges(points: Point[]) {
    const edges : Edge[] = [];
    const n = points.length;
    if(n < 2) return edges;
    for(let i = 0; i < n; i++){
        const start = points[i];
        const end = points[(i + 1) % n];
        edges.push([start, end]);
    }
    return edges;
};

function pointsEqual(p1: Point, p2: Point): boolean {
    return p1.x === p2.x && p1.y === p2.y;
};

function orientation(a: Point, b: Point, c: Point): number {
    const val = (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
    if(val === 0) return 0;
    return val > 0 ? 1 : 2;
};

function doProperlyIntersect(a1: Point, a2: Point, b1: Point, b2: Point): boolean {
    if(
        pointsEqual(a1, b1) || pointsEqual(a1, b2) ||
        pointsEqual(a2, b1) || pointsEqual(a2, b2)){
        return false;
    }

    const o1 = orientation(a1, a2, b1);
    const o2 = orientation(a1, a2, b2);
    const o3 = orientation(b1, b2, a1);
    const o4 = orientation(b1, b2, a2);

    return o1 !== o2 && o3 !== o4;
};

export function hasProperXIntersection(edges: Edge[]): boolean {
    for(let i = 0; i < edges.length; i++) {
        for(let j = i + 1; j < edges.length; j++) {
            const [a1, a2] = edges[i];
            const [b1, b2] = edges[j];

        

            if(doProperlyIntersect(a1, a2, b1, b2)) {
                return true;
            }
        }
    }

    return false;
};