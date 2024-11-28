import React, { useRef, useEffect, useMemo } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import { extend } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

import { _Graph, _Node } from '@/object/DataObject';

extend({ OrbitControls })

interface ForceGraph3DComponentProps {
    graphData: _Graph;
}

const ForceGraph3DComponent: React.FC<ForceGraph3DComponentProps> = ({ graphData }) => {
    const fgRef = useRef()
  
    useEffect(() => {
      // Add camera controls
      const fg = fgRef.current
      fg.controls().enableDamping = true
      fg.controls().dampingFactor = 0.25
      fg.controls().enableZoom = true
    }, [])
  
    // Custom node object generation
    const getNodeObject = useMemo(() => {
      return (node: _Node) => {
        const geometry = new THREE.SphereGeometry(node.radius)
        const material = new THREE.MeshLambertMaterial({ color: node.color })
        return new THREE.Mesh(geometry, material)
      }
    }, [])
  
    // Custom node label generation
    const getNodeLabel = useMemo(() => {
      return (node: _Node) => `${node.label}`
    }, [])
  
    return (
      <div className="w-full h-screen bg-gray-900">
        <ForceGraph3D
          ref={fgRef}
          graphData={graphData}
          nodeLabel={getNodeLabel}
          nodeThreeObject={getNodeObject}
          linkColor={() => 'rgba(255,255,255,0.2)'}
          linkWidth={1}
          linkOpacity={0.5}
        />
      </div>
    )
  }
  
  export default ForceGraph3DComponent