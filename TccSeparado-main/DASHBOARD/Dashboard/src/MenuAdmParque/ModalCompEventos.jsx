import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Textarea,
  Select,
  Image,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaTimes } from "react-icons/fa";

const ModalCompEventos = ({
  data,
  setData,
  dataEdit,
  isOpen,
  onClose,
  onUpdateData,
}) => {
  const [id, setId] = useState("");
  const [nome, setNome] = useState(dataEdit.nome || "");
  const [descricao, setDescricao] = useState(dataEdit.descricao || "");
  const [dataEvento, setDataEvento] = useState(dataEdit.data || new Date());
  const [localizacao, setLocalizacao] = useState(dataEdit.localizacao || "");
  const [admin, setAdmin] = useState(dataEdit.admin || "Sim");
  const [imagem, setImagem] = useState(dataEdit.imagem || "");
  const [selectedImage, setSelectedImage] = useState(null);
  const [cep, setCep] = useState(dataEdit.cep || ""); // Adicione um estado para o CEP
  const [latitude, setLatitude] = useState(""); // Adicione um estado para a latitude
  const [longitude, setLongitude] = useState(""); // Adicione um estado para a longitude

  useEffect(() => {
    if (!Object.keys(dataEdit)) {
      const nextId =
        data.length > 0 ? Math.max(...data.map((item) => item.idEvento)) + 1 : 1;
      setId(nextId.toString());
    }
  }, [data, dataEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagem(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCepBlur = () => {
    // Chama a função para obter o endereço, latitude e longitude a partir do CEP
    // Substitua a função abaixo pela sua função de busca de CEP e coordenadas
    fetch(`https://seu-backend.com/obter-endereco?cep=${cep}`)
      .then((response) => response.json())
      .then((data) => {
        setLocalizacao(data.endereco);
        setLatitude(data.latitude);
        setLongitude(data.longitude);
      })
      .catch((error) => {
        console.error("Erro ao obter dados do CEP:", error);
      });
  };

  const handleSave = () => {
    if (!nome || !descricao || !localizacao) {
      console.log("Campos obrigatórios não preenchidos.");
      return;
    }

    if (Object.keys(dataEdit).length) {
      data[dataEdit.index] = {
        idEvento: dataEdit.idEvento,
        nome,
        descricao,
        data: dataEvento.toDateString(),
        localizacao,
        admin,
        imagem,
        cep,
        latitude,
        longitude,
      };
    } else {
      const newItem = {
        idEvento: id,
        nome,
        descricao,
        data: dataEvento.toDateString(),
        localizacao,
        admin,
        imagem,
        cep,
        latitude,
        longitude,
      };
      data.push(newItem);
    }

    onUpdateData([...data]);

    onClose();
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
        <ModalHeader>Cadastrar Novo Evento</ModalHeader>
        <ModalCloseButton
          icon={<FaTimes />}
          _hover={{
            color: "red.500",
          }}
          onClick={onClose}
        />
        <ModalBody>
          <FormControl display="flex" flexDir="column" gap={4}>
            <Box>
              <FormLabel>ID</FormLabel>
              <Input type="text" value={id} isReadOnly />
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
              <FormLabel>Data</FormLabel>
              <DatePicker
                selected={dataEvento}
                onChange={(date) => setDataEvento(date)}
                className="custom-datepicker"
                placeholderText="Selecione uma data"
                dateFormat="dd/MM/yyyy"
                calendarClassName="calendar-background"
                wrapperClassName="transparent-input"
              />
              <style>
                {`
                .transparent-input .react-datepicker__input-container input {
                  background-color: rgba(255, 255, 255, 0.5);
                  border-radius: 5px;
                }
              `}
              </style>
            </Box>
            <Box>
              <FormLabel>CEP</FormLabel>
              <Input
                type="text"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                onBlur={handleCepBlur} // Chama a função quando o campo perde o foco
              />
            </Box>
            <Box>
              <FormLabel>Localização</FormLabel>
              <Input
                type="text"
                value={localizacao}
                onChange={(e) => setLocalizacao(e.target.value)}
              />
            </Box>
            <Box>
              <FormLabel>Latitude</FormLabel>
              <Input type="text" value={latitude} readOnly />
            </Box>
            <Box>
              <FormLabel>Longitude</FormLabel>
              <Input type="text" value={longitude} readOnly />
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
              <FormLabel>Selecione a imagem do Evento</FormLabel>
              <Input type="file" accept="image/*" onChange={handleImageChange} />
            </Box>
            <Box>
              {imagem && (
                <Image src={imagem} maxH="200px" alt="Imagem" />
              )}
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

export default ModalCompEventos;
