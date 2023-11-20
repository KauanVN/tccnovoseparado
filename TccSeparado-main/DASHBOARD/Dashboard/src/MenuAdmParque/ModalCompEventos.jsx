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
import "react-datepicker/dist/react-datepicker.css"; // Importar os estilos padrão
import { FaTimes } from "react-icons/fa"; // Ícone de fechar

const ModalCompEventos = ({
  data,
  setData,
  dataEdit,
  isOpen,
  onClose,
  onUpdateData,
}) => {
  const [nome, setNome] = useState(dataEdit.nome || "");
  const [descricao, setDescricao] = useState(dataEdit.descricao || "");
  const [dataInicio, setDataInicio] = useState(dataEdit.dataInicio || new Date());
  const [dataTermino, setDataTermino] = useState(dataEdit.dataTermino || new Date());
  const [localizacao, setLocalizacao] = useState(dataEdit.localizacao || "");
  const [imagem, setImagem] = useState(dataEdit.imagem || "");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!Object.keys(dataEdit)) {
      setNome("");
      setDescricao("");
      setDataInicio(new Date());
      setDataTermino(new Date());
      setLocalizacao("");
      setImagem("");
    }
  }, [dataEdit]);

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
        dataInicio: dataInicio.toDateString(),
        dataTermino: dataTermino.toDateString(),
        localizacao,
        imagem,
      };
    } else {
      const nextId =
        data.length > 0 ? Math.max(...data.map((item) => item.idEvento)) + 1 : 1;

      const newItem = {
        idEvento: nextId.toString(),
        nome,
        descricao,
        dataInicio: dataInicio.toDateString(),
        dataTermino: dataTermino.toDateString(),
        localizacao,
        imagem,
      };
      data.push(newItem);
    }

    onUpdateData([...data]);

    // Feche a modal após salvar
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
          onClick={onClose} // Feche a modal ao clicar no ícone do X
        />
        <ModalBody>
          <FormControl display="flex" flexDir="column" gap={4}>
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
              <FormLabel>Data de Início</FormLabel>
              <DatePicker
                selected={dataInicio}
                onChange={(date) => setDataInicio(date)}
                className="custom-datepicker"
                placeholderText="Selecione uma data"
                dateFormat="dd/MM/yyyy"
                calendarClassName="calendar-background"
                wrapperClassName="transparent-input"
              />
            </Box>
            <Box>
              <FormLabel>Data de Término</FormLabel>
              <DatePicker
                selected={dataTermino}
                onChange={(date) => setDataTermino(date)}
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
              <FormLabel>Localização</FormLabel>
              <Input
                type="text"
                value={localizacao}
                onChange={(e) => setLocalizacao(e.target.value)}
              />
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
