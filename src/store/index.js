import { defineStore } from 'pinia';
import { cloneDeep } from 'lodash';

export const store = defineStore('users', {
	state: () => ({ users: [] }),
	getters: {
		getUsersSrore: (state) => {
			return state.users;
		},
	},
	actions: {
		setUserStore(users) {
			this.users = cloneDeep(users);
		},
		pushUserStore(user) {
			this.users.push(cloneDeep(user));
		},
		unshiftUserStore(user) {
			this.users.unshift(cloneDeep(user));
		},
		deleteUserInUsersStore({ user, localId, index }) {
			if (index || index === 0) {
				this.users.splice(index, 1);
			} else if (user) {
				const foundIndex = this.users.findIndex(
					(userInList) => userInList.localId === user.localId
				);
				if (foundIndex !== -1) {
					this.users.splice(foundIndex, 1);
				} else {
					console.error(
						'store deleteUserInUsersStore Пользователь',
						user,
						'не найден, удаление невозможно'
					);
				}
			} else if (localId) {
				const foundIndex = this.users.findIndex(
					(userInList) => userInList.localId === localId
				);
				if (foundIndex !== -1) {
					this.users.splice(foundIndex, 1);
				} else {
					console.error(
						'store deleteUserInUsersStore localId',
						localId,
						'не найден, удаление невозможно'
					);
				}
			}
		},
		updateUserInUsersStore({ user, localId, index }) {
			if (!user) {
				console.error(
					'store updateUserInUsersStore Пользователь не найден, обновление невозможно'
				);
			} else if (user && !localId && !index) {
				const foundIndex = this.users.findIndex(
					(userInList) => userInList.localId === user.localId
				);
				if (foundIndex !== -1) {
					this.users.splice(foundIndex, 0, cloneDeep(user));
				} else {
					console.error(
						'store updateUserInUsersStore Пользователь',
						user,
						'не найден, обновление невозможно'
					);
				}
			} else if (user && (index || index === 0)) {
				this.users.splice(index, 0, cloneDeep(user));
			} else if (user && localId) {
				const foundIndex = this.users.findIndex(
					(userInList) => userInList.localId === localId
				);
				if (foundIndex !== -1) {
					this.users.splice(foundIndex, 0, cloneDeep(user));
				} else {
					console.error(
						'store updateUserInUsersStore localId',
						localId,
						'не найден, обновление невозможно'
					);
				}
			}
		},
	},
});
