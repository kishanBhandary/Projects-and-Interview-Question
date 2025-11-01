from collections import deque, defaultdict

def bfs(start, n, adj):
    dist = [-1] * n
    dist[start] = 0
    queue = deque([start])
    while queue:
        node = queue.popleft()
        for nei in adj[node]:
            if dist[nei] == -1:  # not visited
                dist[nei] = dist[node] + 1
                queue.append(nei)
    return dist

def findEquidistantVertices(n, edges, A, B):
    # Build adjacency list
    adj = defaultdict(list)
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)
    
    # BFS from both sources
    distA = bfs(A, n, adj)
    distB = bfs(B, n, adj)
    
    # Collect vertices equidistant from A and B
    result = []
    for v in range(n):
        if distA[v] != -1 and distA[v] == distB[v]:
            result.append(v)
    
    return result
