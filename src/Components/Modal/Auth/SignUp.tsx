import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";

type SignUpProps = {};

const SignUp: React.FC<SignUpProps> = () => {
    const [signUpForm, setSignUpForm] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const setAuthModalState = useSetRecoilState(authModalState);

    const onSubmit = () => {};

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    const signUpModal = () => {
        setAuthModalState((prev) => ({
            ...prev,
            view: "login"
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
            />{" "}
            <Input
                required
                name={"confirmPassword"}
                type={"confirmPassword"}
                mb={2}
                placeholder={"confirm password"}
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
                Sign Up
            </Button>
            <Flex fontSize={"9pt"} justifyContent="center" mt={5}>
                <Text mr={1}>Already a redditor?</Text>
                <Text
                    color={"blue.500"}
                    fontWeight={700}
                    cursor="pointer"
                    onClick={signUpModal}
                >
                    LOG IN
                </Text>
            </Flex>
        </form>
    );
};
export default SignUp;
