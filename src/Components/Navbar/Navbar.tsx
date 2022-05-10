import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import Directory from "./Directory/Directory";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

const Navbar: React.FC = () => {
    const [user, loading, error] = useAuthState(auth);
    return (
        <Flex
            bg={"white"}
            height={"44px"}
            padding={"6px 12px"}
            justify={"space-between"}
        >
            <Flex
                align={"center"}
                mr={{ base: 0, md: 2 }}
                width={{ base: "40px", md: "auto" }}
            >
                <Image alt="" src="/images/redditFace.svg" height={"30px"} />
                <Image
                    alt=""
                    src="/images/redditText.svg"
                    height={"46px"}
                    display={{ base: "none", md: "unset" }}
                />
            </Flex>
            {user && <Directory />}
            <SearchInput user={user} />
            <RightContent user={user} />
        </Flex>
    );
};
export default Navbar;
