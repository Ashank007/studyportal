import { Box, Button, Text, useClipboard } from "@chakra-ui/react";

const CopyableTextBox = () => {
  const textToCopy = "2023a6r042@mietjammu.in";
  const { hasCopied, onCopy } = useClipboard(textToCopy);

  return (
    <Box
      w="400px"
      p="4"
      border="2px solid #3182ce"
      borderRadius="16px"
      boxShadow="md"
      bg="white"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Text color={'black'} mr="4">{textToCopy}</Text>
      <Button onClick={onCopy} colorScheme={hasCopied ? "green" : "blue"}>
        {hasCopied ? "Copied" : "Copy"}
      </Button>
    </Box>
  );
};

export default CopyableTextBox;
