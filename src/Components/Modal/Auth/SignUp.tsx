import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";

// recoil
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";

// Firebase
import { auth } from "../../../firebase/clientApp";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { match } from "assert";
import { FIREBASE_ERRORS } from "../../../firebase/errors";

const SignUp: React.FC = () => {
    const [signUpForm, setSignUpForm] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [err, setErr] = useState("");

    const [createUserWithEmailAndPassword, user, loading, userError] =
        useCreateUserWithEmailAndPassword(auth);

    const setAuthModalState = useSetRecoilState(authModalState);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (err) setErr("");
        if (signUpForm.password !== signUpForm.confirmPassword) {
            setErr("Passwords don't match.");
            return;
        }
        createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
    };

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
            <Text
                color={"red.500"}
                fontSize={"12px"}
                textAlign={"center"}
                mt={1}
                mb={1}
            >
                {err ||
                    FIREBASE_ERRORS[
                        userError?.message as keyof typeof FIREBASE_ERRORS
                    ]}
            </Text>
            <Button
                type="submit"
                width={"100%"}
                height={"36px"}
                isLoading={loading}
            >
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
