import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Box,
  Select,
  Button,
  Image,
  Spinner,
} from '@chakra-ui/react';


const ModalCompParque = ({ data, dataEdit, isOpen, onClose, isEditing  }) => {
  const [idLazer, setIdLazer] = useState(dataEdit.idLazer || '');
  const [nome, setNome] = useState(dataEdit.nome || '');
  const [descricao, setDescricao] = useState(dataEdit.descricao || '');
  const [cep, setCep] = useState(dataEdit.cep || '');
  const [endereco, setEndereco] = useState(dataEdit.endereco || '');
  const [latitude, setLatitude] = useState(dataEdit.latitude || '');
  const [longetude, setLongetude] = useState(dataEdit.longetude || '');
  const [categoria, setCategoria] = useState(dataEdit.categoria || '');
  const [bairro, setBairro] = useState(dataEdit.bairro || '');
  const [uf, setUf] = useState(dataEdit.uf || '');
  const [localidade, setLocalidade] = useState(dataEdit.localidade || '');
  const [admin, setAdmin] = useState(dataEdit.admin || 'Não');
  const [imagem, setImagem] = useState(dataEdit.imagem || '');
  const [isLoading, setIsLoading] = useState(false);
  
  var administrador = JSON.parse(localStorage.getItem("administrador"));

  useEffect(() => {
    if (!Object.keys(dataEdit).length) {
      const nextId = data.length > 0 ? Math.max(...data.map((item) => item.idLazer)) + 1 : 1;
      setIdLazer(nextId.toString());
    }
  }, [data, dataEdit]);


  
  useEffect(() => {
    if (!isOpen) {
      // Reset the form when the modal is closed
      setIdLazer('');
      setNome('');
      setDescricao('');
      setCep('');
      setEndereco('');
      setLatitude('');
      setLongetude('');
      setCategoria('');
      setBairro('');
      setUf('');
      setLocalidade('');
      setAdmin('Não');
      setImagem('');
    }
  }, [isOpen]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagem(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchCEPAndCoordinates = async () => {
    setIsLoading(true);
    try {
      const viaCEPURL = `https://viacep.com.br/ws/${cep}/json/`;
      const viaCEPResponse = await fetch(viaCEPURL);
      const viaCEPData = await viaCEPResponse.json();

      if (!viaCEPData.erro) {
        setEndereco(`${viaCEPData.logradouro}, ${viaCEPData.localidade} - ${viaCEPData.uf}`);
        setBairro(viaCEPData.bairro);
        setUf(viaCEPData.uf);
        setLocalidade(viaCEPData.localidade);

        const nominatimURL = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
          viaCEPData.logradouro + ', ' + viaCEPData.localidade
        )}`;
        const nominatimResponse = await fetch(nominatimURL);
        const nominatimData = await nominatimResponse.json();

        if (nominatimData.length > 0) {
          setLatitude(nominatimData[0].lat);
          setLongetude(nominatimData[0].lon);
        } else {
          console.error('Endereço não encontrado no Nominatim.');
        }
      } else {
        console.error('CEP não encontrado.');
      }
    } catch (error) {
      console.error('Erro na consulta do ViaCEP/Nominatim:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!idLazer || !nome || !descricao || !endereco || !latitude || !longetude || !categoria) {
      return;
    }

    if (idLazer === '1') {
      cadastraParque();
      return;
    }

    try {
      const token = await administrador.token;

      if (token) {
        const headers = {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(`https://tcc-production-e100.up.railway.app/api/lazer`, {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify({
            idLazer: idLazer,
            nome: nome,
            descricao: descricao,
            endereco: endereco,
            latitude: latitude,
            longetude: longetude,
            categoria: categoria,
            uf: uf,
            bairro: bairro,
            cep: cep,
            localidade: localidade,
            imagem: 'imagem',
          }),
        });

        if (response.status === 200) {
          console.log('Usuário atualizado com sucesso!');
          window.location.reload();
          onClose();
        } else {
          console.error('Erro ao atualizar parque:', response.status);
        }
      }
    } catch (error) {
      console.error('Erro ao excluir o usuário:', error);
    }
  };

  const cadastraParque = async () => {
    try {
      const token = await administrador.token;

      if (token) {
        const headers = {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(`https://tcc-production-e100.up.railway.app/api/lazer`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            nome: nome,
            descricao: descricao,
            endereco: endereco,
            latitude: latitude,
            longetude: longetude,
            categoria: categoria,
            uf: uf,
            bairro: bairro,
            cep: cep,
            localidade: localidade,
            imagem: 'imagem',
          }),
        });

        if (response.status === 201) {
          console.log('Parque cadastrado com sucesso!');
          window.location.reload();
          onClose();
        } else {
          console.error('Erro ao cadastrar parque:', response.status);
        }
      }
    } catch (error) {
      console.error('Erro ao excluir o usuário:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(5px)"
        zIndex="999"
        color="white"
        borderRadius="10px"
      >
        <ModalHeader>Cadastrar área de lazer</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl display="flex" flexDir="column" gap={4}>
            <Box>
              <FormLabel style={{ display: isEditing ? 'block' : 'none' }}>ID</FormLabel>
              <Input
                type="text"
                value={idLazer}
                isReadOnly
                onChange={(e) => setIdLazer(e.target.value)}
                style={{ display: isEditing ? 'block' : 'none' }}
              />
            </Box>
            <Box>
              <FormLabel>Nome</FormLabel>
              <Input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Box>
            <Box>
              <FormLabel>Descrição</FormLabel>
              <Textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </Box>
            <Box>
              <FormLabel>CEP</FormLabel>
              <Input
                type="text"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                onBlur={fetchCEPAndCoordinates}
              />
            </Box>
            <Box>
              <FormLabel>Endereço</FormLabel>
              <Input
                type="text"
                value={endereco}
                isReadOnly
                onChange={(e) => setEndereco(e.target.value)}
              />
            </Box>
            <Box>
              <FormLabel>Latitude</FormLabel>
              <Input
                type="text"
                value={latitude}
                isReadOnly
                onChange={(e) => setLatitude(e.target.value)}
              />
            </Box>
            <Box>
              <FormLabel>Longitude</FormLabel>
              <Input
                type="text"
                value={longetude}
                isReadOnly
                onChange={(e) => setLongetude(e.target.value)}
              />
            </Box>
            <Box>
              <FormLabel>Categoria</FormLabel>
              <Select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                borderRadius="5px"
                bg="rgba(255, 255, 255, 0.3)"
                color="black"
              >
                <option value="Parque" style={{ backgroundColor: 'transparent' }}>
                  Parque
                </option>
                <option value="Lazer" style={{ backgroundColor: 'transparent' }}>
                  Lazer
                </option>
              </Select>
            </Box>
            <Box>
              <FormLabel>Adm</FormLabel>
              <Select
                value={admin}
                onChange={(e) => setAdmin(e.target.value)}
                borderRadius="5px"
                bg="rgba(255, 255, 255, 0.3)"
                color="black"
              >
                <option value="Sim" style={{ backgroundColor: 'transparent' }}>
                  Sim
                </option>
                <option value="Não" style={{ backgroundColor: 'transparent' }}>
                  Não
                </option>
              </Select>
            </Box>
            <Box>
              <FormLabel>Selecione a imagem do Parque</FormLabel>
              <Input type="file" accept="image/*" onChange={handleImageChange} />
            </Box>
            <Box>
              {imagem && (
                <Image
                  src={imagem}
                  maxH="200px"
                  alt="Imagem"
                />
              )}
            </Box>
            <Box>
              {isLoading && <Spinner size="lg" color="green" />}
            </Box>
          </FormControl>
        </ModalBody>

        <ModalFooter justifyContent="start">
          <Button colorScheme="green" mr={3} onClick={handleSave}>
            SALVAR
          </Button>
          <Button colorScheme="red" onClick={onClose}>
            CANCELAR
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalCompParque;
