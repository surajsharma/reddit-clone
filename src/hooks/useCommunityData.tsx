import {
    collection,
    doc,
    getDocs,
    increment,
    writeBatch
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "../atoms/authModalAtom";
import {
    Community,
    CommunitySnippet,
    communityState
} from "../atoms/communitiesAtom";
import { auth, firestore } from "../firebase/clientApp";

const useCommunityData = () => {
    const [user] = useAuthState(auth);
    const [communityStateValue, setCommunityStateValue] =
        useRecoilState(communityState);

    const setAuthModalState = useSetRecoilState(authModalState);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onJoinOrLeaveCommunity = (
        communityData: Community,
        isJoined: boolean
    ) => {
        //open auth modal if no user

        if (!user) {
            setAuthModalState({
                open: true,
                view: "login"
            });
            return;
        }

        setLoading(true);
        if (isJoined) {
            leaveCommunity(communityData.id);
            return;
        }
        joinCommunity(communityData);
    };

    const getMySnippets = async () => {
        setLoading(true);
        try {
            const snippetDocs = await getDocs(
                collection(firestore, `users/${user?.uid}/communitySnippets`)
            );
            const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));

            setCommunityStateValue((prev) => ({
                ...prev,
                mySnippets: snippets as CommunitySnippet[]
            }));
            setLoading(false);
        } catch (err: any) {
            console.log("getMySnippets error", err);
            setError(err.message);
        }
    };

    const joinCommunity = async (communityData: Community) => {
        // Batched Writes
        try {
            //1. creating a new community snippet
            const batch = writeBatch(firestore);

            const newSnippet: CommunitySnippet = {
                communityId: communityData.id,
                imageURL: communityData.imagerUrl || ""
            };

            batch.set(
                doc(
                    firestore,
                    `users/${user?.uid}/communitySnippets`,
                    communityData.id
                ),
                newSnippet
            );

            batch.update(doc(firestore, `communities`, communityData.id), {
                numberOfMembers: increment(1)
            });

            await batch.commit();

            //2. updating the number of memebers on the communiity

            setCommunityStateValue((prev) => ({
                ...prev,
                mySnippets: [...prev.mySnippets, newSnippet]
            }));
        } catch (err: any) {
            console.log("joinCommunity error", err);
            setError(err.message);
        }
        setLoading(false);
        // update recoil state - communityState.mySnippets
    };

    const leaveCommunity = async (communityId: string) => {
        // Batched Writes
        try {
            const batch = writeBatch(firestore);

            // deleting the community snippet
            batch.delete(
                doc(
                    firestore,
                    `users/${user?.uid}/communitySnippets`,
                    communityId
                )
            );

            // updating number of users
            batch.update(doc(firestore, `communities`, communityId), {
                numberOfMembers: increment(-1)
            });

            await batch.commit();

            // update recoil state
            setCommunityStateValue((prev) => ({
                ...prev,
                mySnippets: prev.mySnippets.filter(
                    (snippet) => snippet.communityId !== communityId
                )
            }));
        } catch (err: any) {
            console.log("leaveCommunity Error", err.message);
            setError(err.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (!user) return;
        getMySnippets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return {
        communityStateValue,
        onJoinOrLeaveCommunity,
        loading
    };
};

export default useCommunityData;
