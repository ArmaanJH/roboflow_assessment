// Task 1

export async function getBlockDescription(blockIdentifier: string): Promise<string> {

  // Fetching manifest
  const response = await fetch('https://detect.roboflow.com/workflows/blocks/describe');

  // Checking for errors in block fetch
  if (!response.ok) {
    throw new Error("Failed to fetch manifest");
  }

  // Parsing for identifier
  const manifest = await response.json();
  const block = manifest.blocks.find((block: any) =>
    block.manifest_type_identifier === blockIdentifier
  );

  // Returning short description or description not found based on success state
  return block ? block.block_schema.short_description : "Description not found!";
}

// --Test for actual Manifest--

// getBlockDescription("roboflow_core/roboflow_object_detection_model@v1")
//     .then(desc => console.log(desc))
//     .catch(err => console.error(err));

// getBlockDescription("roboflow_core/polygon_visualization@v1")
//     .then(desc => console.log(desc))
//     .catch(err => console.error(err));