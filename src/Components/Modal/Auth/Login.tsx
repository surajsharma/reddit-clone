import { Text, Button, Flex, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
    const [loginForm, setLoginForm] = useState({ email: "", password: "" });

    const setAuthModalState = useSetRecoilState(authModalState);

    const onSubmit = () => {};

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    const signUpModal = () => {
        setAuthModalState((prev) => ({
            ...prev,
            view: "signup"
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
            <Button type="submit" width={"100%"} height={"36px"}>
                Log In
            </Button>
            <Flex fontSize={"9pt"} justifyContent="center" mt={5}>
                <Text mr={1}>New Here?</Text>
                <Text
                    color={"blue.500"}
                    fontWeight={700}
                    cursor="pointer"
                    onClick={signUpModal}
                >
                    SIGN UP
                </Text>
            </Flex>
        </form>
    );
};
export default Login;
