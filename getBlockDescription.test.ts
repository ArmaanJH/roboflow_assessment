import { getBlockDescription } from './getBlockDescription';

// Mocking the fetch function manifest structure
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      blocks: [
        {
          block_schema: {
            short_description: "Predict the location of objects with bounding boxes."
          },
          manifest_type_identifier: "roboflow_core/roboflow_object_detection_model@v1"
        },
        {
          block_schema: {
            short_description: "Draws a polygon around detected objects in an image."
          },
          manifest_type_identifier: "roboflow_core/polygon_visualization@v1"
        }
      ]
    })
  })
) as jest.Mock;

describe('getBlockDescription', () => {
  // Mocking a fetch request for roboflow_object_detection_model@v1 block
  test('returns description for known block identifier', async () => {
    const description = await getBlockDescription("roboflow_core/roboflow_object_detection_model@v1");
    expect(description).toBe("Predict the location of objects with bounding boxes.");
  });

  // Mocking a fetch request for polygon_visualization@v1 block
  test('returns description for another known block identifier', async () => {
    const description = await getBlockDescription("roboflow_core/polygon_visualization@v1");
    expect(description).toBe("Draws a polygon around detected objects in an image.");
  });

  // Mocking a fetch request where no description is available
  test('returns "Description not found!" for unknown block identifier', async () => {
    const description = await getBlockDescription("unknown_block_identifier");
    expect(description).toBe("Description not found!");
  });

  // Mocking a failed fetch request
  test('throws error if fetch fails', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false
      })
    );
    
    await expect(getBlockDescription("some_block")).rejects.toThrow("Failed to fetch manifest");
  });
});
