import { Text, Image, Flex, Button } from "@chakra-ui/react";
import { User, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../firebase/clientApp";

const OAuthButtons: React.FC = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    const googleLogin = async () => {
        var provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: "select_account"
        });

        await signInWithGoogle();
        // auth.setPersistence("NONE" as any);
    };

    const createUserDocument = async (user: User) => {
        const userDocRef = doc(firestore, "users", user.uid);
        await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
    };

    useEffect(() => {
        if (user) {
            createUserDocument(user.user);
        }
    }, [user]);

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
