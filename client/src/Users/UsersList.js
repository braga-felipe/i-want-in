import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_USERS = gql``;

export default function UsersList() {
	const users = useQuery();
	return <div></div>;
}
