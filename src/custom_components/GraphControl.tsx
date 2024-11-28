import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Graph } from "@/data_object/Graph";
import React from "react";

interface GraphControlsProps {
    graph: Graph;
  }
  
  const GraphControls: React.FC<GraphControlsProps> = ({ graph }) => {
    return (
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm">
          Center View
        </Button>
        <Button variant="outline" size="sm">
          Reset Zoom
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-sm">Zoom:</span>
          <Slider
            defaultValue={[100]}
            max={200}
            min={50}
            step={1}
            className="w-32"
          />
        </div>
      </div>
    );
  };
  
  export default GraphControls;