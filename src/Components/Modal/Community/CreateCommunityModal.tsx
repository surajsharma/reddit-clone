import {
    Box,
    Button,
    Checkbox,
    Flex,
    Icon,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text
} from "@chakra-ui/react";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { auth, firestore } from "../../../firebase/clientApp";

type CreateCommunityModalProps = {
    open: boolean;
    handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
    open,
    handleClose
}) => {
    const [communityName, setCommunityName] = useState("");
    const [charsRemaining, setCharsRemaining] = useState(21);
    const [communityType, setCommunityType] = useState("public");
    const [err, setErr] = useState("");
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 21) return;
        setCommunityName(event.target.value);
        setCharsRemaining(21 - event.target.value.length);
    };

    const onCTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommunityType(event.target.name);
    };

    const handleCreateCommunity = async () => {
        if (err) setErr("");
        //validate community name
        const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (
            format.test(communityName) ||
            communityName.length > 21 ||
            communityName.length < 3
        ) {
            setErr(
                "Community names must be between 3-21 characters, and can only contain letters, numbers, or underscores."
            );

            return;
        }

        setLoading(true);

        // create community document in fs
        try {
            // 1: get ref to doc
            const communityDocRef = doc(
                firestore,
                "communities",
                communityName
            );

            // 2: use getDoc
            const communityDoc = await getDoc(communityDocRef);

            // 3: if doc exists, return
            if (communityDoc.exists()) {
                throw new Error(
                    `Sorry r/${communityName} is taken. Try another.`
                );
            }

            // 4: create community with setdoc
            await setDoc(communityDocRef, {
                creatorId: user?.uid,
                createdAt: serverTimestamp(),
                numberOfMembers: 1,
                privacyType: communityType
            });
        } catch (error: any) {
            console.log("handleCreateCommunity error", error);
            setErr(error.message);
        }

        setLoading(false);
    };

    return (
        <>
            <Modal isOpen={open} onClose={handleClose} size={"lg"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        display={"flex"}
                        flexDirection={"column"}
                        fontSize={15}
                        padding={3}
                    >
                        Create A Community
                    </ModalHeader>
                    <Box pl={3} pr={3}>
                        <ModalCloseButton />
                        <ModalBody
                            display={"flex"}
                            flexDirection={"column"}
                            padding={"10px 0px"}
                        >
                            <Text fontWeight={600} fontSize={15}>
                                Name
                            </Text>
                            <Text fontSize={11} color={"gray.500"}>
                                Community names including capitalization cannot
                                be changed
                            </Text>
                            <Text
                                position={"relative"}
                                top={"28px"}
                                left={"10px"}
                                width={"20px"}
                                color={"gray.400"}
                            >
                                r/
                            </Text>
                            <Input
                                position={"relative"}
                                value={communityName}
                                size={"sm"}
                                pl={"22px"}
                                onChange={handleChange}
                            />
                            <Text
                                color={
                                    charsRemaining === 0 ? "red" : "gray.500"
                                }
                                fontSize={"9pt"}
                            >
                                {charsRemaining} characters remaining
                            </Text>
                            <Text fontSize={"9pt"} color={"red"} pt={1}>
                                {err}
                            </Text>
                            <Box mt={4} mb={4}>
                                <Text fontSize={15} fontWeight={600} mb={1}>
                                    Community Type
                                </Text>
                                <Stack spacing={2}>
                                    <Checkbox
                                        name="public"
                                        isChecked={communityType === "public"}
                                        onChange={onCTypeChange}
                                    >
                                        <Flex align="center">
                                            <Icon
                                                as={BsFillPersonFill}
                                                color={"gray.500"}
                                                mr={2}
                                            />
                                            <Text fontSize={10} mr={1}>
                                                Public
                                            </Text>
                                            <Text
                                                fontSize={8}
                                                color={"gray.500"}
                                                pt={1}
                                            >
                                                Anyone can view, post, and
                                                comment to this community
                                            </Text>
                                        </Flex>
                                    </Checkbox>
                                    <Checkbox
                                        name="restricted"
                                        isChecked={
                                            communityType === "restricted"
                                        }
                                        onChange={onCTypeChange}
                                    >
                                        <Flex align="center">
                                            <Icon
                                                as={BsFillEyeFill}
                                                color={"gray.500"}
                                                mr={2}
                                            />
                                            <Text fontSize={10} mr={1}>
                                                Restricted
                                            </Text>
                                            <Text
                                                fontSize={8}
                                                color={"gray.500"}
                                                pt={1}
                                            >
                                                Anyone can view this community,
                                                but only approved users can post
                                            </Text>
                                        </Flex>
                                    </Checkbox>
                                    <Checkbox
                                        name="private"
                                        isChecked={communityType === "private"}
                                        onChange={onCTypeChange}
                                    >
                                        <Flex align="center">
                                            <Icon
                                                as={HiLockClosed}
                                                color={"gray.500"}
                                                mr={2}
                                            />
                                            <Text fontSize={10} mr={1}>
                                                Private
                                            </Text>
                                            <Text
                                                fontSize={8}
                                                color={"gray.500"}
                                                pt={1}
                                            >
                                                Only approved users can view and
                                                post to this community
                                            </Text>
                                        </Flex>
                                    </Checkbox>
                                </Stack>
                            </Box>
                        </ModalBody>
                    </Box>
                    <ModalFooter
                        bg={"gray.100"}
                        borderRadius={"0px 0px 10px 10px"}
                    >
                        <Button
                            mr={3}
                            onClick={handleClose}
                            variant={"outline"}
                            height={"30px"}
                        >
                            Cancel
                        </Button>
                        <Button
                            height={"30px"}
                            onClick={handleCreateCommunity}
                            isLoading={loading}
                        >
                            Create Community
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreateCommunityModal;
