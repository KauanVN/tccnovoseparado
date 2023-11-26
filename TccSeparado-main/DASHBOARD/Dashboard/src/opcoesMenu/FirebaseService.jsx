import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './Firebase';

const uploadImage = (file, onProgress, onComplete, onError) => {
  // Crie uma referência única para o arquivo no armazenamento do Firebase
  const storageRef = ref(storage, `images/${file.name}`);

  // Faça o upload do arquivo
  const uploadTask = uploadBytesResumable(storageRef, file);

  // Atualize o progresso do upload
  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onProgress(progress);
    },
    (error) => {
      onError(error);
    },
    () => {
      // Upload concluído com sucesso, obtenha a URL de download
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        onComplete(downloadURL);
      });
    }
  );
};

export { uploadImage };
