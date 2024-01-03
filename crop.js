const sharp = require("sharp");
const fs = require("fs");

// Input and output directories
const inputDirectory = "uncrop/";
const outputDirectory = "crop/";

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory);
}

// Function to crop an image to a square shape with a specified height
const cropToSquare = async (inputFileName, outputFileName, targetHeight) => {
  try {
    const image = sharp(`${inputDirectory}${inputFileName}`);

    // Resize and extract the top part of the image to make it square
    await image
      .extract({
        left: 585,
        top: 50,
        width: targetHeight,
        height: targetHeight,
      })
      .toFile(`${outputDirectory}${outputFileName}`);

    console.log(`Image cropped to square: ${outputFileName}`);
  } catch (error) {
    console.error(`Error cropping image ${inputFileName}: ${error.message}`);
  }
};

// Crop all images in the input directory
fs.readdir(inputDirectory, (err, files) => {
  if (err) {
    console.error(`Error reading input directory: ${err.message}`);
    return;
  }

  files.forEach((file) => {
    // You can adjust the output file name and height
    const outputFileName = `${file}`;
    const targetHeight = 800; // Adjust the height as needed

    cropToSquare(file, outputFileName, targetHeight);
  });
});
