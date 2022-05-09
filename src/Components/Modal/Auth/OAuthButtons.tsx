import { Text, Image, Flex, Button } from "@chakra-ui/react";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";

const OAuthButtons: React.FC = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    const googleLogin = async () => {
        signInWithGoogle();
        if (user) {
            console.log(user);
        }
    };

    return (
        <Flex direction={"column"} width={"100%"}>
            <Button
                variant={"oauth"}
                mb={2}
                isLoading={loading}
                onClick={googleLogin}
            >
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
            {error && <Text>{error.message}</Text>}
        </Flex>
    );
};
export default OAuthButtons;
