// Task 2

// Helper function for finding matching kind
const hasMatchingKind = (property: any, kind: string) => {

  // Check top level
  if (property.kind) {
    return property.kind.some((kindObj: any) => kindObj.name === kind);
  }

  // Check inside anyOf if the kind exists
  if (property.anyOf) {
    return property.anyOf.some((subProperty: any) => {
      if (subProperty.kind) {
        return subProperty.kind.some((kindObj: any) => kindObj.name === kind);
      }
      return false;
    });
  }

  return false;
};

export async function getInputPropertiesOfKind(blockType: string, kind: string): Promise<string[]> {

  // Fetching manifest
  const response = await fetch('https://detect.roboflow.com/workflows/blocks/describe');

  // Checking for errors in block fetch
  if (!response.ok) {
    throw new Error("Failed to fetch manifest");
  }

  // Find the block with the specified blockType
  const manifest = await response.json();
  const block = manifest.blocks.find((block: any) =>
    block.manifest_type_identifier === blockType
  );

  // Checking if identifier found block
  if (!block) {
    return [];
  }

  const properties = block.block_schema.properties;

  // Filter out properties that match the specified kind
  const matchingProperties = Object.keys(properties).filter((propertyKey) => {
    const property = properties[propertyKey];
    return hasMatchingKind(property, kind);
  });

  return matchingProperties;
}


// --Test for actual manifest--

// getInputPropertiesOfKind("roboflow_core/roboflow_object_detection_model@v1", "image")
//   .then(props => console.log(props))
//   .catch(err => console.error(err));

// getInputPropertiesOfKind("roboflow_core/polygon_visualization@v1", "string")
//   .then(props => console.log(props))
//   .catch(err => console.error(err));

//   getInputPropertiesOfKind("roboflow_core/dynamic_crop@v1", "object_detection_prediction")
//   .then(props => console.log(props))
//   .catch(err => console.error(err));