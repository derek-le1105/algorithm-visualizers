import "./TreeVisualization.css";

import asyncTimeout from "../HelperFiles/asyncTimeout";

import Graph from "react-vis-network-graph";
import { v4 as uuidv4 } from "uuid";

import React, { useState, useEffect, useMemo } from "react";

const TreeVisualization = ({ treeData, goalData, setShowReplay }) => {
  const [thisGraph, setGraph] = useState({ nodes: [], edges: [] });
  const [nodes, setNodes] = useState([]);
  const version = useMemo(uuidv4, [[thisGraph]]);
  var network = null;
  var goalCounter = 0;

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
      margin: {
        left: 7,
        right: 7,
      },
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
      selectable: true,
      selectConnectedEdges: false,
      hoverConnectedEdges: false,
    },
  };

  const handleNetwork = (nw) => {
    network = nw;
  };

  useEffect(() => {
    getNodeData(treeData);
  }, [treeData]);

  useEffect(() => {
    replayButton();
  }, [thisGraph.nodes]);

  const getNodeData = (data) => {
    goalData.reverse();
    const nodeData = { nodes: [], edges: [] };
    let nodeID;
    let nodeLabel;
    if (data.length === 0) return;
    if (typeof data.problem == "undefined") {
      //inputted data is not node but first input
      nodeID = data.join("");
      nodeLabel = makeLabel(data);

      nodeData.nodes.push({ id: nodeID, label: nodeLabel });
      setGraph({ ...nodeData });
    } else {
      //push new edges of parent to children
      //{from: 'parent_id', to: 'child_id'}
      traverse(data, nodeData);
      setGraph({ ...nodeData });
      setShowReplay(true);
    }
  };

  const traverse = (node, nodeData) => {
    if (node == null) return;
    const nodeID = makeID(node.problem);
    const nodeLabel = makeLabel(node.problem);
    let groupID = "";
    if (goalCounter < goalData.length) {
      let b = goalData[goalCounter];
      if (nodeID === b) {
        groupID = "solutionPath";
        goalCounter++;
      }
    }
    nodeData.nodes.push({ id: nodeID, group: groupID, label: nodeLabel });
    setNodes([...nodeData.nodes], {
      id: nodeID,
      group: groupID,
      label: nodeLabel,
    });
    if (node.parent != null) {
      const parentID = makeID(node.parent.problem);
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
    let a = puzzleState.map((innerArray) => innerArray.join("")).join("");
    return a;
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

  const replayButton = () => {
    console.log(thisGraph);
    console.log(nodes);
    // let tileSetting = document
    //   .getElementById("sidebar")
    //   .getElementsByClassName("info-container")[0];
    // console.log(tileSetting);
    //const replaybtn = document.createElement("button");
    //replaybtn.textContent = "Replay Goal Path";
    const replaybtn = document.getElementById("goal-replay");
    if (replaybtn) replaybtn.addEventListener("click", goalReplay);
    //tileSetting.appendChild(replaybtn);
  };

  const goalReplay = async () => {
    for (var node of goalData) {
      //console.log(node);
      let currNodePos = network.getPosition(node);
      //console.log(currNodePos);
      network.selectNodes([node]);
      network.moveTo({ position: currNodePos, scale: 1.5, animation: true });
      await asyncTimeout({ timeout: 1000 });
    }
  };

  return (
    <>
      <div className="tree-visualization">
        <Graph
          key={version}
          graph={thisGraph}
          options={options}
          getNetwork={handleNetwork}
        />
        {console.log(thisGraph)}
      </div>
    </>
  );
};

export default TreeVisualization;
