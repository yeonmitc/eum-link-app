import { useMutation, useQuery } from '@tanstack/react-query';

async function uploadImgCloudinary(uploadImg) {
  const imgData = new FormData();
  imgData.append('file', uploadImg);
  imgData.append('upload_preset', 'eum_using_cloudinary');
  imgData.append('cloud_name', 'dor26tdln');

  const response = await fetch(`https://api.cloudinary.com/v1_1/dor26tdln/image/upload`, {
    method: 'POST',
    body: imgData,
  });

  const result_img = await response.json();
  const { public_id, secure_url } = result_img;

  return { public_id, secure_url };
}

export const useUploadImg = () => {
  return useMutation({
    mutationKey: ['uploadImg'],
    mutationFn: uploadImgCloudinary,
  });

};
