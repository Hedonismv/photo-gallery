import {arrayRemove, arrayUnion, updateDoc} from "firebase/firestore";

export const handleSubscribe = (loggedUserRef, profileUserRef, profileId, loggedID) => {

	updateDoc(loggedUserRef, {
		following: arrayUnion(profileId)
	})
		.catch(error => console.log(error));

	updateDoc(profileUserRef, {
		followers: arrayUnion(loggedID)
	})
		.catch(error => console.log(error));
}


export const handleUnsubscribe = (loggedUserRef, profileUserRef, profileId, loggedID) => {
	updateDoc(loggedUserRef, {
		following: arrayRemove(profileId)
	})
		.catch(error => console.log(error));

	updateDoc(profileUserRef, {
		followers: arrayRemove(loggedID)
	})
		.catch(error => console.log(error));
}