import { Flex, Icon } from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
    addDoc,
    collection,
    serverTimestamp,
    Timestamp,
    updateDoc
} from "firebase/firestore";
import {
    connectStorageEmulator,
    getDownloadURL,
    ref,
    uploadString
} from "firebase/storage";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { Post, postState } from "../../atoms/postsAtom";
import { firestore, storage } from "../../firebase/clientApp";
import ImageUpload from "./PostForm/ImageUpload";
import TextInputs from "./PostForm/TextInput";
import TabItem from "./TabItem";

type NewPostFormProps = {
    user: User;
};

export type TabItem = {
    title: string;
    icon: typeof Icon.arguments;
};

const formTabs: TabItem[] = [
    {
        title: "Post",
        icon: IoDocumentText
    },
    {
        title: "Images & Video",
        icon: IoImageOutline
    },
    {
        title: "Link",
        icon: BsLink45Deg
    },
    {
        title: "Poll",
        icon: BsMic
    }
];

const NewPostForm: React.FC<NewPostFormProps> = ({ user }) => {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
    const [loading, setLoading] = useState(false);

    const [textInputs, setTextInputs] = useState({
        title: "",
        body: ""
    });

    const [selectedFile, setSelectedFile] = useState<string>();

    const handleCreatePost = async () => {
        //TODO: create new post object type Post
        const { communityId } = router.query;

        const newPost: Post = {
            communityId: communityId as string,
            creatorId: user?.uid,
            creatorDisplayname: user.email!.split("@")[0],
            title: textInputs.title,
            body: textInputs.body,
            numberOfComments: 0,
            voteStatus: 0,
            createdAt: serverTimestamp() as Timestamp
        };
        // store the post in db
        setLoading(true);
        try {
            const postDocRef = await addDoc(
                collection(firestore, "posts"),
                newPost
            );

            //check for selectedfile => store in storage getDownloadUrl(return imageUrl)
            if (selectedFile) {
                const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
                await uploadString(imageRef, selectedFile, "data_url");
                const downloadURL = await getDownloadURL(imageRef);
                // update post doc with imageUrl
                await updateDoc(postDocRef, {
                    imageURL: downloadURL
                });
            }
        } catch (error: any) {
            console.log("handleCreatePost error", error.message);
        }
        setLoading(false);
        //TODO: redirect back to community page using router
        // router.back();
    };

    const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        if (event.target.files?.[0]) {
            reader.readAsDataURL(event.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            if (readerEvent.target?.result) {
                setSelectedFile(readerEvent.target.result as string);
            }
        };
    };

    const onTextChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {
            target: { name, value }
        } = event;

        setTextInputs((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Flex direction={"column"} bg={"white"} borderRadius={4} mt={2}>
            <Flex width={"100%"}>
                {formTabs.map((item) => (
                    <TabItem
                        key={item.title}
                        item={item}
                        selected={item.title === selectedTab}
                        setSelectedTab={setSelectedTab}
                    />
                ))}
            </Flex>
            <Flex p={4}>
                {selectedTab === "Post" && (
                    <TextInputs
                        textInputs={textInputs}
                        handleCreatePost={handleCreatePost}
                        onChange={onTextChange}
                        loading={loading}
                    />
                )}
                {selectedTab === "Images & Video" && (
                    <ImageUpload
                        selectedFile={selectedFile}
                        onSelectImage={onSelectImage}
                        setSelectedTab={setSelectedTab}
                        setSelectedFile={setSelectedFile}
                    />
                )}
            </Flex>
        </Flex>
    );
};
export default NewPostForm;
