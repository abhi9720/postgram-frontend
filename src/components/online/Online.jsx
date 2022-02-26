import axiosInstance from '../../utils/axiosConfig';
import { useEffect, useState } from 'react';

import './online.css';

const Online = ({ id }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const getUser = async () => {
			try {
				const res = await axiosInstance.get('/user?userId=' + id);
				setUser(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getUser();
	}, [id]);

	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	return (
		<>
			<li className="rightbarFriend">
				<div className="rightbarprofileImgContainer">
					<img
						loading="lazy"
						className="rightbarprofileImg"
						src={user?.profilePicture ? user?.profilePicture : PF + 'person/noAvatar.png'}
						alt=""
					/>
				</div>
				<span className="rightbarUsername"> {user?.username}</span>
			</li>
		</>
	);
};

export default Online;
