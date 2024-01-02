// image uploading imports
import path from 'path';
import fs from 'fs';
import fetch from 'node-fetch';
const __dirname = path.resolve();

 
// image uploading

export const imageUploading = async ({ image, folder }) => {
    let imageData;
    let fileName;
    let uri = `http://localhost:4000/uploads/${folder}/`;

    if (typeof image === 'string' && image.startsWith('http')) {
        // Fetch image from URL
        const response = await fetch(image);
        const buffer = await response.buffer();
        imageData = buffer.toString('base64');
        fileName = `${Date.now()}.png`;
    } else if (typeof image === 'string') {
        const base64ToArray = image.split(';base64,');
        imageData = base64ToArray[1];
        const prefix = base64ToArray[0];
        const extension = prefix.replace(/^data:image\//, '');
        fileName = `${Date.now()}.${extension}`;
    } else {
        throw new Error('Invalid image format');
    }

    const imagePath = path.join(__dirname, `./public/uploads/${folder}`, fileName);
    const filePath = path.resolve(imagePath);
    fs.writeFileSync(filePath, imageData, { encoding: 'base64' });

    // Full URL to the uploaded image
    const fullUrl =` ${uri}${fileName}`;

    return fullUrl;
};

