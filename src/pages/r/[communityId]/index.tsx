import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React from "react";
import safeJsonStringify from "safe-json-stringify";
import { Community } from "../../../atoms/communitiesAtom";
import CreatePostLink from "../../../Components/Community/CreatePostLink";
import Header from "../../../Components/Community/Header";
import CommunityNotFound from "../../../Components/Community/NotFound";
import PageContent from "../../../Components/Layout/PageContent";
import { firestore } from "../../../firebase/clientApp";

type CommunityPageProps = {
    communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
    if (!communityData) {
        return <CommunityNotFound />;
    }
    return (
        <>
            <Header communityData={communityData} />
            <PageContent>
                <>
                    <CreatePostLink />
                </>
                <>RHS</>
            </PageContent>
        </>
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    //get community data and pass to component

    try {
        const communityDocRef = doc(
            firestore,
            "communities",
            context.query.communityId as string
        );

        const communityDoc = await getDoc(communityDocRef);

        return {
            props: {
                communityData: communityDoc.exists()
                    ? JSON.parse(
                          safeJsonStringify({
                              id: communityDoc.id,
                              ...communityDoc.data()
                          })
                      )
                    : ""
            }
        };
    } catch (error) {
        // could add error page here
        console.log(`getServerSideProps error`, error);
    }
}

export default CommunityPage;
