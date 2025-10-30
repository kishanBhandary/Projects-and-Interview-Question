# 📊 Algorithm Complexity Reference Guide

This comprehensive guide provides time and space complexity analysis for common algorithms and data structures used in technical interviews.

## 🎯 Big O Notation

Big O notation describes the worst-case time complexity of an algorithm as the input size grows.

### Common Time Complexities

| Complexity | Name | Description | Example |
|------------|------|-------------|---------|
| O(1) | Constant | Same time regardless of input size | Array access, hash table lookup |
| O(log n) | Logarithmic | Time increases logarithmically | Binary search, balanced tree operations |
| O(n) | Linear | Time increases linearly with input | Linear search, single loop |
| O(n log n) | Linearithmic | Time increases linearly × logarithmically | Merge sort, heap sort |
| O(n²) | Quadratic | Time increases quadratically | Bubble sort, nested loops |
| O(n³) | Cubic | Time increases cubically | Matrix multiplication (naive) |
| O(2ⁿ) | Exponential | Time doubles with each input | Recursive Fibonacci (naive) |
| O(n!) | Factorial | Time increases factorially | Permutation generation |

## 📚 Data Structures Complexity

### Arrays
| Operation | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| Access | O(1) | O(1) |
| Search | O(n) | O(1) |
| Insertion | O(n) | O(1) |
| Deletion | O(n) | O(1) |
| Append | O(1) | O(1) |

### Linked Lists
| Operation | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| Access | O(n) | O(1) |
| Search | O(n) | O(1) |
| Insertion (at head) | O(1) | O(1) |
| Insertion (at tail) | O(1) | O(1) |
| Insertion (at position) | O(n) | O(1) |
| Deletion (at head) | O(1) | O(1) |
| Deletion (at tail) | O(n) | O(1) |
| Deletion (at position) | O(n) | O(1) |

### Stacks
| Operation | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| Push | O(1) | O(1) |
| Pop | O(1) | O(1) |
| Peek | O(1) | O(1) |
| Search | O(n) | O(1) |

### Queues
| Operation | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| Enqueue | O(1) | O(1) |
| Dequeue | O(1) | O(1) |
| Front | O(1) | O(1) |
| Search | O(n) | O(1) |

### Hash Tables
| Operation | Average | Worst Case | Space Complexity |
|-----------|---------|------------|------------------|
| Insert | O(1) | O(n) | O(n) |
| Delete | O(1) | O(n) | O(n) |
| Search | O(1) | O(n) | O(n) |
| Update | O(1) | O(n) | O(n) |

### Binary Search Trees
| Operation | Average | Worst Case | Space Complexity |
|-----------|---------|------------|------------------|
| Insert | O(log n) | O(n) | O(n) |
| Delete | O(log n) | O(n) | O(n) |
| Search | O(log n) | O(n) | O(n) |
| Traversal | O(n) | O(n) | O(h) |

### Heaps
| Operation | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| Insert | O(log n) | O(1) |
| Delete | O(log n) | O(1) |
| Extract Min/Max | O(log n) | O(1) |
| Peek | O(1) | O(1) |
| Build Heap | O(n) | O(1) |

### Graphs
| Operation | Adjacency List | Adjacency Matrix | Space Complexity |
|-----------|----------------|------------------|------------------|
| Add Vertex | O(1) | O(V²) | O(V) |
| Add Edge | O(1) | O(1) | O(V) |
| Remove Vertex | O(V + E) | O(V²) | O(V) |
| Remove Edge | O(V) | O(1) | O(V) |
| Check Edge | O(V) | O(1) | O(V) |

## 🔍 Sorting Algorithms

| Algorithm | Best Case | Average Case | Worst Case | Space | Stable |
|-----------|-----------|--------------|------------|-------|--------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | No |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | No |
| Counting Sort | O(n + k) | O(n + k) | O(n + k) | O(k) | Yes |
| Radix Sort | O(d(n + k)) | O(d(n + k)) | O(d(n + k)) | O(n + k) | Yes |
| Bucket Sort | O(n + k) | O(n + k) | O(n²) | O(n) | Yes |

## 🔍 Searching Algorithms

| Algorithm | Time Complexity | Space Complexity | Notes |
|-----------|----------------|------------------|-------|
| Linear Search | O(n) | O(1) | Works on unsorted arrays |
| Binary Search | O(log n) | O(1) | Requires sorted array |
| Ternary Search | O(log₃ n) | O(1) | Divide into 3 parts |
| Jump Search | O(√n) | O(1) | Jump by √n steps |
| Interpolation Search | O(log log n) | O(1) | Best for uniformly distributed data |
| Exponential Search | O(log n) | O(1) | Find range then binary search |

## 🌐 Graph Algorithms

| Algorithm | Time Complexity | Space Complexity | Notes |
|-----------|----------------|------------------|-------|
| BFS | O(V + E) | O(V) | Uses queue |
| DFS | O(V + E) | O(V) | Uses stack/recursion |
| Dijkstra | O((V + E) log V) | O(V) | Single-source shortest path |
| Bellman-Ford | O(VE) | O(V) | Handles negative weights |
| Floyd-Warshall | O(V³) | O(V²) | All-pairs shortest path |
| Kruskal | O(E log E) | O(V) | Minimum spanning tree |
| Prim | O((V + E) log V) | O(V) | Minimum spanning tree |
| Topological Sort | O(V + E) | O(V) | DAG ordering |
| Strongly Connected Components | O(V + E) | O(V) | Kosaraju's algorithm |

## 🧮 Dynamic Programming

| Problem | Time Complexity | Space Complexity | Notes |
|---------|----------------|------------------|-------|
| Fibonacci (memoized) | O(n) | O(n) | Top-down approach |
| Fibonacci (tabulated) | O(n) | O(1) | Bottom-up approach |
| Longest Common Subsequence | O(mn) | O(mn) | m, n are string lengths |
| Longest Increasing Subsequence | O(n log n) | O(n) | Binary search optimization |
| Edit Distance | O(mn) | O(mn) | Levenshtein distance |
| Knapsack (0/1) | O(nW) | O(nW) | W is capacity |
| Matrix Chain Multiplication | O(n³) | O(n²) | Optimal parenthesization |

## 🔄 String Algorithms

| Algorithm | Time Complexity | Space Complexity | Notes |
|-----------|----------------|------------------|-------|
| KMP Pattern Matching | O(m + n) | O(m) | m = pattern length, n = text length |
| Rabin-Karp | O(m + n) | O(1) | Rolling hash |
| Z Algorithm | O(m + n) | O(m + n) | Z-array construction |
| Manacher's Algorithm | O(n) | O(n) | Longest palindromic substring |
| Suffix Array | O(n log n) | O(n) | String sorting |
| LCP Array | O(n) | O(n) | Longest common prefix |

## 🎯 Common Interview Patterns

### Sliding Window
- **Time**: O(n)
- **Space**: O(k) where k is window size
- **Use cases**: Substring problems, maximum/minimum in window

### Two Pointers
- **Time**: O(n)
- **Space**: O(1)
- **Use cases**: Sorted array problems, palindrome checking

### Fast & Slow Pointers
- **Time**: O(n)
- **Space**: O(1)
- **Use cases**: Cycle detection, finding middle element

### Merge Intervals
- **Time**: O(n log n)
- **Space**: O(n)
- **Use cases**: Overlapping intervals, scheduling problems

### Tree BFS
- **Time**: O(n)
- **Space**: O(w) where w is maximum width
- **Use cases**: Level-order traversal, shortest path in tree

### Tree DFS
- **Time**: O(n)
- **Space**: O(h) where h is height
- **Use cases**: Path problems, tree validation

### Subsets
- **Time**: O(2ⁿ)
- **Space**: O(2ⁿ)
- **Use cases**: Combination problems, power set

### Modified Binary Search
- **Time**: O(log n)
- **Space**: O(1)
- **Use cases**: Search in rotated array, find peak element

## 📈 Space Complexity Guidelines

### O(1) - Constant Space
- Variables, counters
- In-place algorithms
- Iterative solutions

### O(log n) - Logarithmic Space
- Recursive calls (balanced tree height)
- Divide and conquer algorithms

### O(n) - Linear Space
- Arrays, lists
- Hash tables
- Recursive call stack (linear recursion)

### O(n log n) - Linearithmic Space
- Merge sort (temporary arrays)
- Divide and conquer with linear space per level

### O(n²) - Quadratic Space
- 2D arrays
- Adjacency matrix
- Dynamic programming tables

## 🎯 Optimization Tips

### Time Optimization
1. **Use appropriate data structures** - Hash tables for O(1) lookups
2. **Sort when beneficial** - Binary search requires sorted data
3. **Avoid nested loops** - Use hash tables or two pointers
4. **Memoization** - Cache computed results
5. **Early termination** - Break loops when possible

### Space Optimization
1. **In-place algorithms** - Modify input instead of creating new structures
2. **Iterative over recursive** - Reduce call stack usage
3. **Reuse variables** - Don't create unnecessary temporary variables
4. **Streaming algorithms** - Process data in chunks
5. **Bit manipulation** - Use bits for boolean flags

## 🔍 Common Mistakes

1. **Confusing average and worst case** - Hash table operations are O(1) average, O(n) worst
2. **Ignoring space complexity** - Recursive solutions may use O(n) space
3. **Not considering input size** - O(n²) might be acceptable for small inputs
4. **Over-optimizing** - Sometimes O(n log n) is fine instead of O(n)
5. **Missing edge cases** - Empty inputs, single elements, duplicates

## 📚 Additional Resources

- [Big O Cheat Sheet](https://www.bigocheatsheet.com/)
- [LeetCode Complexity Analysis](https://leetcode.com/explore/learn/card/recursion-i/256/complexity-analysis/)
- [GeeksforGeeks Complexity Analysis](https://www.geeksforgeeks.org/analysis-of-algorithms/)
- [Coursera Algorithm Specialization](https://www.coursera.org/specializations/algorithms)

---

**Remember**: Understanding complexity is crucial for writing efficient code and acing technical interviews! 🚀
# Extra: minor edit to ensure branch has a unique commit
