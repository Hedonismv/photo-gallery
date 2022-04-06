import React from 'react';
import './UsersList.css';
import UserListItem from "../UserListItem/UserListItem";

const UsersList = ({setVisible, usrData, setting}) => {
	return (
		<div className={'modal_main'}>
			<div className={'modal_content'}>
				<div className={'modal_top'}>
					<span>{setting}</span>
					<span className={'modal_close'} onClick={() => setVisible(false)}>&times;</span>
				</div>
				<div className={'modal_user_list'}>
					{usrData[setting].map(item =>
						<UserListItem setVisible={setVisible} key={item} id={item}/>
					)}
				</div>
			</div>
		</div>
	);
};

export default UsersList;