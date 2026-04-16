/**
 * uploadImage – uploads a File to ImgBB and returns the hosted URL.
 *
 * Uses a dedicated axios instance (no app baseURL, no custom interceptors)
 * so ImgBB requests are completely isolated from the app's API layer.
 *
 * @param {File} file - A File object from an <input type="file">
 * @returns {Promise<string>} The permanent display_url from ImgBB
 * @throws Will throw if the upload fails or the API key is missing
 */
import axios from 'axios';

const imgbbClient = axios.create({ timeout: 30000 });

export const uploadImage = async (file) => {
  const apiKey = import.meta.env.VITE_image_hosting_key;
  if (!apiKey) throw new Error('Image hosting API key is not configured.');

  // ImgBB requires multipart/form-data with the file in a field named "image".
  // We MUST use FormData so axios can derive the correct Content-Type boundary.
  const formData = new FormData();
  formData.append('image', file);

  const res = await imgbbClient.post(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    formData,
    // Do NOT set Content-Type manually — let axios set it with the boundary
  );

  if (!res.data?.success) {
    throw new Error('Image upload was not successful. Please try a different image.');
  }

  return res.data.data.display_url;
};

export default uploadImage;
