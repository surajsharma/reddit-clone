import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";

type SearchInputProps = {
    user: any;
};

const SearchInput: React.FC<SearchInputProps> = ({ user }) => {
    return (
        <Flex flexGrow={1} mr={2} align={"center"}>
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    // eslint-disable-next-line react/no-children-prop
                    children={<SearchIcon color="gray.300" mb={1} />}
                />
                <Input
                    placeholder="Search Reddit"
                    fontSize={"10pt"}
                    _placeholder={{ color: "gray.500" }}
                    _hover={{
                        bg: "white",
                        border: "1px solid",
                        borderColor: "blue.500"
                    }}
                    height={"34px"}
                    bg={"gray.50"}
                />
            </InputGroup>
        </Flex>
    );
};
export default SearchInput;
