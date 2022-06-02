import { Text, Box } from "@chakra-ui/react";
import React from "react";
import PageContent from "../../../Components/Layout/PageContent";
import NewPostForm from "../../../Components/Posts/NewPostForm";

type submitProps = {};

const submit: React.FC<submitProps> = () => {
    return (
        <PageContent>
            <>
                <Box
                    p={"14px 0px"}
                    borderBottom={"1px solid"}
                    borderColor={"white"}
                >
                    <Text>Create a post</Text>
                </Box>
                <NewPostForm />
            </>
            <>{/* About*/}</>
        </PageContent>
    );
};
export default submit;
