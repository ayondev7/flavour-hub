const ImageKit = require('imagekit');
const sharp = require('sharp');
const path = require('path');

const stripQuotes = (v) => {
    if (!v) return v;
    return v.replace(/^"|"$/g, '').replace(/^'|'$/g, '');
};

let imagekitInstance = null;
const getImageKit = () => {
    if (imagekitInstance) return imagekitInstance;

    const publicKey = stripQuotes(process.env.IMAGEKIT_PUBLIC_KEY);
    const privateKey = stripQuotes(process.env.IMAGEKIT_PRIVATE_KEY);
    const urlEndpoint = stripQuotes(process.env.IMAGEKIT_URL_ENDPOINT);

    if (!publicKey || !privateKey || !urlEndpoint) {
        const missing = [];
        if (!publicKey) missing.push('IMAGEKIT_PUBLIC_KEY');
        if (!privateKey) missing.push('IMAGEKIT_PRIVATE_KEY');
        if (!urlEndpoint) missing.push('IMAGEKIT_URL_ENDPOINT');
        throw new Error(`Missing ImageKit environment variables: ${missing.join(', ')}. Please add them to your .env`);
    }

    imagekitInstance = new ImageKit({
        publicKey,
        privateKey,
        urlEndpoint,
    });

    return imagekitInstance;
};

const uploadImage = async (imageFile, fileName) => {
    try {
        const imagekit = getImageKit();
        
        // Get image metadata to check format
        const metadata = await sharp(imageFile).metadata();
        
        let bufferToUpload = imageFile;
        let uploadFileName = fileName;
        
        if (metadata.format !== 'webp') {
            // Convert to WebP lossless
            bufferToUpload = await sharp(imageFile).webp({ lossless: true }).toBuffer();
            
            // Update filename to .webp extension
            const ext = path.extname(fileName);
            const base = path.basename(fileName, ext);
            uploadFileName = base + '.webp';
        }
        
        // Upload to ImageKit
        const response = await imagekit.upload({
            file: bufferToUpload,
            fileName: uploadFileName,
            folder: '/recipe-finder'
        });
        return response.url;
    } catch (error) {
        throw new Error('Failed to upload image: ' + (error.message || error));
    }
};

module.exports = { uploadImage };