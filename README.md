# Roboflow Assessment 1

In this repository, you will find my completed answers to the questions for the first roboflow assessment. This setup uses Typescript and Node to create these functions and test them with Jest on a node server. 
## Helpful Notes
```npm install``` required! 

### Testing manually
When in the project folder, you can run these commands to test the code with the provided json manifest.

Make sure to uncomment the function calls at the bottom of each of the files to see the results!

```
npx ts-node getBlockDescription.ts
npx ts-node getInputPropertiesOfKind.ts
```

### Testing with Jest
To use the Jest test functionality, you can use the command ```npm test``` and both test files will run to make sure the functions are passing the test cases. 

For testing with Jest, make sure that the manual tests are commented out, otherwise Jest will state that there was an unending axios call. 

### Test Results 

![Test Results](https://github.com/user-attachments/assets/242ab2f0-ce30-4efa-94a4-13c9aa563127)


