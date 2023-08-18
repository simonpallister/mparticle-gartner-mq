import React, { useState, useEffect } from 'react';
import mParticle from '@mparticle/web-sdk';

const getProfile = async (mpid) => {
    const response = await fetch(
        `https://z4yqkonnm9.execute-api.us-east-1.amazonaws.com/profile?vertical=retail&mpid=${mpid}&fields=device_identities,user_identities,user_attributes,audience_memberships,attribution`,
        {},
    );
    const data = await response.json();

    if (response.status == 404) {
        return null;
    }

    return data;
};

const Profile = ({ mpid }) => {
    const [userProfile, setUserProfile] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(async () => {
        const profile = await getProfile(mpid);
        setIsLoading(false);
        setUserProfile(profile);
    }, [mpid]);

    if (isLoading) {
        return <div>Loading user profile...</div>;
    }
    if (!userProfile) {
        return <div>Loading user profile...</div>;
    }

    return (
        <div>
            <h1>Profile Information</h1>
            <p>MPID: {userProfile.mpid}</p>
            <p>
                Name:{' '}
                {`${userProfile?.user_attributes['$firstname']} ${userProfile?.user_attributes['$lastname']}`}{' '}
            </p>
            <p>
                Last Product Viewed:{' '}
                {userProfile?.user_attributes['last Product Viewed']}
            </p>
            <p>
                Last Product Viewed:{' '}
                {userProfile?.user_attributes['favourite Brand']}
            </p>
            <p>
                Current Audience Membership:{' '}
                {userProfile?.audience_memberships.map(
                    (audience) => audience.audience_name,
                )}
            </p>
        </div>
    );
};

export default Profile;
