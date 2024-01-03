const sharp = require("sharp");
const fs = require("fs");

// Input and output directories
const inputDirectory = "images/";
const outputDirectory = "output/";

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory);
}

// Function to compress an image
const compressImage = async (inputFileName, outputFileName, quality) => {
  try {
    await sharp(`${inputDirectory}${inputFileName}`)
      .jpeg({ quality: quality }) // Adjust quality as needed
      .toFile(`${outputDirectory}${outputFileName}`);
    console.log(`Image compressed: ${outputFileName}`);
  } catch (error) {
    console.error(`Error compressing image ${inputFileName}: ${error.message}`);
  }
};

// Compress all images in the input directory
fs.readdir(inputDirectory, (err, files) => {
  if (err) {
    console.error(`Error reading input directory: ${err.message}`);
    return;
  }

  files.forEach((file) => {
    // You can adjust the output file name and quality as needed
    const outputFileName = `${file}`;
    const quality = 40; // Adjust the quality (0 to 100)

    compressImage(file, outputFileName, quality);
  });
});
