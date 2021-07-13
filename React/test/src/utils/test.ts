/**
 * json schema:
 * [
 *   { name: "John Doe",
 *     collaborators: ["Jane Doe", "Herbert Frapp", "Elsie McEwan"]
 *   },
 *   { name: "Jane Doe",
 *     collaborators: ["John Doe", "Karen Smith"]
 *   },
 *   { name: "Skittles the Cat",
 *     collaborators: []
 *   },
 *   { name: "abc the Cat",
 *     collaborators: []
 *   },
 * ]
 */
 function collaborators_map(json: any): Map<string, Set<string>> {
   
