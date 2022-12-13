import "./TreeVisualization.css";

import Graph from "react-vis-network-graph";
import { v4 as uuidv4 } from "uuid";

import React, { useState, useEffect, useMemo } from "react";

const TreeVisualization = ({ treeData, goalData }) => {
  const [graph, setGraph] = useState();
  const [visNetwork, setVisNetwork] = useState();
  const version = useMemo(uuidv4, [[graph]]);

  const options = {
    autoResize: true,
    height: "100%",
    edges: {
      color: "#000000",
      arrows: {
        to: false,
      },
    },
    nodes: {
      shape: "box",
      physics: false,
      color: "#e3e3dd",
      margin: 3,
    },
    groups: {
      solutionPath: { color: { background: "#00ff00" } },
    },

    layout: {
      hierarchical: {
        enabled: true,
        sortMethod: "directed",
        shakeTowards: "roots",
      },
      improvedLayout: true,
      clusterThreshold: 200,
    },
    interaction: {
      dragNodes: false,
      selectable: false,
      selectConnectedEdges: false,
      hoverConnectedEdges: false,
    },
  };

  const events = {
    select: function (event) {
      var { nodes, edges } = event;
    },
  };

  useEffect(() => {
    getNodeData(treeData);
  }, [treeData]);

  const getNodeData = (data) => {
    let nodeData = { nodes: [], edges: [] };
    let nodeID;
    let nodeLabel;
    if (data.length === 0) return;
    if (typeof data.problem == "undefined") {
      //inputted data is not node but first input
      nodeID = data.join("");
      nodeLabel = makeLabel(data);

      nodeData.nodes.push({ id: nodeID, label: nodeLabel });
    } else {
      //push new edges of parent to children
      //{from: 'parent_id', to: 'child_id'}
      traverse(data, nodeData);
    }
    setGraph(nodeData);
  };

  const traverse = (node, nodeData) => {
    if (node == null) return;
    let nodeID = makeID(node.problem);
    let nodeLabel = makeLabel(node.problem);
    let groupID = "";
    if (nodeID === goalData[goalData.length - 1]) {
      groupID = "solutionPath";
      goalData.splice(goalData.length - 1, 1);
    }
    nodeData.nodes.push({ id: nodeID, group: groupID, label: nodeLabel });
    if (node.parent != null) {
      let parentID = makeID(node.parent.problem);
      nodeData.edges.push({
        from: parentID,
        to: nodeID,
        color: { color: groupID === "solutionPath" ? "#00ff00" : "grey" },
      });
    }
    traverse(node.left, nodeData);
    traverse(node.right, nodeData);
    traverse(node.up, nodeData);
    traverse(node.down, nodeData);
  };

  const makeID = (puzzleState) => {
    return puzzleState.map((innerArray) => innerArray.join("")).join("");
  };

  const makeLabel = (puzzleState) => {
    if (puzzleState.length > 3) {
      let label = "";
      for (let i = 0; i < puzzleState.length; i++) {
        if (!((i + 1) % 3) && i !== 0) {
          label += JSON.stringify(puzzleState[i]) + "\n";
        } else label += JSON.stringify(puzzleState[i]) + " ";
      }
      return label;
    } else
      return puzzleState.map((innerArray) => innerArray.join("")).join("\n");
  };

  return (
    <>
      <div className="tree-visualization">
        <Graph
          key={version}
          graph={graph}
          options={options}
          events={events}
          getNetwork={(network) => {
            //  if you want access to vis.js network api you can set the state in a parent component using this property
          }}
        />
      </div>
    </>
  );
};

export default TreeVisualization;
