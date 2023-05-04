import {
  Button,
  Checkbox,
  CheckboxGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";

const FilterModal = (props) => {
  const {
    isOpen,
    setIsOpen,
    selectedFilters,
    handleFilterChange,
    handleApplyFilters,
  } = props;
  const filterOptions = [
    { label: "New", value: "new" },
    { lable: "Recent", value: "recent" },
    // { label: "completed", value: "completed" },
  ];
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Filter options</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CheckboxGroup onChange={handleFilterChange}>
            <Stack spacing={2}>
              {filterOptions.map((option) => (
                <Checkbox
                  key={option.value}
                  value={option.value}
                  isChecked={selectedFilters.includes(option.value)}
                >
                  {option.label}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        </ModalBody>
        <Button onClick={handleApplyFilters}>Apply filters</Button>
      </ModalContent>
    </Modal>
  );
};

export default FilterModal;
