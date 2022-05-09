import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { auth } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
    const [loginForm, setLoginForm] = useState({ email: "", password: "" });

    const [signInWithEmailAndPassword, user, loading, err] =
        useSignInWithEmailAndPassword(auth);

    const setAuthModalState = useSetRecoilState(authModalState);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        signInWithEmailAndPassword(loginForm.email, loginForm.password);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    const changeModal = (change: any) => {
        setAuthModalState((prev) => ({
            ...prev,
            view: change
        }));
    };

    return (
        <form onSubmit={onSubmit}>
            <Input
                required
                name={"email"}
                type={"email"}
                mb={2}
                placeholder={"email"}
                onChange={onChange}
                fontSize="10pt"
                _placeholder={{ color: "gray.500" }}
                _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500"
                }}
                _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500"
                }}
                bg={"gray.50"}
            />
            <Input
                required
                name={"password"}
                type={"password"}
                mb={2}
                placeholder={"password"}
                onChange={onChange}
                fontSize={"10pt"}
                _placeholder={{ color: "gray.500" }}
                _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500"
                }}
                _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500"
                }}
                bg={"gray.50"}
            />
            <Text
                color={"red.500"}
                fontSize={"12px"}
                textAlign={"center"}
                mt={1}
                mb={1}
            >
                {err &&
                    FIREBASE_ERRORS[
                        err?.message as keyof typeof FIREBASE_ERRORS
                    ]}
            </Text>
            <Button
                type="submit"
                width={"100%"}
                height={"36px"}
                isLoading={loading}
            >
                Log In
            </Button>
            <Flex justifyContent={"center"} mb={2} mt={1} fontSize={"9pt"}>
                <Text mr={1}>Forgot your password?</Text>
                <Text
                    color={"blue.500"}
                    fontWeight={700}
                    cursor="pointer"
                    onClick={() => changeModal("resetPassword")}
                >
                    Reset
                </Text>
            </Flex>
            <Flex fontSize={"9pt"} justifyContent="center" mt={5}>
                <Text mr={1}>New Here?</Text>
                <Text
                    color={"blue.500"}
                    fontWeight={700}
                    cursor="pointer"
                    onClick={() => changeModal("signup")}
                >
                    SIGN UP
                </Text>
            </Flex>
        </form>
    );
};
export default Login;
