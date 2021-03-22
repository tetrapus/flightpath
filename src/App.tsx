import { Connectors } from "./Connectors";
import React, { useEffect, useState } from "react";
import { phabricator, User } from "./phabricator";
import { Node } from "./Node";
import { AnnotatedNode } from "./AnnotatedNode";
import { Allocation } from "./Allocation";

function bisect<T>(arr: T[], predicate: (elem: T) => boolean) {
  const trues: T[] = [];
  const falses: T[] = [];
  arr.forEach((elem) => {
    const result = predicate(elem);
    if (result) {
      trues.push(elem);
    } else {
      falses.push(elem);
    }
  });
  return [trues, falses];
}

function generateNodeParents(
  nodes: Node[],
  nodeIndex: { [id: string]: AnnotatedNode }
) {
  nodes.forEach((node) => {
    node.requires.forEach((dependencyId) =>
      nodeIndex[(dependencyId as unknown) as string]?.requiredBy?.push(node.id)
    );
  });
}

function generateNodeDepth(
  currentNode: AnnotatedNode,
  nodes: { [id: string]: AnnotatedNode }
) {
  if (currentNode.depth !== undefined) {
    return;
  }

  const requiredNodes = currentNode.requires
    .map((requiredNodeId) => nodes[requiredNodeId])
    .filter((x) => x);

  if (!requiredNodes.length) {
    currentNode.depth = 0;
    currentNode.children = 0;
    currentNode.active = currentNode.closed;
    return;
  }

  requiredNodes.forEach((required) => generateNodeDepth(required, nodes));
  currentNode.depth =
    Math.max(...requiredNodes.map((n) => n.depth as number)) + 1;
  // this is wrong, but good enough to break ties
  currentNode.children = requiredNodes
    .map((n) => n.children as number)
    .reduce((a, b) => a + b, requiredNodes.length);
  currentNode.active = requiredNodes.some((node) => node.active);
}

function App() {
  let dimensions = { x: window.innerWidth, y: 2000 };
  const colsize = 180;
  let columns = Math.floor(dimensions.x / colsize) - 1;
  if (columns % 2 === 0) {
    columns += 1;
  }

  const [editMode, setEditMode] = useState<boolean>(false);
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "e") {
        setEditMode((mode) => !mode);
      }
    };
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, []);

  const [rootId, setRootId] = useState<string | undefined>();
  const [nodes, setNodes] = useState<Node[]>([]);

  const randomiseRoadmap = async () => {
    setRootId(undefined);
    const response = await phabricator("maniphest.search", {
      queryKey: "bYI2MjPZzE5c",
    });
    const tasks = response.result.data;
    const selected = tasks[Math.floor(Math.random() * tasks.length)];
    setNodes([]);
    setRootId(selected.phid);
  };

  const setRoadmap = async (id: string) => {
    setRootId(undefined);
    const response = await phabricator("maniphest.search", {
      constraints: {
        ids: [id.slice(2)],
      },
    });
    const tasks = response.result.data;
    const selected = tasks[Math.floor(Math.random() * tasks.length)];
    setNodes([]);
    setRootId(selected.phid);
  };

  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => setRoadmap(window.location.hash), 1000);
    } else {
      setTimeout(randomiseRoadmap, 1000);
    }
    document.addEventListener("hashchange", () =>
      setRoadmap(window.location.hash)
    );
  }, []);

  useEffect(() => {
    async function fetchNodes(toBeLoaded: string[]) {
      const response = await phabricator("maniphest.query", {
        phids: toBeLoaded,
      });
      const children = response.result;
      setNodes((nodes) => [
        ...nodes,
        ...Object.values(children)
          .filter((child) => !nodes.find((node) => node.id === child.phid))
          .map((child) => ({
            title: children[child.phid].title,
            id: child.phid,
            owner: child.ownerPHID,
            requires: child.dependsOnTaskPHIDs || [],
            closed: child.isClosed,
          })),
      ]);
    }
    if (!rootId) {
      return;
    }
    if (nodes.length) {
      const toBeLoaded = [
        ...nodes.map((node) => node.requires).flat(),
        rootId,
      ].filter((phids) => !nodes.find((node) => phids.includes(node.id)));

      if (!toBeLoaded.length) {
        return;
      }
      fetchNodes(toBeLoaded);
    } else {
      if (!document.corsBypass) {
        setTimeout(() => fetchNodes([rootId]), 1000);
      } else {
        fetchNodes([rootId]);
      }
    }
  }, [nodes, rootId]);

  const [users, setUsers] = useState<{ [phid: string]: User }>({});
  useEffect(() => {
    async function fetchUsers(unknowns: string[]) {
      const response = await phabricator("user.query", {
        phids: unknowns,
      });
      setUsers((users) => ({
        ...users,
        ...Object.fromEntries(
          Object.values(response.result).map((user) => [user.phid, user])
        ),
      }));
    }
    const unknowns = nodes
      .map((node) => node.owner)
      .filter((x): x is string => !!(x && !users[x]));
    if (unknowns.length) {
      fetchUsers(unknowns);
    }
  }, [nodes, users]);

  /**
   * LAYOUTING ALGORITHM
   * Find the longest unallocated parent
   * Place them in their preferred node.
   * Adjust parent node horizontally to minimise distance.
   * Allocate all descendents first
   * Repeat
   */
  let allocated: Allocation[] = [];
  const nodeIndex: {
    [id: string]: AnnotatedNode;
  } = Object.fromEntries(
    nodes.map((node) => [node.id, { ...node, requiredBy: [] }])
  );
  if (nodes.length && rootId && nodeIndex[rootId]) {
    // Setup
    generateNodeParents(nodes, nodeIndex);
    generateNodeDepth(nodeIndex[rootId], nodeIndex);

    const compare = (v1: number | undefined, v2: number | undefined) => {
      if (v1 === undefined || v2 === undefined) {
        return 0;
      }
      return v2 - v1;
    };

    const compareNodes = (n1: AnnotatedNode, n2: AnnotatedNode) =>
      compare(n1.depth, n2.depth) ||
      compare(n1.children, n2.children) ||
      compare(+!!n1.active, +!!n2.active);

    // For simplicity, allocate the first node to the middle of row 0 immediately.
    let unallocated = Object.keys(nodeIndex)
      .filter((x) => x !== rootId)
      .map((id) => nodeIndex[id])
      .sort(compareNodes);
    const middleColumn = Math.floor(columns / 2);
    allocated = [{ node: nodeIndex[rootId], y: 0, x: middleColumn }];
    // Allocate each unallocated node
    while (unallocated.length) {
      const node = unallocated[0];
      console.log({ node });
      unallocated = unallocated.slice(1);

      // The best position for a node is right under a parent.
      let initialCandidates = allocated.filter((allocation) =>
        node.requiredBy.includes(allocation.node.id)
      );
      // Find the closest free spot in the next row under a parent.
      let distance = 0;
      let candidates = initialCandidates.map((allocation) => ({
        ...allocation,
        y: allocation.y + 1,
        reset: 0,
        initialX: allocation.x,
      }));
      while (true) {
        if (!candidates.length) {
          throw new Error();
        }
        const freeSlots = candidates.filter(
          (allocation) =>
            !allocated.find(
              (candidate) =>
                candidate.x === allocation.x && candidate.y === allocation.y
            )
        );
        if (freeSlots.length) {
          allocated.push({ x: freeSlots[0].x, y: freeSlots[0].y, node });
          /**
           * We've placed a node! Now let's readjust a little bit - let's adjust the parent
           * to minimize their link distance (unless it's the parent node!)
           */
          if (freeSlots[0].node.id !== rootId) {
            const parentAllocation = allocated.find(
              (allocation) => allocation.node.id === freeSlots[0].node.id
            ) as Allocation;
            // We only want to adjust the parent x!
            const taken = allocated.filter(
              (allocation) => parentAllocation.y === allocation.y
            );
            const neighbours = [
              ...parentAllocation.node.requiredBy,
              ...parentAllocation.node.requires,
            ]
              .map((link) => allocated.find((a) => a.node.id === link))
              .filter((x) => x);

            const free = [
              ...Array.from(new Array(columns).keys()).filter(
                (x) => !taken.some((allocation) => allocation.x === x)
              ),
              parentAllocation.x,
            ]
              .map((x) => ({
                value: x,
                score: neighbours
                  .map((a) => Math.abs((a?.x || 0) - x))
                  .reduce((a, b) => a + b, 0),
              }))
              .sort((a, b) => a.score - b.score);
            console.log(free);
            parentAllocation.x = free[0].value;
          }
          break;
        }
        distance++;

        candidates = candidates.map((allocation) => {
          const d = distance - allocation.reset;
          let x = allocation.x + (d % 2 ? d : -d);
          let y = allocation.y;
          let reset = allocation.reset;
          if (x < 0 || x >= columns) {
            reset = distance - 1;
            y++;
            x = allocation.initialX + 1;
            if (x >= columns) {
              reset++;
              x -= 2;
            }
          }
          return {
            ...allocation,
            x,
            y,
            reset,
          };
        });
      }
      // Now we prioritise the subset that is a descendent of this node
      const [descendents, nondescendents] = bisect(unallocated, (n) =>
        node.requires.includes(n.id)
      );
      unallocated = [...descendents, ...nondescendents];
    }
  }

  dimensions.y = Math.max(
    Math.max(...allocated.map((allocation) => allocation.y)) * 150 + 235,
    window.innerHeight
  );

  return (
    <div style={{ color: "white" }}>
      <Connectors nodes={nodes} dimensions={dimensions} />
      <div
        style={{
          position: "absolute",
          top: 16,
          left: dimensions.x / 2,
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <img
          src={
            nodes.length && rootId
              ? "./freelancer-neon.svg"
              : "./freelancer-neon-off.svg"
          }
          alt="Freelancer Enterprise"
          onClick={() => {
            if (editMode) {
            } else {
              randomiseRoadmap();
            }
          }}
        ></img>
        <div>{rootId ? nodeIndex[rootId]?.title : null}</div>
      </div>
      {allocated.map(({ node, x, y }, idx) => (
        <div
          style={{
            position: "absolute",
            left: (dimensions.x - colsize * columns) / 2 + (x + 0.5) * colsize,
            top: 170 + 150 * y,
            fontSize: 12,
            transform: "translateX(-50%) translateY(-50%)",
            display: "flex",
          }}
        >
          <div
            data-id={node.id}
            data-active={node.active}
            data-assigned={!!node.owner}
            style={{
              minWidth: 32,
              minHeight: 32,
              borderColor: "#fa5f9b",
              borderRadius: 18,
              borderWidth: 2,
              borderStyle: "solid",
              margin: "auto",
              visibility: idx ? "initial" : "hidden",
              ...(node.active
                ? {}
                : { filter: "grayscale(1) brightness(0.6)" }),
              ...(node.owner && users[node.owner] && users[node.owner].image
                ? {
                    background: `url(${users[node.owner].image})`,
                    backgroundSize: "cover",
                  }
                : {
                    background: "black",
                  }),
            }}
          ></div>
          {node.id !== rootId ? (
            <div
              style={{
                background: "rgba(0, 0, 0, 0.3)",
                margin: 4,
                maxWidth: 100,
                textAlign: "center",
              }}
            >
              {node.title}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default App;
