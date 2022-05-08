import { Image, Flex, Button } from "@chakra-ui/react";
import React from "react";

const OAuthButtons: React.FC = () => {
    return (
        <Flex direction={"column"} width={"100%"}>
            <Button variant={"oauth"} mb={2}>
                <Image
                    alt="googlelaogo"
                    src="/images/googlelogo.png"
                    height="20px"
                    mr={2}
                />
                Continue with Google
            </Button>
            <Button variant={"oauth"} mb={2}>
                Some Other Provider
            </Button>
        </Flex>
    );
};
export default OAuthButtons;
