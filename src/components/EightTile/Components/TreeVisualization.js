import "./TreeVisualization.css";

import asyncTimeout from "../HelperFiles/asyncTimeout";

import Graph from "react-vis-network-graph";
import { v4 as uuidv4 } from "uuid";

import React, { useState, useEffect, useMemo } from "react";

const TreeVisualization = ({ treeData, goalData, setShowReplay }) => {
  const [thisGraph, setGraph] = useState({ nodes: [], edges: [] });
  const version = useMemo(uuidv4, [[thisGraph]]);
  var network = null;
  var goalCounter = 0;

  const options = {
    autoResize: true,
    height: "100%",
    edges: {
      color: { color: "#000000", highlight: "#00ff00", inherit: "from" },
      arrows: {
        to: false,
      },
    },
    nodes: {
      shape: "custom",
      physics: false,
      color: "#e3e3dd",
      margin: {
        left: 7,
        right: 7,
      },
      ctxRenderer: function ({
        ctx,
        id,
        x,
        y,
        state: { selected, hover },
        style,
        label,
      }) {
        const r = style.size;
        ctx.beginPath();
        ctx.moveTo(x - r, y - r);
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            ctx.save();
            ctx.fillStyle = "white";
            if (goalData.includes(id)) ctx.strokeStyle = "green";
            else ctx.strokeStyle = "black";
            ctx.translate(5 + j * 15, 5 + i * 15);
            ctx.strokeRect(x - r / 2 - 10, y - r - 3, 15, 15);
            ctx.fillRect(x - r / 2 - 10, y - r - 3, 15, 15);
            ctx.restore();
          }
        }
        let lines = label.split("\n");
        for (let i = 0; i < lines.length; ++i) {
          ctx.fillText(lines[i], x - r / 2, y - r / 2 + i * 15);
        }
      },
      shapeProperties: {
        interpolation: false, // 'true' for intensive zooming
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
      selectable: false,
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
    let newLabel = "";
    for (let i = 0; i < puzzleState[0].length; i++) {
      for (let j = 0; j < puzzleState.length; j++) {
        let temp = puzzleState[i][j];
        if (puzzleState[i][j] === 0) temp = "  ";

        if (j === 2) {
          newLabel += temp + "\n";
        } else {
          newLabel += temp + "   ";
        }
      }
    }
    return newLabel;
  };

  const replayButton = () => {
    const replaybtn = document.getElementById("goal-replay");
    if (replaybtn) replaybtn.addEventListener("click", goalReplay);
  };

  const goalReplay = async () => {
    for (var node of goalData) {
      let currNodePos = network.getPosition(node);
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
