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
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Importar os estilos padrão
import { FaTimes } from "react-icons/fa"; // Ícone de fechar

const ModalCompInformacoes = ({
  data,
  setData,
  dataEdit,
  isOpen,
  onClose,
  onUpdateData,
}) => {
  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState(dataEdit.titulo || "");
  const [descricao, setDescricao] = useState(dataEdit.descricao || "");
  const [dataEvento, setDataEvento] = useState(dataEdit.data || new Date());
  const [adm, setAdm] = useState(dataEdit.adm || "Sim");

  useEffect(() => {
    if (!Object.keys(dataEdit)) {
      const nextId =
        data.length > 0 ? Math.max(...data.map((item) => item.idEvento)) + 1 : 1;
      setId(nextId.toString());
    }
  }, [data, dataEdit]);

  const handleSave = () => {
    if (!titulo || !descricao) {
      console.log("Campos obrigatórios não preenchidos.");
      return;
    }

    if (Object.keys(dataEdit).length) {
      data[dataEdit.index] = {
        idEvento: dataEdit.idEvento,
        titulo,
        descricao,
        data: dataEvento.toDateString(),
        adm,
      };
    } else {
      const newItem = {
        idEvento: id,
        titulo,
        descricao,
        data: dataEvento.toDateString(),
        adm,
      };
      data.push(newItem);
    }

    console.log(newItem); // Exibe os dados no console

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
        <ModalHeader>Cadastrar uma Nova Informação</ModalHeader>
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
              <FormLabel>ID</FormLabel>
              <Input type="text" value={id} isReadOnly />
            </Box>
            <Box>
              <FormLabel>TÍTULO</FormLabel>
              <Input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </Box>
            <Box>
              <FormLabel>DESCRIÇÃO</FormLabel>
              <Textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </Box>
            <Box>
              <FormLabel>DATA</FormLabel>
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
              <FormLabel>ADM</FormLabel>
              <Select
                value={adm}
                onChange={(e) => setAdm(e.target.value)}
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

export default ModalCompInformacoes;
