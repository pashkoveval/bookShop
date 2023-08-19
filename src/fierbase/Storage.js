import { v4 as genId } from 'uuid';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from './index';

//__________________________________________________________________________

const storageGetURL = async (pathImg) => {
	return await getDownloadURL(ref(storage, pathImg))
		.then((url) => {
			return url;
		})
		.catch((error) => {
			console.error(error);
		});
};

const storageGetRef = (pathImg = 'img') => {
	return ref(storage, pathImg);
};

const storageUploadFyles = async (file) => {
	if (file) {
		const metadata = {
			contentType: file.type,
		};
		const storageRefText = ref(storage, 'images/' + genId());
		const uploadTask = await uploadBytesResumable(
			storageRefText,
			file,
			metadata
		);
		if (uploadTask) {
			const url = await getDownloadURL(storageRefText).then((downloadURL) => {
				return downloadURL;
			});

			console.log('url', url);
			return url;
		}
	}
};

export { ref as storageRef, storageGetURL, storageGetRef, storageUploadFyles };
