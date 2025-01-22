import React from 'react';
import Icon from '@ant-design/icons';
import Button from 'antd/lib/button';
import CVATTooltip from 'components/common/cvat-tooltip';
import fetchRandomUser, { User } from 'actions/fetch-random-user';
import { Modal } from 'antd';
import { RedoIcon } from '../../../icons';

export default function ShowRandomUserDetails(): JSX.Element {
    const [user, setUser] = React.useState<User | null>(null);
    const [showUserDetails, setShowUserDetails] = React.useState<boolean>(false);

    const handleShowUserDetails = async (): Promise<void> => {
        const userData = await fetchRandomUser();
        setUser(userData);
        setShowUserDetails(true);
    };

    return (
        <>
            <CVATTooltip overlay='Show User Details'>
                <Button type='link' className='cvat-annotation-header-button' onClick={handleShowUserDetails}>
                    <Icon component={RedoIcon} />
                    Info
                </Button>
            </CVATTooltip>

            {user && showUserDetails && (
                <Modal
                    title='User Details'
                    visible={showUserDetails}
                    onCancel={() => setShowUserDetails(false)}
                    footer={null}
                >
                    <div>
                        <p>
                            Name:
                            {user.name}
                        </p>
                        <p>
                            Username:
                            {user.username}
                        </p>
                        <p>
                            Email:
                            {user.email}
                        </p>
                    </div>
                </Modal>
            )}
        </>
    );
}
