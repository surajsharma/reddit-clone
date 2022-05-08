import {
    Text,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import AuthInputs from "./Authinputs";
import OAuthButtons from "./OAuthButtons";

const AuthModal: React.FC = () => {
    const [modalState, setModalState] = useRecoilState(authModalState);

    const handleClose = () => {
        setModalState((prev) => ({
            ...prev,
            open: false
        }));
    };

    return (
        <>
            <Modal isOpen={modalState.open} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={"center"}>
                        {modalState.view == "login" && "Login"}
                        {modalState.view == "signup" && "Sign Up"}
                        {modalState.view == "resetPassword" && "Reset Password"}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display={"flex"}
                        flexDirection={"column"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        pb={6}
                    >
                        <Flex
                            flexDirection={"column"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            width={"70%"}
                        >
                            <AuthInputs />
                            {/* <ResetPassword /> */}
                        </Flex>
                        <Text color={"gray.500"} mt={2} fontWeight={500}>
                            OR
                        </Text>
                        <Flex mt={3} width={"100%"}>
                            <OAuthButtons />
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>{" "}
        </>
    );
};

export default AuthModal;
