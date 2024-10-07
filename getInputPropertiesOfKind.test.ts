import { getInputPropertiesOfKind } from './getInputPropertiesOfKind';

// Mocking the fetch function manifest structure
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      blocks: [
        {
          block_schema: {
            properties: {
              images: {
                kind: [{ name: 'image' }]
              },
              metadata: {
                kind: [{ name: 'video_metadata' }]
              },
              name: {
                description: 'The unique name of this step.',
                type: 'string'
              },
              detections: {
                kind: [{ name: 'object_detection_prediction' }]
              }
            }
          },
          manifest_type_identifier: "roboflow_core/roboflow_object_detection_model@v1"
        },
        {
          block_schema: {
            properties: {
              color_palette: {
                kind: [{ name: 'string' }]
              },
              color_axis: {
                kind: [{ name: 'string' }]
              },
              name: {
                description: 'The unique name of this step.',
                type: 'string'
              }
            }
          },
          manifest_type_identifier: "roboflow_core/polygon_visualization@v1"
        },
        {
          block_schema: {
            properties: {
              predictions: {
                kind: [{ name: 'object_detection_prediction' }]
              },
              name: {
                description: 'The unique name of this step.',
                type: 'string'
              }
            }
          },
          manifest_type_identifier: "roboflow_core/dynamic_crop@v1"
        }
      ]
    })
  })
) as jest.Mock;

describe('getInputPropertiesOfKind', () => {
  // Mocking a fetch request for roboflow_object_detection_model@v1 block
  test('returns matching properties for a valid kind', async () => {
    const inputProps = await getInputPropertiesOfKind("roboflow_core/roboflow_object_detection_model@v1", "image");
    expect(inputProps).toEqual(["images"]);
  });

  // Mocking a fetch request for polygon_visualization@v1 block
  test('returns matching properties for a valid kind', async () => {
    const inputProps = await getInputPropertiesOfKind("roboflow_core/polygon_visualization@v1", "string");
    expect(inputProps).toEqual(["color_palette", 'color_axis']);
  });

  // Mocking a fetch request for dynamic_crop@v1 block
  test('returns matching properties for a valid kind', async () => {
    const inputProps = await getInputPropertiesOfKind("roboflow_core/dynamic_crop@v1", "object_detection_prediction");
    expect(inputProps).toEqual(["predictions"]);
  });

  // Mocking if a matching kind is not found
  test('returns an empty array if no matching kind is found', async () => {
    const inputProps = await getInputPropertiesOfKind("roboflow_core/time_in_zone@v1", "nonexistent_kind");
    expect(inputProps).toEqual([]);
  });

  // Mocking if block type doesn't exist
  test('returns an empty array if block type is not found', async () => {
    const inputProps = await getInputPropertiesOfKind("unknown_block_type", "image");
    expect(inputProps).toEqual([]);
  });

  // Mocking a failed fetch request
  test('throws error if fetch fails', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false
      })
    );
    
    await expect(getInputPropertiesOfKind("nonexistent_block_type", "non_type")).rejects.toThrow("Failed to fetch manifest");
  });
});
