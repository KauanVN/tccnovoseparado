import React, { useState } from 'react';
import { uploadImage } from './firebaseService';

function App() {
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Faça o upload da imagem
    uploadImage(
      file,
      (progress) => setProgress(progress),
      (downloadURL) => {
        // O upload foi concluído, você pode fazer algo com a URL de download aqui
        console.log('Download URL:', downloadURL);
      },
      (error) => {
        // Ocorreu um erro durante o upload
        console.error('Erro de upload:', error);
      }
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* ... (outros elementos do cabeçalho) ... */}
        <input type="file" onChange={handleFileChange} />
        {progress > 0 && <p>Progresso: {progress}%</p>}
      </header>
    </div>
  );
}

export default App;
